import React from 'react';
import '../css/components.css';

import SignOutBtn from './SignOutBtn';
import {UserContext} from '../providers/UserProvider';

const paths = {
	"/": "Easy Access",
	"/account": "Account",
	"/caseload_management": "Caseload Management",
	"/college_list": "College List",
	"/notes": 'Notes',
	"/schedule": "Schedule"
}

class Header extends React.Component{
	static contextType = UserContext;
	constructor(props){
		super(props);
		this.pathname = window.location.pathname;
	}

	render() {
		console.log(this.context);
		return (
			<div className="header">
				<div className="header-acc">
					{this.props.isLoggedIn ? <SignOutBtn/>: null}
					<select class="header-select" defaultValue={this.context.state.selectedCohort} onChange={this.context.changeSelectedCohort}>
						{this.context.state.cohorts.map((cohort, index)=>{
							return <option key={index} className="header-option" value={cohort.uid}>{cohort.name}</option>
						})}
					</select>
				</div>
				<div className="header-title">
					{paths[this.pathname]}
				</div>
			</div>
	  );

	}
}

export default Header;