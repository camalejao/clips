import { Component } from "react";

class Loading extends Component {

  render() {
    const { loading } = this.props;

    if (loading) {
      return (
        <div>
          <span>Carregando...</span>
          <div className="stage">
              <div className="dot-typing"></div>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }

}

export default Loading;