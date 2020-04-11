import React from 'react';
import '../css/LoginPage.css';

import LoginBox from '../components/login/LoginBox';
import SignOut from '../components/login/SignOut';

import Header from '../components/Header';

class LoginPage extends React.Component {
    render() {
      return (
				<div>
          <Header/>
					{ this.props.hasUser ? <SignOut /> : <LoginBox />}
				</div>
      );
    }
}

export default LoginPage;