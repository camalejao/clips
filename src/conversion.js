const ffmpeg = require("fluent-ffmpeg");

module.exports = {
    convert(input, callback) {
        let date = new Date();
        const output = `./audio-${date.toJSON()}.mp3`
        ffmpeg(input)
            .output(output)
            .on("end", () => {
                callback(output, null);
            }).on("error", err => {
                console.log(err);
                callback("", err);
            }).run();
    }
}