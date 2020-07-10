import React from 'react';
import '../css/components.css';

import SignOutBtn from './SignOutBtn';
import {UserContext} from '../providers/UserProvider';

class Header extends React.Component{
	static contextType = UserContext;
	constructor(props){
		super(props);
		this.state = {selectedCohort: typeof this.context !== "undefined" ? this.context.state.selectedCohort : null}
	}

	changeSelected = (e) => {
		this.context.changeSelectedCohort(e);
		this.setState({selectedCohort: e.target.value});
	}

	render() {
		if (this.props.isLoggedIn) {
			return (
			<div className="header">
			<select className="header-select" value={this.state.selectedCohort ? this.state.selectedCohort : ""} onChange={this.changeSelected}>
				{this.context.state.cohorts.map((cohort, index)=>{
					return <option key={index} className="header-option" value={cohort.uid}>{cohort.name}</option>
				})}
			</select>
			<SignOutBtn/>
		</div>);
		}
		return <div className="header"/>

	}
}

export default Header;