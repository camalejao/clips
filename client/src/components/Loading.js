import { Component } from "react";

class Loading extends Component {

  render() {
    const { loading, app } = this.props;

    if (loading) {
      return (
        <div>
          <span>Carregando...</span>
          <div className="stage">
              {app === 'yt'
                ? <div className="dot-typing-yt"></div>
                : <div className="dot-typing"></div>
              }
          </div>
        </div>
      );
    } else {
      return "";
    }
  }

}

export default Loading;