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
      <div>
        <div className="LoginBoxContainer">
          <div className="LoginBox">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
          </div>
        </div>
      </div>
      );
    }
}

export default LoginPage;