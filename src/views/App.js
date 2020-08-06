import React, { useContext, useState, createContext } from 'react';

import { 
  Router,
  Switch,
  Route
} from "react-router-dom";

import { UserContext } from "../providers/UserProvider";
import { createBrowserHistory } from 'history';

import '../css/App.css';
import Login from './LoginPage';
import Caseload from './CaseloadPage';
import Settings from './SettingsPage';
import CohortCreation from './CohortCreation';
import StudentProfilesPage from './StudentProfilesPage';
import Header from '../components/Header';
import Sidenav from '../components/Sidenav';
import Signup from './SignupPage';

export const history = createBrowserHistory();

export default function App() {
  const user = useContext(UserContext);
  const isLoggedIn = user.state.user ? 'true' : '';
  return (
    <Router history={history}>
      <div className="page-container">
      <Header isLoggedIn={isLoggedIn}/>
        
        <div className={user.state.user ? "page-content" : 'page-content-nosignin'}>
        {user.state.user && <Sidenav isLoggedIn={isLoggedIn}/>}
          <div className={user.state.user ? "view-content" : 'page-content-nosignin'}>
          <Switch>
            <Route path="/profiles">
              { user.state.user ? <StudentProfilesPage /> : <Login /> }
            </Route>
            <Route path="/caseload_management">
              { user.state.user ? <Caseload cuid={user.uid}/> : <Login /> }
            </Route>
            <Route path="/settings">
              { user.state.user ? <Settings currentUser={user} /> : <Login /> }
            </Route>
            <Route path="/cohortcreation">
              { user.state.user ? <CohortCreation /> : <Login /> }
            </Route>
            <Route path="/cohortcreation2">
              { user.state.user ? <CohortCreation /> : <Login /> }
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              { user.state.user ? <StudentProfilesPage /> : <Login /> }
            </Route>
          </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}