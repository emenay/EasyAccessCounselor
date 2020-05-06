import React from 'react';
import '../css/components.css';

import SignOutBtn from './SignOutBtn';

const paths = {
	"/": "Home",
	"/account": "Account",
	"/about": "Testing",
	"/caseload_management": "Caseload Management",
	"/college_list": "College List",
	"/schedule": "Schedule"
}

function Header(props) {
	const pathname = window.location.pathname;

	let signout;
	if (props.isLoggedIn) {
		signout = <SignOutBtn/>;
	} else {
		signout = null;
	}

  return (
		<div className="header">
			<div className="header-acc">
				{ signout }
			</div>
			<div className="header-title">
				{paths[pathname]}
			</div>
		</div>
  )
}

export default Header;