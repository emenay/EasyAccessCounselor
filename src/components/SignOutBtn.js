import React from 'react';
import '../css/components.css';

import { signOut } from '../firebase/firebase';

function SignOut() {
  return (
    <button className='signout' onClick={signOut} />
  )
}

export default SignOut;