import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { auth, emailAndPassword} from '../firebase/firebase';
import '../css/LoginPage.css';

const uiConfig = {
    signInOptions: [emailAndPassword],
    credentialHelper: 'none'
};

class LoginPage extends React.Component {
    render() {
        return (
          <div className="LoginBoxContainer">
            <div className="LoginBox">
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
            </div>
          </div>
        );
    }
}

export default LoginPage;