import React, {useState} from 'react';
import '../css/SignupPage.css';

import { auth} from '../firebase/firebase';
import {history} from './App';

async function signupClick(email, password, confPassword, first, last){
    if (password !== confPassword) {
        window.alert("Passwords don't match")
    } else if (first === '' || last === '') {
        window.alert("Must enter firstname and lastname");
    } else {
        try {
            let result = await auth.createUserWithEmailAndPassword(email, password);
            history.push('/cohortcreation');
            await result.user.updateProfile({
                    firstName: first,
                    lastName: last
            });

        } catch (err) {
            window.alert(err);
        }
        
    }
}

function SignupPage(prop) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConf] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');

    return (
        <div className="signup-container">
          <div className="signup-content">
            <p className='detail-text full-width'>Email</p>
            <input className='full-width' type='text' placeholder="Email" onChange={e=>setEmail(e.target.value)} />
            <div className="name-section">
                <p className='detail-text'>First Name</p>
                <input type='text' placeholder="First Name" onChange={e=>setFirst(e.target.value)} />
            </div>
            <div className="name-section">
                <p className='detail-text'>Last Name</p>
                <input type='text' placeholder="Last Name" onChange={e=>setLast(e.target.value)} />
            </div>
            <p className='detail-text full-width'>Password</p>
            <input className="full-width" type='password' placeholder="Password" onChange={e=>setPassword(e.target.value)} />
            <input className="full-width" type='password' placeholder="Confirm Password" onChange={e=>setConf(e.target.value)} />
            <button className="signup-btn" onClick={()=>signupClick(email, password, confPassword, first, last)} >Sign up</button>
          </div>
      </div>
      );
}

export default SignupPage;