import axios from "axios";
import { Component } from "react";
import ErrorWarning from './components/ErrorWarning';
import Loading from './components/Loading';
import Clip from './components/Clip';

class ClipsApp extends Component {

  constructor() {
    super();
    
    this.state = {
      link: '',
      sourceURL: '',
      title: '',
      error: '',
      isLoading: false,
      hasClip: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.audioDownload = this.audioDownload.bind(this);
    this.searchClip = this.searchClip.bind(this);
  }

  handleChange(event) { this.setState({link: event.target.value}); }

  searchClip() {
    this.setState({error: ''});
    const clipURL = this.state.link;
    const slug = this.getSlug(clipURL);
    
    if (slug) {
      this.setState({isLoading: true});
      // this.setState({hasClip: false});
      // this.setState({sourceURL: ''});
      // this.setState({title: ''});

      const reqURL = '/source/' + slug;
      axios.get(reqURL)
        .then(({data}) => {
          console.log(data);
          this.setState({isLoading: false});
          this.setState({sourceURL: data.sourceURL});
          this.setState({title: data.title});
          this.setState({hasClip: true});
        })
        .catch(err => {
          console.log(err);
          this.setState({error: 'Ocorreu um erro ao carregar as informações do clip :('});
        });

    } else {
      let msg = 'O link fornecido é inválido. Tente usar um link no formato ';
      msg += 'https://clips.twitch.tv/EnjoyableShakingStrawberryBatChest ou ';
      msg += 'https://www.twitch.tv/esl_csgo/clip/EnjoyableShakingStrawberryBatChest';
      this.setState({error: msg});
    }
  }

  handleDownload() {
    this.setState({error: ''});
    const reqURL = '/clipdl/';
    const params = { source: encodeURI(this.state.sourceURL) };
    axios({url: reqURL, method: 'GET', responseType: 'blob', params})
      .then(response => {
        let url = window.URL.createObjectURL(response.data);
        let link = document.createElement("a");
        link.href = url;
        link.download = this.state.title + ".mp4";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(err => {
        console.log(err);
        this.setState({error: 'Ocorreu um erro ao baixar o clip :('});
      });
  }

  audioDownload() {
    this.setState({error: ''});
    const reqURL = '/audio/';
    const params = { clip: encodeURI(this.state.sourceURL) };
    axios({url: reqURL, method: 'GET', responseType: 'blob', params})
      .then(response => {
        let url = window.URL.createObjectURL(response.data);
        let link = document.createElement("a");
        link.href = url;
        link.download = this.state.title + ".mp3";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(err => {
        console.log(err);
        this.setState({error: 'Ocorreu um erro ao extrair o áudio do clip :('});
      });
  }

  getSlug(url) {
    // regex hell
    const matches = url.match(
      /(?<=twitch.tv\/[A-Za-z0-9-_]*\/clip\/|clips.twitch\.tv\/)([A-Za-z0-9-_]*)/g
    );
    return matches ? matches[0] : false;
  }

  render() {
    const disabled = !this.state.link.length > 0;
    const isLoading = this.state.isLoading;
    const hasClip = this.state.hasClip;
    return (
      <div className="card mx-auto text-center mt-5 mb-5">
        <div className="card-body">

          <h1 className="display-3 mt-lg-5 mb-lg-5" style={{ color:'#6f42c1' }}>Clips</h1>
          
          <form onSubmit={(e) => {this.searchClip(); e.preventDefault()}}>
            <input
              className="form-control mt-3"
              value={this.state.link}
              onChange={this.handleChange}
              placeholder="Cole aqui o link do clip!"
              type="text"
              name="link"
            />
            
            <button
              className="btn btn-ttv mt-3"
              type="submit"
              disabled={disabled}
            >
              Buscar Clip
            </button>
          </form>

          {(hasClip || isLoading || this.state.error.length > 0) &&
            <div className="mt-3 mb-3">
                <hr />
                <Loading loading={isLoading} app={'ttv'} />
                <ErrorWarning errorMsg={this.state.error} />
                <Clip
                  title={this.state.title}
                  sourceURL={this.state.sourceURL}
                  handleDownload={this.handleDownload}
                  audioDownload={this.audioDownload}
                />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ClipsApp;
