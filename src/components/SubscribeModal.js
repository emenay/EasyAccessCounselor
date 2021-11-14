import React, { useState } from 'react'
import { UserContext } from '../providers/UserProvider'

import { auth } from '../firebase/firebase'
import StripeCheckout from '../views/StripeCheckout'
import '../css/CohortCreation.css'

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
      <div className="tile is-parent">
        <article className="tile is-child box">
          <h2 className="subtitle is-3">{this.content.header}</h2>
          <div className="content">
            <div className="content is-large">
              <span className="level-item">
                <h1>${this.content.price}</h1>
                <h6 className="content is-10">/year</h6>
              </span>
            </div>

            <p>{this.content.desc}</p>

            <StripeCheckout
              content={this.content}
              cancelURL="/cohortcreation"
            />
          </div>
        </article>
      </div>
    )
  }
}

function SubscribeModal(props) {
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
    <div id="myModal" className="sub-modal" onClick={props.exitModal}>
      <div className="sub-modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <p>
            <strong>
              Creating multiple cohorts is a feature only available to pro
              plans. For access to multiple cohorts (and a ton of other
              features!), please sign up for one of the plans below.
            </strong>
          </p>
        </div>
        <br></br>
        <div className="container is-fluid">
          <div className="tile is-ancestor ">
            <AccountTypeComponent
              content={counselorProps}></AccountTypeComponent>
            <AccountTypeComponent content={schoolProps}></AccountTypeComponent>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscribeModal
