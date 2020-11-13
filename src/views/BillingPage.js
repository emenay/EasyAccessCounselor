import React, { useContext } from "react";
import { UserContext } from '../providers/UserProvider';
import * as firebase from 'firebase/app';
import { auth, db } from "../firebase/firebase";
import '../css/BillingPage.css';
import {functions} from '../firebase/firebase';





async function handleClick() {
    const functionRef = functions
  .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
    const { data } = await functionRef({ returnUrl: window.location.origin });
    window.location.assign(data.url);
}

class BillingPage extends React.Component {

    


    render() {
        return (
            
            <button onClick={()=> handleClick()} >Manage billing with Stripe</button>
            
        );
    }

    
}
export default BillingPage;