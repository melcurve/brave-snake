import { Provider } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import { store } from "../state/store";
import Yard from "./yard/yard";

export default function RoutersRouting() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/yard" component={Yard} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}
