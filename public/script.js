const downloadClip = () => {
    const clipURL = document.getElementById("url-input").value;
    const slug = getSlug(clipURL);

    if (slug) {
        const reqURL = '/clip/' + slug;
        axios({url: reqURL, method: 'GET', responseType: 'blob'})
            .then(response => {
                console.log("hi")
                let url = window.URL.createObjectURL(response.data);
                let link = document.createElement("a");
                link.href = url;
                link.download = "clip.mp4";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(err => console.log(err));
    } else {
        alert('link inválido');
    }

}

const getSlug = (url) => {
    // regex hell
    const matches = url.match(
        /(?<=twitch.tv\/[A-Za-z0-9\-]*\/clip\/|clips.twitch\.tv\/)([A-Za-z0-9\-]*)/g
    );
    return matches ? matches[0] : false;
}