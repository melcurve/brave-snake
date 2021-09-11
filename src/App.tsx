import { Link } from "react-router-dom";
import "./styles/style.scss";
import splashScreen from "./assets/images/splash_screen.png";

export default function App() {
  return (
    <div className="splash-screen flex-column justify-center align-center">
      <img className="logo" src={splashScreen} alt="" />
      <Link className="start-game" to="/yard">
        开始游戏
      </Link>
    </div>
  );
}
