const express = require("express");
const path = require("path");

const twitchService = require("./twitchService");
const conversion = require("./conversion");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client/build")));
app.set("views", path.join(__dirname, "..", "client/build"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/", (req, res) => {
    return res.render("index.html");
});

app.get("/clip/:slug", async (req, res) => {
    
    const { slug } = req.params;

    try {
        const clientId = await twitchService.getClientId();

        const clip = await twitchService.getClipSourceURL(slug, clientId);

        const stream = await twitchService.downloadClip(clip);

        res.statusCode = 200;
        res.setHeader('Content-type', 'video/mp4');
        res.setHeader('Content-disposition', 'attachment; filename=clip.mp4');

        return stream.pipe(res);
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: 'error'});
    }
});

app.get("/source/:slug", async (req, res) => {
    const { slug } = req.params;

    try {
        const clientId = await twitchService.getClientId();

        const clip = await twitchService.getClipInfo(slug, clientId);

        return res.json(clip);
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: 'error'});
    }
});

app.get("/audio", async (req, res) => {
    const { clip } = req.query;
    const sourceURL = decodeURI(clip);

    try {
        const stream = await twitchService.downloadClip(sourceURL);
        conversion.convert(stream, (output, err) => {
            if (err) {
                throw err;
            } else {
                return res.download(output);
            }
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: 'error'});
    }
});

app.get("/clipdl", async (req, res) => {
    
    const { source } = req.query;

    try {
        const stream = await twitchService.downloadClip(source);

        res.statusCode = 200;
        res.setHeader('Content-type', 'video/mp4');
        res.setHeader('Content-disposition', 'attachment; filename=clip.mp4');

        return stream.pipe(res);
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: 'error'});
    }
});

const port = process.env.PORT || 8888
app.listen(port, () => console.log(`Server running on port ${port}`));