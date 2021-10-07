import { Component } from "react";

class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="nav">
                    <div className="navbar-nav">
                        <a className="nav-link" href="/">Twitch</a>
                        <a className="nav-link" href="/yt">YouTube</a>
                        <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://github.com/camalejao/clips">GitHub</a>
                    </div>
                </div>
            </div>
        </nav>
    );
  }

}

export default Navbar;