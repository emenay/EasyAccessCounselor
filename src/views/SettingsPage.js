import React, { useContext } from "react";
import { UserContext } from '../providers/UserProvider';
import * as firebase from 'firebase/app';
import { auth, db } from "../firebase/firebase";
import '../css/SettingsPage.css';

class SettingsPage extends React.Component {

    static contextType = UserContext;
    
    constructor(props) {
        super(props);
        this.state = ({
            userEmail: '',
            userName: '',
            cohortName: '',
            cohortCode: '',
            cohortLink: '',
        });
    }
    //this.context.state.cohorts.find(o => o.uid == this.context.state.selectedCohort)
    getUserData = () => {
        var name = this.context.state.cohorts.find(o => o.uid == this.context.state.selectedCohort);
        this.setState({
            userEmail: auth.currentUser.email,
            cohortURL: "",
        });
    }
    componentDidMount() {
        this.getUserData();
    }


    render() {
        return (
            <div>
                <div class="formBlock">
                    <p>Cohort Settings</p>
                    <label>Cohort Name
                <input class="inputLabel" type="text" value={this.context.state.cohortName}/>
                    </label>
                    <label>Cohort Code
                <input class="inputLabel" type="text" value={this.context.state.selectedCohort ? this.context.state.selectedCohort : ''} />
                    </label>
                    <label>Cohort Link
                <a href={"http://" + window.location.hostname + "/verify/" + this.context.state.selectedCohort}>{"http://" + window.location.hostname + "/verify/" + this.context.state.selectedCohort}</a>
                    </label>
                </div>
                <div class="formBlock">
                    <p>Account Settings</p>
                    <p id="updateStatus"></p>
                    <label>Email
                <input class="inputLabel" id="email" type="text" placeholder={this.state.userEmail} />
                    </label>
                    <label>Current Password
                <input class="inputLabel" id="oldPass" type="password" placeholder="Current Password" />
                    </label>
                    <label>Enter New Password
                <input class="inputLabel" id="newPass" type="password" placeholder="New Password" />
                    </label>
                    <label>Confirm New Password
                <input class="inputLabel" id="confirmNewPass" type="password" placeholder="Confirm New Password" />
                    </label>
                    <button onClick={() => {
                        var newPass = document.getElementById("newPass").value;
                        var currentPass = document.getElementById("oldPass").value;
                        var email = document.getElementById("email").value;
                        var user = firebase.auth().currentUser

                        if (newPass != "" || email != user.email) {
                            if (currentPass == "") {
                                document.getElementById("updateStatus").style.color = "red";
                                document.getElementById("updateStatus").innerHTML = "Please enter current password"
                            }
                            else {
                                document.getElementById("updateStatus").innerHTML = ""
                                var credential = firebase.auth.EmailAuthProvider.credential(
                                    user.email,
                                    currentPass
                                );
                                
                                user.reauthenticateWithCredential(credential).then(function () {
                                    if (newPass != "") {
                                        if (newPass !== document.getElementById("confirmNewPass").value) {
                                            document.getElementById("updateStatus").style.color = "red";
                                            document.getElementById("updateStatus").innerHTML = "New password does not match"
                                        }
                                        else {
                                            auth.currentUser.updatePassword(newPass);
                                            document.getElementById("newPass").value = "";
                                            document.getElementById("confirmNewPass").value = "";
                                            document.getElementById("oldPass").value = "";
                                            document.getElementById("updateStatus").style.color = "green";
                                            document.getElementById("updateStatus").innerHTML = "Password updated"
                                        }
                                    }
                                    if (email != undefined && email != user.email) {
                                        auth.currentUser.updateEmail(email);
                                        document.getElementById("oldPass").value = "";
                                        document.getElementById("updateStatus").style.color = "green";
                                        document.getElementById("updateStatus").innerHTML += " Email updated"
                                    }

                                }).catch(function (error) {
                                    document.getElementById("updateStatus").style.color = "red";
                                    document.getElementById("updateStatus").innerHTML = error
                                });

                            }
                        }
                    }}>Save</button>
                </div>
            </div>
        );
    }
}
export default SettingsPage;