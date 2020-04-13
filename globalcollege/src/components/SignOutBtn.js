import React from 'react'
import '../css/components.css'

import { signOut } from '../firebase/firebase';

function SignOut() {
  return (
    <div>
			<button onClick={signOut}>
        Sign Out
      </button>
    </div>
  )
}

export default SignOut;