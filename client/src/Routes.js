import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ClipsApp from './ClipsApp';
import NotFound from './NotFound';
import YTApp from './YTApp';

class Routes extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ClipsApp} />
          <Route exact path="/yt" component={YTApp} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }

}

export default Routes;