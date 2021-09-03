import { HashRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import Yard from "./yard/yard";

export default function RoutersRouting() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/yard" component={Yard} />
      </Switch>
    </HashRouter>
  );
}
