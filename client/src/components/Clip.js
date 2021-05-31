import { Component } from "react";

class Clip extends Component {

  render() {
    const { title, sourceURL, handleDownload, audioDownload } = this.props;
    
    if (sourceURL.length) {
      return (
        <div>
          <h3 className="mt-3 mb-3">{title}</h3>

          <div className="row mt-3">

            <div className="col-sm-12 col-lg-8">
              <div className="ratio ratio-16x9">
                <video controls>
                  <source src={sourceURL} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="col-sm-12 col-lg-4 d-flex flex-column justify-content-center text-center">
              <h5 className="mt-3 mb-3">Opções de Download</h5>

              <div><button
                className="btn mt-2"
                onClick={handleDownload}
              >
                Baixar Vídeo
              </button></div>

              <div><button
                className="btn mt-2"
                onClick={audioDownload}
              >
                Baixar Áudio
              </button></div>
            </div>

          </div>
        </div>
      );
    } else {
      return "";
    }
  }

}

export default Clip;