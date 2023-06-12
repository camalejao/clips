const axios = require("axios");
const ytdl = require('ytdl-core');

module.exports = {

    async getDownloadOptions(videoUrl) {
        try {
            const COOKIE = process.env.YT_COOKIE_S;
            let info = await ytdl.getInfo(videoUrl, {requestOptions: {headers: {cookie: COOKIE}}});

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

            let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
            audioFormats.filter(format => !format.isLive);
            
            audioFormats = audioFormats.map(format => {
                return {
                    quality: format.audioBitrate,
                    codec: format.audioCodec,
                    url: format.url,
                };
            });
            
            return {
                title: info.videoDetails.title,
                thumbnail: thumbnail_url,
                options: avFormats,
                video_options: avFormats,
                audio_options: audioFormats,
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