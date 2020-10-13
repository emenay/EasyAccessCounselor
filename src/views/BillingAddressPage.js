import React, {useState} from 'react';
import '../css/AccountTypePage.css';
import {UserContext} from '../providers/UserProvider';

import {auth} from '../firebase/firebase';
import {history} from './App';

class BillingAddressComponent extends React.Component {
    render() {
        return(
            <div className="billAddrMain">
                {/* TODO */}
            </div>
        )
    }
}

function submitPayment() {
    // TODO
    
    if (document.getElementsByClassName("sidenav-container").length === 1) {
        document.getElementsByClassName("sidenav-container")[0].style.display = "initial";
    }

    if (document.getElementsByClassName("header-select").length === 1) {
        document.getElementsByClassName("header-select")[0].style.display = "initial";
    }
    history.push('/paymentsummary');
}

function BillingAddressPage() {

    if (document.getElementsByClassName("sidenav-container").length === 1) {
        document.getElementsByClassName("sidenav-container")[0].style.display = "none";
    }

    if (document.getElementsByClassName("header-select").length === 1) {
        document.getElementsByClassName("header-select")[0].style.display = "none";
    }

    return(
        <div className="billAddrContainer">
            <h1>This is where the billing address input fields go</h1>
            <BillingAddressComponent/>
            <button className="billAddrSubmit" onClick={()=>submitPayment()}>Proceed</button>
        </div>
    )
}

export default BillingAddressPage;