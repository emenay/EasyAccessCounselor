import React from 'react';
import '../css/components.css';

import SignOutBtn from './SignOutBtn';
import {UserContext} from '../providers/UserProvider';

class Header extends React.Component{
	static contextType = UserContext;

	changeSelected = (e) => {
		this.context.changeSelectedCohort(e);
		this.setState({selectedCohort: e.target.value});
	}

	render() {
		if (this.props.isLoggedIn) {
			return (
			<div className="header">
			<select className="header-select" value={this.context.state.selectedCohort ? this.context.state.selectedCohort : ""} onChange={this.changeSelected}>
				{this.context.state.cohorts.map((cohort, index)=>{
					return <option key={index} className="header-option" value={cohort.id}>{cohort.name}</option>
				})}
			</select>
			<SignOutBtn/>
		</div>);
		}
		return <div className="header"/>

	}
}

export default Header;