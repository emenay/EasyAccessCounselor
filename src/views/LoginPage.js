import React, {useState} from 'react';
import '../css/LoginPage.css';

import { auth} from '../firebase/firebase';

function login(email, password){
  console.log("here");
  auth.signInWithEmailAndPassword(email, password).catch(error=>window.alert(error));
}

function LoginPage(prop) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    return (
      <div className='background'>
        <div className="LoginBoxContainer">
          <div className="login-content">
            <div className='login-tabs'>
              <div className='login-tab'>Counselor Login</div>
              <div className='login-tab'>Student Login</div>
            </div>
            <div className='login-body'>
              <p>Welcome</p>
              <input type='text' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/>
              <input type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}/>
              <button className='login-button' onClick={()=>login(email, password)}>Login</button>
            </div>
          </div>
        </div>
      </div>
      );
}

/*
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
}*/

export default LoginPage;