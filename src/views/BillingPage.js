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

    editBillingInfo = () => {
        // if (this.context.state !== null && window.confirm("Are you sure you want to delete this cohort?")){
        //     db.collection("student_counselors").doc(this.context.state.selectedCohort).delete()
        //     .then(result=>this.context.deleteCohort(this.context.state.selectedCohort));
        
        // }
    }


    render() {
        return (
            <div id="billingContainer">
                <h1 id="billingHeader">Billing Information</h1>
                <div class="formBlock">
                    <div class="billingRow">
                        <h3 className="rowPrefix">Cardholder Name</h3>
                        <input class="inputLabel" id="email" type="text" placeholder={this.context.state !== null ? this.context.state.user.email : ""} />
                        {/* insert stripe component here */}
                    </div>
                    <div class="billingRow">
                        <h3 className="rowPrefix">Card Number</h3>
                        {/* insert stripe component here */}
                    </div>
                    <div class="billingRow">
                        <h3 className="rowPrefix">Expiration Date</h3>
                        {/* insert stripe component here */}
                    </div>
                    <div class="billingRow">
                        <h3 className="rowPrefix">Security Code</h3>
                        {/* insert stripe component here */}
                    </div>
                </div>
                <div class="formBlock">
                    <div class="billingRow">
                        <h3 className="rowPrefix">Billing Address</h3>
                        {/* insert stripe component here */}
                    </div>
                    <div class="billingRow">
                        <h3 className="rowPrefix">City</h3>
                        {/* insert stripe component here */}
                    </div>
                    <div class="billingRow">
                        <h3 className="rowPrefix">State</h3>
                        {/* insert stripe component here */}
                    </div>
                    <div class="billingRow">
                        <h3 className="rowPrefix">Zipcode</h3>
                        {/* insert stripe component here */}
                    </div>
                </div>
                <button id="editBilling" onClick={()=>this.editBillingInfo()}>Edit Billing Information</button>
            </div>
        );
    }

    
}
export default BillingPage;