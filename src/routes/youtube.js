const express = require('express');
const router = express.Router();

const youtubeService = require("../services/youtubeService");
const conversion = require("../services/conversion");

router.get("/ytoptions", async (req, res) => {

    const { videoUrl } = req.query;

    try {
        const result = await youtubeService.getDownloadOptions(videoUrl);
        return res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'error'});
    }

});

router.get("/ytdl", async (req, res) => {
    
    const { source, title } = req.query;

    try {
        const stream = await youtubeService.downloadVideo(decodeURI(source));

        res.statusCode = 200;
        res.setHeader('Content-type', 'video/mp4');
        res.setHeader('Content-disposition', `attachment; filename=${title.replace(/\ud83c[\udf00-\udfff]/g, 'X')}.mp4`);

        return stream.pipe(res);
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: 'error'});
    }
});

router.get("/ytdlaudio", async (req, res) => {
    
    const { source } = req.query;

    try {
        const stream = await youtubeService.downloadVideo(decodeURI(source));
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

module.exports = router