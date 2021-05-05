const express = require("express");
const path = require("path");

const twitchService = require("./twitchService");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
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

app.listen(8888, () => console.log("Server running"));