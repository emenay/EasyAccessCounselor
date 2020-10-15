import React, { useContext } from "react";
import { UserContext } from '../providers/UserProvider';
import * as firebase from 'firebase/app';
import { auth, db } from "../firebase/firebase";
import '../css/BillingPage.css';

class BillingPage extends React.Component {

    static contextType = UserContext;
    
    constructor(props) {
        super(props);
        this.state = ({
            userEmail: '',
            cohortName: ''
        });
    }
    /*this.context.state.cohorts.find(o => o.uid == this.context.state.selectedCohort)
    getUserData = () => {
        this.setState({
            userEmail: ,
            cohortName: this.context.state.cohorts.find(o => o.uid == this.context.state.selectedCohort)
        });
    }
    componentDidMount() {
        this.getUserData();
    }*/

    deleteCohort = () => {
        if (this.context.state !== null && window.confirm("Are you sure you want to delete this cohort?")){
            db.collection("student_counselors").doc(this.context.state.selectedCohort).delete()
            .then(result=>this.context.deleteCohort(this.context.state.selectedCohort));
        
        }
    }


    render() {
        return (
            <div id="billingContainer">
                <h1 id="billingHeader">Billing Information</h1>
                <div class="formBlock">
                    <div class="billingRow">
                        <h3>Cardholder name</h3>
                        {/* insert stripe component here */}
                    </div>
                    <div class="billingRow">
                        <h3>Card Number</h3>
                        {/* insert stripe component here */}
                    </div>
                    <div class="billingRow">
                        <h3>Expiration Date</h3>
                        {/* insert stripe component here */}
                    </div>
                    <div class="billingRow">
                        <h3>Security Code</h3>
                        {/* insert stripe component here */}
                    </div>
                </div>
                <div class="formBlock">
                    <div class="billingRow">
                        <h3>Billing Address</h3>
                        {/* insert stripe component here */}
                    </div>
                    <div class="billingRow">
                        <h3>City</h3>
                        {/* insert stripe component here */}
                    </div>
                    <div class="billingRow">
                        <h3>State</h3>
                        {/* insert stripe component here */}
                    </div>
                    <div class="billingRow">
                        <h3>Zipcode</h3>
                        {/* insert stripe component here */}
                    </div>
                </div>
                <button id="editBilling">Edit Billing Information</button>
            </div>
        );
    }

    
}
export default BillingPage;