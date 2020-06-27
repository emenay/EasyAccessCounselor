import React from 'react';
import '../css/components.css';

import SignOutBtn from './SignOutBtn';
/*
const paths = {
	"/": "Easy Access",
	"/account": "Account",
	"/caseload_management": "Caseload Management",
	"/college_list": "College List",
	"/notes": 'Notes',
	"/schedule": "Schedule"
}*/

function Header(props) {
	//const pathname = window.location.pathname;

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
		</div>
  )
}

export default Header;

/* 
<div className="header-title">
				{paths[pathname]}
			</div>
			*/