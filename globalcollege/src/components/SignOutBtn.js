import React from 'react'
import '../css/components.css'

import { signOut } from '../firebase/firebase';

import Button from '@material-ui/core/Button';

function SignOut() {
  return (
    <div>
			<Button onClick={signOut}>
        Sign Out
      </Button>
    </div>
  )
}

export default SignOut;