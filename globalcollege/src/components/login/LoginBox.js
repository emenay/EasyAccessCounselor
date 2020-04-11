import React from 'react'
import '../../css/components.css'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { auth, emailAndPassword} from '../../firebase/firebase';

const uiConfig = {
    signInOptions: [emailAndPassword],
    credentialHelper: 'none'
};

function LoginBox() {
  return (
    <div className="LoginBoxContainer">
      <div className="LoginBox">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
      </div>
    </div>
  )
}

export default LoginBox;