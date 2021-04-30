const axios = require("axios");
const fs = require('fs');
const path = require('path');

async function getClientId() {
    const { data } = await axios.get("https://twitch.tv");
    const matches = data.match(/"Client-ID" ?: ?"(.*?)"/);
    const clientId = matches[0].split(':')[1].replace(/"/g, "");
    console.log(clientId);
    return clientId;
}

function getSlug(url) {
    const matches = url.match(/(?<=twitch.tv\/[A-Za-z0-9\-]*\/clip\/|clips.twitch\.tv\/)([A-Za-z0-9\-]*)/g);
    return matches ? matches[0] : false;
}

async function getClip(slug) {
    const clientId = await getClientId();
    const query = [
        {
            "operationName": "VideoAccessToken_Clip",
            "variables": {
                "slug": slug
            },
                "extensions":{
                    "persistedQuery":{
                        "version":1,
                        "sha256Hash":"36b89d2507fce29e5ca551df756d27c1cfe079e2609642b4390aa4c35796eb11"
                    }
            }
        }
    ];
    
    let {data} = await axios.post("https://gql.twitch.tv/gql", query, { headers: { "Client-Id": clientId } });
    let clip = data[0].data.clip;
    console.log(clip.videoQualities);
    return clip.videoQualities[0].sourceURL;
}

async function download(source) {
    const fileName = path.basename(source);
    const filePath = path.resolve(__dirname, 'clips', fileName);

    const response = await axios({method: 'GET', url: source, responseType: 'stream'});
    console.log(response.data);

    const writer = response.data.pipe(fs.createWriteStream(filePath));
    writer.on('finish', () => {
        console.log('irra');
    });
}

async function app() {
    const url = "https://clips.twitch.tv/EsteemedPiliableOpossumBCWarrior-IAwjrAI8yS4oxlF3";
    let slug = getSlug(url);
    
    const src = await getClip(slug);
    console.log(src);

    download(src);
}


app();