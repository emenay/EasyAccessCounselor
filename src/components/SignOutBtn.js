import React from 'react';
import '../css/components.css';

import { signOut } from '../firebase/firebase';

import Button from '@material-ui/core/Button';

function SignOut() {
  return (
    <Button style={{width: "100px"}} onClick={signOut}>
      Sign Out
    </Button>
  )
}

export default SignOut;