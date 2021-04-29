import React, {useState} from 'react';
import '../css/AccountTypePage.css';
import {UserContext} from '../providers/UserProvider';
import {auth} from '../firebase/firebase';
import {db} from '../firebase/firebase';
import {history} from './App';
import { loadStripe } from '@stripe/stripe-js';
import {useContext} from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HbCkNKXiwGLHCkWpDi19gHbPGMLeIFUspxD6TlwmUGj6cqaYnYozd0wSdNqOy0mTJzHOjO2KoIWr9IGEGMgjZgc00zgDleSC8');


function TestContext() {
    // const userTest = useContext(UserContext);
    // console.log(userTest.state.user);
}


class StripeCheckout extends React.Component { 
    static contextType = UserContext;
    
    constructor(props){
      super(props);
      this.state = ({
      });
      

      this.content = {
          stripePrice: props.content.stripePrice,
          name: props.content.name,
          primaryColor: props.content.primaryColor
      }
      
  }
    
    
    handleClick = async () => {

    if (this.content.stripePrice == null) {
      history.push("/cohortcreation");
            if (document.getElementsByClassName("sidenav-container").length === 1) {
                document.getElementsByClassName("sidenav-container")[0].style.display = "initial";
            }

            if (document.getElementsByClassName("header-select").length === 1) {
                document.getElementsByClassName("header-select")[0].style.display = "initial";
            }
    
    } else {
          // Get Stripe.js instance
          const stripe = await stripePromise;

          console.log(this.context.state.user);
          // Call your backend to create the Checkout Session
          
          // uses school price for now
          const docRef = await db
            .collection('customers')
            .doc(this.context.state.user.uid)
            .collection('checkout_sessions')
            .add({
              price: this.content.stripePrice,
              allow_promotion_codes: true,
              success_url: window.location.origin + '/cohortcreation',
              cancel_url: window.location.origin + this.props.cancelURL,
            });
          // Wait for the CheckoutSession to get attached by the extension
          docRef.onSnapshot((snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
              // Show an error to your customer and then inspect your function logs.
              alert(`An error occured: ${error.message}`);
            }
            if (sessionId) {
              // We have a session, let's redirect to Checkout
              // Init Stripe
              stripe.redirectToCheckout({ sessionId });
            }
          });
    }

    

    }

    render() {
        return(
            <button class="button" style={{backgroundColor: this.content.primaryColor, color:"white"}} role="link" onClick={this.handleClick}>
                Sign up for {this.content.name}
            </button>
        )
    }
}






export default StripeCheckout;