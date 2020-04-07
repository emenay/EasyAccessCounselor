import React, { useContext } from 'react';

import '../css/App.css';
import Login from './LoginPage';
import Home from './HomePage';
import About from './AboutPage';
import { UserContext } from "../providers/UserProvider";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  const user = useContext(UserContext);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            {user ? <Home /> : <Login />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
