//import axios from "axios";
import { Component } from "react";
import ErrorWarning from './components/ErrorWarning';
import Loading from './components/Loading';

class YTApp extends Component {

  constructor() {
    super();
    
    this.state = {
      link: '',
      title: '',
      error: '',
      isLoading: false,
      hasResult: false,
      options: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.searchVideo = this.searchVideo.bind(this);
  }

  handleChange(event) { this.setState({link: event.target.value}); }

  searchVideo() {

  }

  handleDownload() {
    
  }

  render() {
    const disabled = !this.state.link.length > 0;
    const isLoading = this.state.isLoading;
    
    return (
      <div className="card mx-auto text-center mt-5 mb-5">
        <div className="card-body">

          <h1 className="display-3 mt-lg-5 mb-lg-5" style={{ color:'#6f42c1' }}>Videos</h1>
          
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
              className="btn mt-3"
              type="submit"
              disabled={disabled}
            >
              Buscar Vídeo
            </button>
          </form>

          {(isLoading || this.state.error.length > 0) &&
            <div className="mt-3 mb-3">
                <hr />
                <Loading loading={isLoading} />
                <ErrorWarning errorMsg={this.state.error} />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default YTApp;
