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

import Header from '../components/Header';
import Sidenav from '../components/Sidenav';

export default function App() {
  const user = useContext(UserContext);
  const isLoggedIn = user ? 'true' : '';
  return (
    <Router>
      <div className="page-container">
        <Sidenav isLoggedIn={isLoggedIn}/>
        <div className="page-content">
          <Switch>
            <Route path="/account">
              <Header isLoggedIn={isLoggedIn}/>
              { user ? <Account /> : <Login /> }
            </Route>
            <Route path="/about">
              <Header isLoggedIn={isLoggedIn}/>
              { user ? <About cuid={user.uid} /> : <Login />}
            </Route>
            <Route path="/caseload_management">
              <Header isLoggedIn={isLoggedIn}/>
              { user ? <Caseload /> : <Login /> }
            </Route>
            <Route path="/college_list">
              <Header isLoggedIn={isLoggedIn}/>
              { user ? <CollegeList /> : <Login /> }
            </Route>
            <Route path="/schedule">
              <Header isLoggedIn={isLoggedIn}/>
              { user ? <Schedule /> : <Login /> }
            </Route>
            <Route path="/">
              <Header isLoggedIn={isLoggedIn}/>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}