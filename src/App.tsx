import React from "react";
import { Link } from "react-router-dom";
import "./styles/style.scss";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Link to="/yard">Start</Link>
      </div>
    );
  }
}
