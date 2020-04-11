import React from 'react'
import '../../css/components.css'

import { signOut } from '../../firebase/firebase';

function SignOut() {
  return (
    <div>
      <p>You are signed in.</p>
			<button onClick={signOut}>
        Logout
      </button>
    </div>
  )
}

export default SignOut;