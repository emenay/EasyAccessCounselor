import React, { useContext } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import '../css/App.css';
import Login from './LoginPage';
import Home from './HomePage';
import About from './AboutPage';
import Caseload from './CaseloadPage';
import CollegeList from './CollegeListPage';
import Schedule from './SchedulePage';
import { UserContext } from "../providers/UserProvider";


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
            <li>
              <Link to="/caseload_management">Caseload Management</Link>
            </li>
            <li>
              <Link to="/college_list">College List</Link>
            </li>
            <li>
              <Link to="/schedule">Schedule</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/caseload_management">
            <Caseload />
          </Route>
          <Route path="/college_list">
            <CollegeList />
          </Route>
          <Route path="/schedule">
            <Schedule />
          </Route>
          <Route path="/">
            {user ? <Home /> : <Login />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}