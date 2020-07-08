import React, { useContext, useState, useEffect } from 'react';

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
import CohortCreation from './CohortCreation';
import Notes from './NotesPage';
import StudentProfilesPage from './StudentProfilesPage';
import Header from '../components/Header';
import Sidenav from '../components/Sidenav';
import {db, auth} from '../firebase/firebase';

export default function App() {
  const user = useContext(UserContext);
  const isLoggedIn = user ? 'true' : '';
  const [cohorts, setCohort] = useState([]);

  useEffect(()=>{
    if (user) {
      db.collection("student_counselors").where("counselor", "==", user.currentUser.uid).get()
        .then(querySnapshot=>{
            return querySnapshot.docs.map(doc =>doc.data());
        })
        .then(data=>setCohort(data));
    }

  }, []);

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
            <Route path="/profiles">
              <Header isLoggedIn={isLoggedIn}/>
              { user ? <StudentProfilesPage /> : <Login /> }
            </Route>
            <Route path="/caseload_management">
              <Header isLoggedIn={isLoggedIn}/>
              { user ? <Caseload cuid={user.uid}/> : <Login /> }
            </Route>
            <Route path="/college_list">
              <Header isLoggedIn={isLoggedIn}/>
              { user ? <CollegeList /> : <Login /> }
            </Route>
            <Route path="/notes">
              <Header isLoggedIn={isLoggedIn}/>
              { user ? <Notes /> : <Login /> }
            </Route>
            <Route path="/cohortcreation">
              <Header isLoggedIn={isLoggedIn}/>
              { user ? <CohortCreation /> : <Login /> }
            </Route>
            <Route path="/">
              <Header isLoggedIn={isLoggedIn}/>
              { user ? <Dashboard cuid={user.uid} /> : <HomeDefault /> }
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}