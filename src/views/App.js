import React, { useContext, useState, createContext } from 'react';

import { 
  Router,
  Switch,
  Route,
  Redirect
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
import Signup2 from './SignupPage2';
import AccountType from './AccountTypePage';
import PaymentPortal from './PaymentPortal';
import BillingAddress from './BillingAddressPage';
import PaymentSummary from './PaymentSummaryPage';
import Receipt from './ReceiptPage';
import BillingPage from './BillingPage';
import StripeCard from './StripeCard';
import StripeCheckout from './StripeCheckout';

// history allows us to change pages by pushing to history
export const history = createBrowserHistory();

// This controls client side routing, Google react-dom-router for details
export default function App() {
  const user = useContext(UserContext);
  // tanner, I have isPickingAccount always set to true right now
  const isPickingAccount = 'true';
  const isLoggedIn = user.state.user ? 'true' : '';

  const STRIPE_PUBLISHABLE_KEY= 'pk_test_51HbCkNKXiwGLHCkWpDi19gHbPGMLeIFUspxD6TlwmUGj6cqaYnYozd0wSdNqOy0mTJzHOjO2KoIWr9IGEGMgjZgc00zgDleSC8';

  // Routing could be cleaned up
  return (
    <Router history={history}>
      <div className="page-container">
      <Header isLoggedIn={isLoggedIn}/>
        
        <div className={user.state.user ? "page-content" : 'page-content-nosignin'}>
        {/* tanner, when I delete isLoggedIn={isLoggedIn}, the sidebar content changes but does not go away, maybe you can continue to explore to see how to disable sidebar */}
        {user.state.user && <Sidenav isLoggedIn={isLoggedIn} isPickingAccount={isPickingAccount}/>}
          <div className={user.state.user ? "view-content" : 'page-content-nosignin1'}>
          <Switch>
            <Route path="/profiles">
              { user.state.user ? <StudentProfilesPage /> : <Redirect to='/login' /> }
            </Route>
            <Route path="/caseload_management">
              { user.state.user ? <Caseload cuid={user.uid}/> : <Redirect to='/login' /> }
            </Route>
            <Route path="/settings">
              { user.state.user ? <Settings currentUser={user} /> : <Redirect to='/login' /> }
            </Route>
            <Route path="/cohortcreation">
              { user.state.user ? <CohortCreation /> : <Redirect to='/login' /> }
            </Route>
            <Route path="/cohortcreation2">
              { user.state.user ? <CohortCreation /> : <Redirect to='/login' />}
            </Route>
            <Route path="/login">
            { user.state.user ? <Redirect to='/caseload_management' /> : <Login /> }
            </Route>
            <Route path="/signup">
            { user.state.user ? <Redirect to='/AccountType' /> : <Signup /> }
            </Route>
            <Route path="/AccountType">
            { user.state.user ? <AccountType /> : <Redirect to='/signup' /> }
            </Route>
            <Route path="/PaymentPortal">
              { user.state.user ? <PaymentPortal /> : <Redirect to='/login' />}
            </Route>
            <Route path="/billing">
              { user.state.user ? <BillingPage /> : <Redirect to='/login' />}
            </Route>
            <Route path="/billingaddress">
            { user.state.user ? <BillingAddress /> : <Redirect to='/login' />}
            </Route>
            <Route path="/paymentsummary">
            { user.state.user ? <PaymentSummary /> : <Redirect to='/login' />}
            </Route>
            <Route path="/receipt">
            { user.state.user ? <Receipt /> : <Redirect to='/login' />}
            </Route>
            <Route path="/">
              { user.state.user ? <Caseload /> : <Login /> }
            </Route>
          </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

