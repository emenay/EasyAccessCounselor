import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import {auth, db} from "../firebase/firebase";

/*
class AccountPage extends React.Component {
   var user = useContext(UserContext);
   {photoURL, displayName, email} = user;
    render() {
        return (
          <div>
            This is the Account page.
          </div>
        );
    }
}
*/

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
      <button  onClick = {() => {db.collection("student_counselors").doc("0afNvlnMvt2QlCTzwwb9")
      .collection("fields").doc("customFields").set({
        randomNewField: "",
        anotherNewField: ""
      })}}>Add Field</button>
    </div>
  ) 
};

export default AccountPage;