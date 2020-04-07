import React from 'react';

import { signOut } from '../firebase/firebase';

class HomePage extends React.Component {
    render() {
        return (
          <div>
            <h1>Logged In</h1>
            <button onClick={signOut}>
                Logout
            </button>
          </div>
        );
    }
}

export default HomePage;
