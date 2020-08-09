import React from 'react';
import '../css/components.css';

import ea_icon from '../assets/ea_logo.png';
import wordmark from '../assets/wordmark.png';
import { signOut } from '../firebase/firebase';
import login from '../assets/login.png';
import signup from '../assets/signup.png';
import {UserContext} from '../providers/UserProvider';
import {history} from '../views/App';
import {db} from '../firebase/firebase';

function LinkButton(props) {
	return(
		<button className="link-button" style={{backgroundImage: `url(${props.image})`}} onClick={()=>history.push(props.path)} />
	);
}

class Header extends React.Component{
	static contextType = UserContext;

	changeSelected = (e) => {
		this.context.changeSelectedCohort(e);
		db.collection('counselors').doc(this.context.state.user.uid).update({selectedCohort: e.target.value});
		this.setState({selectedCohort: e.target.value});
	}

	displayHelper = () => {
		if (this.context.state.cohorts.length === 0) {
			return(
				<select className="header-select" value={"No Cohorts"} onChange={this.changeSelected}>
					<option className="header-option" value="No Cohorts" hidden={true}>No Cohorts</option>
				</select>);

		} else {
			return(
			<select className="header-select" value={this.context.state.selectedCohort ? this.context.state.selectedCohort : ""} onChange={this.changeSelected}>
			{this.context.state.cohorts.map((cohort, index)=>{
				return <option key={index} className="header-option" value={cohort.uid}>{cohort.name}</option>
			})}
			</select>);
		}
	}

	render() {
		return (
		<div className="header">
			<div className="header-section">
				<img src={ea_icon} alt='Easy Access Icon' />
				<img src={wordmark} alt='Easy Access Title'/>
			</div>
			<div className="header-section">
				{this.props.isLoggedIn ? this.displayHelper() : <LinkButton image={login} path='/login'/>}
				{this.props.isLoggedIn ? <button className="signout" onClick={signOut}/> :  <LinkButton image={signup} path='/signup'/>}
			</div>
		</div>);

	}
}

export default Header;