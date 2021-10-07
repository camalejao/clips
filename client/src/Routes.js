import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ClipsApp from './components/ClipsApp';
import NotFound from './components/NotFound';
import YTApp from './components/YTApp';

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