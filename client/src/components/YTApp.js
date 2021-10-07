/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import { Component } from "react";
import ErrorWarning from './ErrorWarning';
import Loading from './Loading';

class YTApp extends Component {

  constructor() {
    super();
    
    this.state = {
      link: '',
      title: '',
      error: '',
      thumbnail: '',
      isLoading: false,
      hasResult: false,
      options: [],
      audio_options: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchVideo = this.searchVideo.bind(this);
  }

  handleChange(event) { this.setState({link: event.target.value}); }

  searchVideo() {
    this.setState({error: ''});
    this.setState({isLoading: true});
    const reqUrl = '/ytoptions/'
    const params = { videoUrl: encodeURI(this.state.link) };

    axios({ url: reqUrl, method: 'GET', params })
      .then(({data}) => {
        console.log(data);
        this.setState({options: data.options});
        this.setState({audio_options: data.audio_options});
        this.setState({title: data.title});
        this.setState({thumbnail: data.thumbnail});
        this.setState({hasResult: true});
        this.setState({isLoading: false});
      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false});
        this.setState({error: 'Ocorreu um erro ao buscar o vídeo. Verifique o link utilizado e se o vídeo está disponível'});
      })
  }

  render() {
    const disabled = !this.state.link.length > 0;
    const isLoading = this.state.isLoading;
    const hasResult = this.state.hasResult;
    
    return (
      <div className="card mx-auto text-center mt-5 mb-5">
        <div className="card-body">

          <h1 className="display-3 mt-lg-5 mb-lg-5" style={{ color:'#ff0000' }}>Videos</h1>
          
          <form onSubmit={(e) => {this.searchVideo(); e.preventDefault()}}>
            <input
              className="form-control mt-3"
              value={this.state.link}
              onChange={this.handleChange}
              placeholder="Cole aqui o link do vídeo!"
              type="text"
              name="link"
            />
            
            <button
              className="btn btn-yt mt-3"
              type="submit"
              disabled={disabled}
            >
              Buscar Vídeo
            </button>
          </form>

          {(hasResult || isLoading || this.state.error.length > 0) &&
            <div className="mt-3 mb-3">
                <hr />
                <Loading loading={isLoading} app={'yt'} />
                <ErrorWarning errorMsg={this.state.error} />

              {hasResult && 
                <div>
                  <h3 className="mt-3 mb-3">{this.state.title}</h3>
                  <div className="row mt-3">

                    <div className="col-sm-12 col-lg-8">
                      <div className="ratio ratio-16x9">
                        <img src={this.state.thumbnail}></img>
                      </div>
                    </div>

                    <div className="col-sm-12 col-lg-4 d-flex flex-column justify-content-center text-center">
                      <h5 className="mt-3 mb-3">Opções de Download</h5>
                      {
                        this.state.options.map((option, idx)=> (
                          <div key={idx}>
                            <a
                              href={'/ytdl?source=' + encodeURIComponent(option.url) + '&title=' + this.state.title}
                              className="btn btn-yt mb-3"
                            >
                              {option.quality} | {option.container}
                            </a>
                          </div>
                        ))
                      }
                      <h5 className="mt-3 mb-3">Download de Áudios</h5>
                      {
                        this.state.audio_options.map((option, idx)=> (
                          <div key={idx}>
                            <a
                              href={'/ytdlaudio?source=' + encodeURIComponent(option.url)}
                              className="btn btn-yt mb-3"
                            >
                              {option.quality} kbps
                            </a>
                          </div>
                        ))
                      }
                    </div>

                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

export default YTApp;
