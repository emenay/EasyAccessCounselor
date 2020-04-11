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
import About from './AboutPage';
import Caseload from './CaseloadPage';
import CollegeList from './CollegeListPage';
import Schedule from './SchedulePage';

import Sidenav from '../components/Sidenav';

export default function App() {
  const hasUser = useContext(UserContext) ? 'true' : '';
  return (
    <Router>
      <div className="container">
        <Sidenav/>
        <div className="page-content">
          <Switch>
            <Route path="/login">
              <Login hasUser={hasUser} />
            </Route>
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
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}