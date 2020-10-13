import React, {useState} from 'react';
import '../css/AccountTypePage.css';
import {UserContext} from '../providers/UserProvider';

import {auth} from '../firebase/firebase';
import {history} from './App';

class PaymentSummaryComponent extends React.Component {
    render() {
        return(
            <div className="paySumMain">
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
    history.push('/receipt');
}

function PaymentSummaryPage() {

    if (document.getElementsByClassName("sidenav-container").length === 1) {
        document.getElementsByClassName("sidenav-container")[0].style.display = "none";
    }

    if (document.getElementsByClassName("header-select").length === 1) {
        document.getElementsByClassName("header-select")[0].style.display = "none";
    }

    return(
        <div className="paySumContainer">
            <h1>This is where the payment summary goes</h1>
            <PaymentSummaryComponent/>
            <button className="paySumSubmit" onClick={()=>submitPayment()}>Confirm and Pay</button>
        </div>
    )
}

export default PaymentSummaryPage;