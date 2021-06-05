const axios = require("axios");
const ytdl = require('ytdl-core');

module.exports = {

    async getDownloadOptions(videoUrl) {
        try {
            let info = await ytdl.getInfo(videoUrl);

            let thumbs = info.videoDetails.thumbnails;
            const thumbnail_url = thumbs[thumbs.length - 1].url;

            let avFormats = ytdl.filterFormats(info.formats, 'audioandvideo');
            avFormats.filter(format => !format.isLive);
            
            avFormats = avFormats.map(format => {
                return {
                    quality: format.qualityLabel,
                    container: format.container,
                    url: format.url,
                };
            });
            
            return {
                title: info.videoDetails.title,
                thumbnail: thumbnail_url,
                options: avFormats
            };
        } catch (err) {
            throw err;
        }
    },

    async downloadVideo(source) {
    
        const response = await axios({method: 'GET', url: source, responseType: 'stream'});
                
        return response.data;
    }

}