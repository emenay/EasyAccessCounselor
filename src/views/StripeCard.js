import React, { useState } from 'react'
import '../css/AccountTypePage.css'
import '../css/SignupPage.css'
import { UserContext } from '../providers/UserProvider'

import { auth } from '../firebase/firebase'
import { history } from './App'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51HbCkNKXiwGLHCkWpDi19gHbPGMLeIFUspxD6TlwmUGj6cqaYnYozd0wSdNqOy0mTJzHOjO2KoIWr9IGEGMgjZgc00zgDleSC8'
)

const StripeCard = () => {
  return (
    <Elements stripe={stripePromise}>
      <MyCheckoutForm />
    </Elements>
  )
}

class MyCheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault()

    const { stripe, elements } = this.props

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      // check here
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
      history.push('/billingaddress')
    }
  }

  render() {
    const { stripe } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
        {/* <button className="signup-btn" onClick={()=>this.handleSubmit} >Pay</button> */}
      </form>
    )
  }
}

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <MyCheckoutForm elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer>
  )
}

export default StripeCard
