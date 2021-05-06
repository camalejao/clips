import axios from "axios";
import { Component } from "react";

class App extends Component {

  constructor() {
    super();
    
    this.state = {
      link: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleChange(event) { this.setState({link: event.target.value}); }

  handleDownload() {
    const clipURL = this.state.link;
    const slug = this.getSlug(clipURL);

    if (slug) {
      const reqURL = '/clip/' + slug;
      axios({url: reqURL, method: 'GET', responseType: 'blob'})
        .then(response => {
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
      window.alert('link inválido');
    }
  }

  getSlug(url) {
    // regex hell
    const matches = url.match(
      /(?<=twitch.tv\/[A-Za-z0-9\-]*\/clip\/|clips.twitch\.tv\/)([A-Za-z0-9\-]*)/g
    );
    return matches ? matches[0] : false;
  }

  render() {
    return (
      <div className="card mx-auto text-center mt-5">
        <div className="card-body">

          <h1 className="display-3 mt-5 mb-5" style={{ color:'#6f42c1' }}>Clips</h1>
          
          <input
            className="form-control mt-3"
            value={this.state.link}
            onChange={this.handleChange}
            type="text"
            name="link"
          />
          
          <button
            className="btn btn-primary mt-3"
            style={{ backgroundColor:'#6f42c1', border:'none' }}
            onClick={this.handleDownload}
          >
            Download
          </button>

        </div>
      </div>
    );
  }
}

export default App;
