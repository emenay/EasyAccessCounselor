import React, {useState} from 'react';
import '../css/AccountTypePage.css';
import '../css/SignupPage.css';
import {UserContext} from '../providers/UserProvider';

import {auth} from '../firebase/firebase';
import {history} from './App';
import StripeCard from './StripeCard';

class paymentPortalComponent extends React.Component {
    render() {
        return(
            <div className="payMain">
                {/* insert Stripe elements here */}
            </div>
        )
    }
}

function submitPayment() {
    // send stuff to Stripe
    // receive stuff from Stripe?
    
    if (document.getElementsByClassName("sidenav-container").length === 1) {
        document.getElementsByClassName("sidenav-container")[0].style.display = "initial";
    }

    if (document.getElementsByClassName("header-select").length === 1) {
        document.getElementsByClassName("header-select")[0].style.display = "initial";
    }
    history.push('/billingaddress');
}

function PaymentPortalPage() {

    if (document.getElementsByClassName("sidenav-container").length === 1) {
        document.getElementsByClassName("sidenav-container")[0].style.display = "none";
    }

    if (document.getElementsByClassName("header-select").length === 1) {
        document.getElementsByClassName("header-select")[0].style.display = "none";
    }

    return(
        <div>
            <StripeCard />
            <button className="signup-btn" onClick={()=>submitPayment()} >Confirm</button>
        </div>
        
        
    )
}

export default PaymentPortalPage;