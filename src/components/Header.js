import React from 'react';
import '../css/components.css';

import SignOutBtn from './SignOutBtn';
import { render } from '@testing-library/react';

const paths = {
	"/": "Easy Access",
	"/account": "Account",
	"/caseload_management": "Caseload Management",
	"/college_list": "College List",
	"/notes": 'Notes',
	"/schedule": "Schedule"
}

class Header extends React.Component{
	constructor(props){
		super(props);
		this.pathname = window.location.pathname;
	}

	render() {
		return (
			<div className="header">
				<div className="header-acc">
					{this.props.isLoggedIn ? <SignOutBtn/>: null}
				</div>
				<div className="header-title">
					{paths[this.pathname]}
				</div>
			</div>
	  );

	}
}

export default Header;