import React, { useContext, useState, createContext } from 'react';

import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { UserContext } from "../providers/UserProvider";

import '../css/App.css';
import Login from './LoginPage';
import HomeDefault from './HomePageDefault';
import Dashboard from './Dashboard';
import Account from './AccountPage';
import Caseload from './CaseloadPage';
import CollegeList from './CollegeListPage';
import Settings from './SettingsPage';
import CohortCreation from './CohortCreation';
import Notes from './NotesPage';
import StudentProfilesPage from './StudentProfilesPage';
import Header from '../components/Header';
import Sidenav from '../components/Sidenav';
import CohortCreation2 from './CohortCreation2';
export default function App() {
  const user = useContext(UserContext);
  const isLoggedIn = user.state.user ? 'true' : '';
  return (
    <Router>
      <div className="page-container">
        <Sidenav isLoggedIn={isLoggedIn}/>
        <div className="page-content">
          <Switch>
            <Route path="/account">
              <Header isLoggedIn={isLoggedIn}/>
              { user.state.user ? <Account /> : <Login /> }
            </Route>
            <Route path="/profiles">
              <Header isLoggedIn={isLoggedIn}/>
              { user.state.user ? <StudentProfilesPage /> : <Login /> }
            </Route>
            <Route path="/caseload_management">
              <Header isLoggedIn={isLoggedIn}/>
              { user.state.user ? <Caseload cuid={user.uid}/> : <Login /> }
            </Route>
            <Route path="/college_list">
              <Header isLoggedIn={isLoggedIn}/>
              { user.state.user ? <CollegeList /> : <Login /> }
            </Route>
            <Route path="/notes">
              <Header isLoggedIn={isLoggedIn}/>
              { user.state.user ? <Notes /> : <Login /> }
            </Route>
            <Route path="/settings">
              <Header isLoggedIn={isLoggedIn}/>
              { user.state.user ? <Settings currentUser={user} /> : <Login /> }
            </Route>
            <Route path="/cohortcreation">
              <Header isLoggedIn={isLoggedIn}/>
              { user.state.user ? <CohortCreation /> : <Login /> }
            </Route>
            <Route path="/cohortcreation2">
              <Header isLoggedIn={isLoggedIn}/>
              { user.state.user ? <CohortCreation2 /> : <Login /> }
            </Route>
            <Route path="/">
              <Header isLoggedIn={isLoggedIn}/>
              { user.state.user ? <Dashboard cuid={user.uid} /> : <HomeDefault /> }
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}