import React from 'react';
import '../css/LoginPage.css';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth, emailAndPassword} from '../firebase/firebase';

const uiConfig = {
    signInOptions: [emailAndPassword],
    credentialHelper: 'none'
};

class LoginPage extends React.Component {
    render() {
      return (
        <div className="loginbackground-gradient">
          <div className="LoginBox">
            
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