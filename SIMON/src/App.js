import { useStateValue } from "./utlils/StateProvider";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Homepage from "./components/HomePage/Homepage";
import GamePage from "./components/GamePage/GamePage";
import Scorelist from "./components/ScoreList/Scorelist";

function App() {
  const [{ name, historyScore }, dispatch] = useStateValue();

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <Homepage />
          </Route>
          <Route path="/gameboard">
            {name ? <GamePage /> : <Redirect to="/home" />}
          </Route>

          <Route path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
