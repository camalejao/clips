const express = require('express');
const router = express.Router();

const twitchService = require("../services/twitchService");
const conversion = require("../services/conversion");

router.get("/clip/:slug", async (req, res) => {
    
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

router.get("/source/:slug", async (req, res) => {
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

router.get("/audio", async (req, res) => {
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

router.get("/clipdl", async (req, res) => {
    
    const { source } = req.query;

    try {
        const stream = await twitchService.downloadClip(decodeURI(source));

        res.statusCode = 200;
        res.setHeader('Content-type', 'video/mp4');
        res.setHeader('Content-disposition', 'attachment; filename=clip.mp4');

        return stream.pipe(res);
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: 'error'});
    }
});

module.exports = router;