import React, { useState } from 'react'
import '../css/AccountTypePage.css'
import { UserContext } from '../providers/UserProvider'

import { auth } from '../firebase/firebase'
import { history } from './App'
import StripeCheckout from './StripeCheckout'

class AccountTypeComponent extends React.Component {
  static contextType = UserContext
  constructor(props) {
    super(props)
    this.state = {}

    this.content = {
      name: props.content.name,
      type: props.content.type,
      header: props.content.header,
      price: props.content.price,
      desc: props.content.desc,
      list: props.content.list,
      primaryColor: props.content.primaryColor,
      stripePrice: props.content.stripePrice,
    }
  }

  render() {
    return (
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h2 class="subtitle is-3">{this.content.header}</h2>
          <div class="content">
            <div class="content is-large">
              <span class="level-item">
                <h1>${this.content.price}</h1>
                <h6 class="content is-10">/year</h6>
              </span>
            </div>

            <p>{this.content.desc}</p>

            <StripeCheckout content={this.content} cancelURL="/AccountType" />
          </div>
        </article>
      </div>
    )
  }
}

function setType(type) {
  switch (type) {
    case 'free':
      // TODO: set user type to free
      history.push('/cohortcreation')
      if (document.getElementsByClassName('sidenav-container').length === 1) {
        document.getElementsByClassName('sidenav-container')[0].style.display =
          'initial'
      }

      if (document.getElementsByClassName('header-select').length === 1) {
        document.getElementsByClassName('header-select')[0].style.display =
          'initial'
      }
      break
    case 'counselor':
      // TODO: set user type to counselor
      history.push('/PaymentPortal')
      break
    case 'school':
      // TODO: set user type to schoo
      history.push('/PaymentPortal')
      break
    default:
      // TODO: Figure out what should go here
      break
  }
}

function AccountTypePage() {
  if (document.getElementsByClassName('sidenav-container').length === 1) {
    document.getElementsByClassName('sidenav-container')[0].style.display =
      'none'
  }

  if (document.getElementsByClassName('header-select').length === 1) {
    document.getElementsByClassName('header-select')[0].style.display = 'none'
  }

  const freeProps = {
    name: 'Free Version',
    type: 'free',
    header: 'Free Forever',
    price: 0,
    desc: 'Save time in your caseload management and easily organize your cohort of students.',
    list: ['Cohort Creation', 'Caseload Management', 'Space Holder'],
    primaryColor: '#707070', //gray
    stripePrice: null,
  }

  const counselorProps = {
    name: 'Counselor Plan',
    type: 'counselor',
    header: 'For Counselors',
    price: 100,
    desc: 'Save time and help your students achieve their dreams with multiple cohorts and premium features.',
    list: [
      'Premium Cohort Creation',
      'Premium Caseload Management',
      'Space Holder...',
      'Space Holder 2...',
    ],
    primaryColor: '#3298CB', //Easy Access blue
    stripePrice: 'price_1IlcpaKXiwGLHCkWR5oFgEZl',
  }

  const schoolProps = {
    name: 'School Plan',
    type: 'school',
    header: 'For Schools',
    price: 250,
    desc: "Team up on caseload management by granting access to all of your cohorts across your school's team of counselors.",
    list: [
      'Multiple Cohort Creation',
      'Team Based Caseload Management',
      'Space Holder...',
      'Space Holder 2...',
      'Multiple Cohort Creation',
      'Team Based Caseload Management',
      'Space Holder...',
      'Multiple Cohort Creation',
      'Team Based Caseload Management',
      'Space Holder...',
      'Multiple Cohort Creation',
      'Team Based Caseload Management',
      'Space Holder...',
      'Multiple Cohort Creation',
      'Team Based Caseload Management',
      'Space Holder...',
      'Multiple Cohort Creation',
      'Team Based Caseload Management',
      'Space Holder...',
    ],
    primaryColor: '#FB590E', //orange
    stripePrice: 'price_1IlcqsKXiwGLHCkWln1AWpeD',
  }

  return (
    <div>
      <div className="accountTypeOverlay">
        <h1 class="title">Choose your account type.</h1>
      </div>
      <div class="container is-fluid" className="accountTypeOverlay">
        <div class="tile is-ancestor ">
          <AccountTypeComponent content={freeProps}></AccountTypeComponent>
          <AccountTypeComponent content={counselorProps}></AccountTypeComponent>
          <AccountTypeComponent content={schoolProps}></AccountTypeComponent>
        </div>
      </div>
    </div>
  )
}

export default AccountTypePage
