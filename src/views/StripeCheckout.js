import React, {useState} from 'react';
import '../css/AccountTypePage.css';
import {UserContext} from '../providers/UserProvider';
import {auth} from '../firebase/firebase';
import {db} from '../firebase/firebase';
import {history} from './App';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HbCkNKXiwGLHCkWpDi19gHbPGMLeIFUspxD6TlwmUGj6cqaYnYozd0wSdNqOy0mTJzHOjO2KoIWr9IGEGMgjZgc00zgDleSC8');



class StripeCheckout extends React.Component { 
    static contextType = UserContext;
    
    handleClick = async () => {
      // Get Stripe.js instance
    const stripe = await stripePromise;


    // Call your backend to create the Checkout Session
    // const response = await fetch('/create-checkout-session', { method: 'POST' });

    // const session = await response.json();

    // lksjflksjlfkjsflkfjsklf
    // uses school price for now
    const docRef = await db
      .collection('customers')
      .doc(this.context.state.user.email)
      .collection('checkout_sessions')
      .add({
        price: 'price_1HeKsOKXiwGLHCkWDFSwTKes',
        success_url: window.location.origin,
        cancel_url: window.location.origin,
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


    // sflsjlfkjslkjflkslkfjlskf

    // // When the customer clicks on the button, redirect them to Checkout.
    // const result = await stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });

    // if (result.error) {
    //   // If `redirectToCheckout` fails due to a browser or network
    //   // error, display the localized error message to your customer
    //   // using `result.error.message`.
    // }
    }

    render() {
        return(
            <button role="link" onClick={this.handleClick}>
                Checkout
            </button>
        )
    }
}






export default StripeCheckout;