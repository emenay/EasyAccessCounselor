import React, { useContext } from 'react';

import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { UserContext } from "../providers/UserProvider";

import '../css/App.css';
import Login from './LoginPage';
import Home from './HomePage';
import Account from './AccountPage';
import About from './AboutPage';
import Caseload from './CaseloadPage';
import CollegeList from './CollegeListPage';
import Schedule from './SchedulePage';

import Sidenav from '../components/Sidenav';
// import SignOut from '../components/login/SignOut';

export default function App() {
  const user = useContext(UserContext);
  return (
    <Router>
      <div className="container">
        <Sidenav/>
        <div className="page-content">
          <Switch>
            <Route path="/account">
              { user ? <Account /> : <Login /> }
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/caseload_management">
              { user ? <Caseload /> : <Login /> }
            </Route>
            <Route path="/college_list">
              { user ? <CollegeList /> : <Login /> }
            </Route>
            <Route path="/schedule">
              { user ? <Schedule /> : <Login /> }
            </Route>
            {/* <Route path="/logout">
              <SignOut />
            </Route> */}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}