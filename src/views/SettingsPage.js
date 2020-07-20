import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import * as firebase from 'firebase/app';
import {auth, db} from "../firebase/firebase";
import '../css/SettingsPage.css';

/*
const AccountPage = () => {
    const user = useContext(UserContext);
    const {displayName, email} = user;
    return (
      <div >
          <div>
          <h2 >{displayName}</h2>
          <h3 >{email}</h3>
          <button  onClick = {() => {auth.signOut()}}>Sign out</button>
          </div>
        <button  onClick = {() => {db.collection("cohortCode").add({
          cohort: "unc",
          studentID: "1231251"
        })}}>Generate cohort Code</button>
      </div>
    ) 
  };*/

class SettingsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
          userEmail: "",
          userName: "",
        });
    }
    
    getUserData = () => {
        this.setState({
            userEmail: auth.currentUser.email, 
        });
    }
    componentDidMount() {
        this.getUserData();
      }

    render() {
      return (
      <div>
        <div class = "formBlock">
        <p>Cohort Settings</p>
                <label>Cohort Name
                <input class="inputLabel" type="text"  placeholder="Cohort Name" />
                </label>
                <label>Cohort Code
                <input class="inputLabel" type="text"  placeholder="Cohort Code" />
                </label>
                <label>Cohort Custom Link
                <input class="inputLabel" type="text" placeholder="Cohort Link" />
                </label>
        </div>
        <div class = "formBlock">
        <p>Account Settings</p>
        <p id= "updateStatus"></p>
                <label>Email
                <input class="inputLabel" id="email" type="text"  placeholder={this.state.userEmail} />
                </label>
                <label>Current Password
                <input class="inputLabel" id="oldPass" type="password"  placeholder="Current Password" />
                </label>
                <label>Enter New Password
                <input class="inputLabel" id="newPass" type="password" placeholder="New Password" />
                </label>
                <label>Confirm New Password
                <input class="inputLabel" id="confirmNewPass" type="password" placeholder="Confirm New Password" />
                </label>
                <button  onClick = {() => {
                    var newPass = document.getElementById("newPass").value;
                    if(newPass === document.getElementById("confirmNewPass").value){

                        var user = firebase.auth().currentUser
                        var credential = firebase.auth.EmailAuthProvider.credential(
                            user.email, 
                            document.getElementById("oldPass").value
                        );

                        user.reauthenticateWithCredential(credential).then(function() {
                            auth.currentUser.updatePassword(newPass);
                            document.getElementById("newPass").value = "";
                            document.getElementById("confirmNewPass").value = "";
                            document.getElementById("oldPass").value = "";
                            document.getElementById("updateStatus").style.color = "green";
                            document.getElementById("updateStatus").innerHTML = "Update Successful"
                        }).catch(function(error) {
                            document.getElementById("updateStatus").style.color = "red";
                            document.getElementById("updateStatus").innerHTML = error
                        });
                        
                    }
                    else{
                        document.getElementById("updateStatus").style.color = "red";
                        document.getElementById("updateStatus").innerHTML = "New password does not match"
                    }
                }}>Save</button>
        </div>
      </div>
      );
    }
}
export default SettingsPage;