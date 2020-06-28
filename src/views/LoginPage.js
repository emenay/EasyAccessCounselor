import React from 'react';
import '../css/LoginPage.css';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth, emailAndPassword} from '../firebase/firebase';

const uiConfig = {
    signInOptions: [emailAndPassword],
    credentialHelper: 'none'
};

class LoginPage extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      selectedCounselor: true // True when counselor view selected, false when student
    }
  }

  render() {
    return (
      <div className="loginbackground-gradient">
        <div className="loginbox-wrapper">
          <div className="loginbox-tabs">
            <button className="loginbox-tab">Counselor</button>
            <button className="loginbox-tab">Students</button>
          </div>
          <div className="LoginBox">
            Hello world!
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;

/* Original 
      <div>
        <div className="LoginBoxContainer">
          <div className="LoginBox">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
          </div>
        </div>
      </div>
*/