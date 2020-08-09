import React, {useState} from 'react';
import '../css/LoginPage.css';

import {auth} from '../firebase/firebase';
import {history} from './App';

function login(email, password){
  auth.signInWithEmailAndPassword(email, password)
  .then(result => history.push('caseload_management'))
  .catch(error => window.alert(error));
}

function resetPassword(email) {
  auth.sendPasswordResetEmail(email).then(function() {
    window.alert("Email sent to your address");
  }).catch(function(error) {
    window.alert(error);
  });
}

function LoginPage(prop) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    return (
      <div className='background'>
          <div className="login-content">
            <div className='login-tabs'>
              <div className='login-tab selected'><p>Counselor Login</p></div>
              <div className='login-tab' onClick={()=>window.alert("Student Login Coming Soon!")}><p>Student Login</p></div>
            </div>
            <div className='login-body'>
              <p className="welcome-text">Welcome!</p>
              <input type='text' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/>
              <input type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}/>
              <button className='login-button' onClick={()=>login(email, password)}>Login</button>
              <p className='password-reset' onClick={e=>resetPassword(email)}>Forgot your password?</p>
            </div>
          </div>
      </div>
      );
}


export default LoginPage;