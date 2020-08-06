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
      <div>
        <div className="signup-container">
          <div className="signup-content">
            <p className='detail-text'>Email</p>
            <input type='text' placeholder="Email" onChange={e=>setEmail(e.target.value)} />
            <div className="name-section">
                <p className='detail-text'>First Name</p>
                <input type='text' placeholder="First Name" onChange={e=>setFirst(e.target.value)} />
            </div>
            <div className="name-section">
                <p className='detail-text'>Last Name</p>
                <input type='text' placeholder="Last Name" onChange={e=>setLast(e.target.value)} />
            </div>
            <p className='detail-text'>Password</p>
            <input type='password' placeholder="Password" onChange={e=>setPassword(e.target.value)} />
            <input type='password' placeholder="Confirm Password" onChange={e=>setConf(e.target.value)} />
            <button onClick={()=>signupClick(email, password, confPassword, first, last)} >Sign up</button>
          </div>
        </div>
      </div>
      );
}

export default SignupPage;