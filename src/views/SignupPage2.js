import React, {useState} from 'react';
import '../css/SignupPage.css';

import { auth} from '../firebase/firebase';
import {history} from './App';


function SignupPage2(prop) {
    

    return (
        <div className="signup-container">
          <div className="signup-content">
          <button className="signup-btn" >Sign up for Free</button>
        
          </div>
      </div>
       
      );
}

export default SignupPage2;