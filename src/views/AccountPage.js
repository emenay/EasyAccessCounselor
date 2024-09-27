import React, { useContext } from 'react'
import { UserContext } from '../providers/UserProvider'
import { auth, db } from '../firebase/firebase'

// import React, { useState } from "react";
// import { Button, Form, Group, FormControl, FormLabel } from "react-bootstrap";
// import "./Account.css";
// import GoogleButton from 'react-google-button';

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

// export default function Login() {
//   const [email, setEmail] = React.useState("");

//   function validateForm() {
//     return email.length > 0;
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//   }

//   return (
//     <div className="Login">
//       <form onSubmit={handleSubmit}>
//         <Form.Group controlId="email" bsSize="large">
//           <FormLabel>Create an Account</FormLabel>
//           <br/>
//           <FormControl
//             autoFocus
//             type="email"
//             placeholder="Enter your Email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//           />
//         </Form.Group>

//         <Button block bsSize="large" disabled={!validateForm()} type="submit">
//           Submit
//         </Button>
//         <p id="or" >or</p>
//         <GoogleButton
//         type="light"
//   onClick={() => { console.log('Google button clicked') }}
// />
//       </form>
//     </div>
//   );
// }

const AccountPage = () => {
  const user = useContext(UserContext)
  const { displayName, email } = user
  return (
    <div>
      <div>
        <h2>{displayName}</h2>
        <h3>{email}</h3>
        <button
          onClick={() => {
            auth.signOut()
          }}>
          Sign out
        </button>
      </div>
      <button
        onClick={() => {
          db.collection('cohortCode').add({
            cohort: 'unc',
            studentID: '1231251',
          })
        }}>
        Generate cohort Code
      </button>
    </div>
  )
}

export default AccountPage
