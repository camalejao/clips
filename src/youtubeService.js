const axios = require("axios");
const ytdl = require('ytdl-core');

module.exports = {

    async getDownloadOptions(videoUrl) {
        try {
            let info = await ytdl.getInfo(videoUrl);
            let avFormats = ytdl.filterFormats(info.formats, 'audioandvideo');

            avFormats.filter(format => format.isLive === false);
            avFormats = avFormats.map(format => {
                return {
                    quality: format.qualityLabel,
                    container: format.container,
                    url: format.url,
                    itag: format.itag,
                };
            });

            return avFormats;
        } catch (err) {
            throw err;
        }
    }

}