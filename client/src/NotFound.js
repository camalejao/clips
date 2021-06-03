import { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {    
    return (
      <div className="card mx-auto text-center mt-5 mb-5">
        <div className="card-body">

          <h1 className="mt-lg-5 mb-lg-5" style={{ color:'#6f42c1' }}>Página não encontrada :(</h1>
          
          <div className="column">
            <Link className="btn button m-2" to="/">Baixar clips da Twitch</Link>
            <Link className="btn button m-2" to="/yt">Baixar vídeos do YT</Link>
          </div>
          
        </div>
      </div>
    );
  }
}

export default NotFound;
