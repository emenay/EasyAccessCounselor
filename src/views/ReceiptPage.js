import React, {useState} from 'react';
import '../css/AccountTypePage.css';
import {UserContext} from '../providers/UserProvider';

import {auth} from '../firebase/firebase';
import {history} from './App';

class ReceiptComponent extends React.Component {
    render() {
        return(
            <div className="receiptMain">
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
    history.push('/cohortcreation');
}

function ReceiptPage() {

    if (document.getElementsByClassName("sidenav-container").length === 1) {
        document.getElementsByClassName("sidenav-container")[0].style.display = "none";
    }

    if (document.getElementsByClassName("header-select").length === 1) {
        document.getElementsByClassName("header-select")[0].style.display = "none";
    }

    return(
        <div className="payContainer">
            <h1>This is where the receipt page goes</h1>
            <ReceiptComponent/>
            <button className="receiptSubmit" onClick={()=>submitPayment()}>Create your first cohort!</button>
        </div>
    )
}

export default ReceiptPage;