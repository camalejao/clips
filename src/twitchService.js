const axios = require("axios");

module.exports = {
    
    async getClientId() {
        try { 
            const { data } = await axios.get("https://twitch.tv");
            const matches = data.match(/"Client-ID" ?: ?"(.*?)"/);
            const clientId = matches[0].split(':')[1].replace(/"/g, "");
            console.log(`Client-ID from Twitch homepage: ${clientId}`);
            return clientId;
        } catch (err) {
            console.log(err);
            return 'kimne78kx3ncx6brgo4mv6wki5h1ko';
        }
    },

    getSlug(url) {
        // regex hell
        const matches = url.match(
            /(?<=twitch.tv\/[A-Za-z0-9\-]*\/clip\/|clips.twitch\.tv\/)([A-Za-z0-9\-]*)/g
        );
        return matches ? matches[0] : false;
    },

    async getClipSourceURL(slug, clientId) {
        const query = [
            {
                "operationName": "VideoAccessToken_Clip",
                "variables": { "slug": slug },
                    "extensions":{
                        "persistedQuery":{
                            "version":1,
                            "sha256Hash":"36b89d2507fce29e5ca551df756d27c1cfe079e2609642b4390aa4c35796eb11"
                        }
                }
            }
        ];
        
        try {
            let {data} = await axios.post("https://gql.twitch.tv/gql", query, { headers: { "Client-Id": clientId } });
            return data[0].data.clip.videoQualities[0].sourceURL;
        } catch (err) {
            throw new Error(err);
        }
    },

    async getClipInfo(slug, clientId) {
        const query = [
            {
                "operationName": "VideoAccessToken_Clip",
                "variables": { "slug": slug },
                    "extensions":{
                        "persistedQuery":{
                            "version":1,
                            "sha256Hash":"36b89d2507fce29e5ca551df756d27c1cfe079e2609642b4390aa4c35796eb11"
                        }
                }
            },
            {
                "operationName": "ClipsTitle",
                "variables": { "slug": slug },
                "extensions": {
                    "persistedQuery": {
                        "version": 1,
                        "sha256Hash": "f6cca7f2fdfbfc2cecea0c88452500dae569191e58a265f97711f8f2a838f5b4"
                    }
                }
            }
        ];
        
        try {
            let {data} = await axios.post("https://gql.twitch.tv/gql", query, { headers: { "Client-Id": clientId } });
            let sourceURL = data[0].data.clip.videoQualities[0].sourceURL;
            let title = data[1].data.clip.title;
            return { sourceURL, title };
        } catch (err) {
            throw new Error(err);
        }
    },

    async downloadClip(source) {
    
        const response = await axios({method: 'GET', url: source, responseType: 'stream'});
                
        return response.data;
    }

}