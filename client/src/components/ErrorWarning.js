import { Component } from "react";

class ErrorComponent extends Component {

  render() {
    const {errorMsg} = this.props;

    if (errorMsg.length) {
      return (
        <div className="alert alert-danger" role="alert">
          <span>{errorMsg}</span>
        </div>
      );
    } else {
      return "";
    }
  }

}

export default ErrorComponent;