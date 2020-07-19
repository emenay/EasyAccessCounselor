import React from 'react';
import edit_symbol from '../assets/edit_symbol.png';
import profile_avatar from '../assets/profile_avatar.png';
import orange_flag from "../assets/orange_flag.png";

class ApplicationProcessPanel extends React.Component {
    render() {
        let info = this.props.info;
        return(
            <div className="appproc-panel">
                <div className="appproc-col">
                    <div className="app-group">
                        <b>Pre-Application</b>
                        <p><span>Visits: </span>{info.visits}</p>
                        <p>Balanced College List</p>
                    </div>
                    <div className="app-group">
                        <div className="app-circle"></div>
                        <b>Application Checklist</b>
                        <p><span>Early Applications: </span>{info.earlyApplications}</p>
                        <p><span>Regular Applications: </span>{info.regularApplications}</p>
                        <p><span>Essays: </span>{info.essays}</p>
                        <p><span>Testing: </span>{info.testing}</p>
                        <p><span>Counselor Recommendations: </span>{info.counselorRecommendations}</p>
                        <p><span>Teacher Recommendations: </span>{info.resume}</p>
                    </div>
                    <div className="app-group">
                        <b>Post-Application</b>
                        <p><span>Results: </span>{info.results}</p>
                        <p><span>Admitted Schools: </span>{info.admittedSchools}</p>
                        <p><span>Rejected Schools: </span>{info.rejectedSchools}</p>
                        <p><span>Waitlisted Schools: </span>{info.waitlistedSchools}</p>
                        <p><span>Student Decision: </span>{info.decision}</p>
                    </div>
                    <div className="app-group">
                        <b>Post-Decision Checklist</b>
                        <p><span>Deposit: </span>{info.deposit}</p>
                        <p><span>Orientation: </span>{info.orientation}</p>
                        <p><span>Summer Programs: </span>{info.summerPrograms}</p>
                        <p><span>Housing: </span>{info.housing}</p>
                    </div>
                    <div className="app-group">
                        <b>Graduation!</b>
                    </div>
                </div>
                <div className="appproc-col">
                    <b>Financial Aid</b>
                    <p><span>App Fee Waiver: </span>{info.appFeeWaiver}</p>
                    <p><span>FAFSA Status: </span>{info.fafsaStatus}</p>
                    <p><span>FAFSA Verification: </span>{info.fafsaVerification}</p>
                    <p><span>Financial Aid Award Letters: </span>{info.financialAidAwardLetters}</p>
                    <p><span>Financial Aid Appeal: </span>{info.financialAidAppeal}</p>
                    <p><span>CSS Profile: </span>{info.cssProfile}</p>
                </div>
            </div>
        );
    }
}

class GeneralInformationPanel extends React.Component {
    render() {
        let info = this.props.info;
        return <div className="geninfo-panel">
            <div className="geninfo-row1">
                <div className="geninfo-col1">
                    <p><span>Date of Birth: </span>{info.dob}</p>
                    <p><span>Ethnicity: </span>{info.ethnicity}</p>
                    <p><span>Gender: </span>{info.gender}</p>
                    <p><span>Race: </span>{info.race}</p>
                    <p><span>GPA: </span>{info.gpa}</p>
                    <p><span>Class Rank: </span>{info.classRank}</p>
                    <p><span>SAT Score: </span>{info.sat}</p>
                    <p><span>ACT Score: </span>{info.act}</p>
                </div>
                <div className="geninfo-col2">
                    <p><span>Parent Email: </span>{info.parentEmail}</p>
                    <p><span>Parent Email 2: </span>{info.parentEmail2}</p>
                    <p><span>Parent Phone: </span>{info.parentPhone}</p>
                    <p><span>Parent Phone 2: </span>{info.parentPhone2}</p>
                    <p><span>Student Email: </span>{info.studentEmail}</p>
                    <p><span>Student Phone: </span>{info.studentPhone}</p>
                </div>
                <div className="geninfo-col3">
                    <img className="studentdetails-avatar" alt="avatar icon" src={profile_avatar}/>
                    <p><span>Student ID: </span>{info.id}</p>
                </div>
            </div>
            <p><span>Counselor Notes: </span>{info["Latest Note"]}</p>
            {this.props.isEditing ? <p>EDITING</p> : null}
        </div>
    }
}

class StudentDetailsModal extends React.Component {
    constructor(props) {
        super(props);
        this.tabs = ["General Information", "Caseload Management", "College List", "Application Process"];
        this.state = {
            selectedTab: "General Information",
            isEditing: false
        }
    }

    changeTab = (tab) => {
        this.setState({selectedTab: tab})
    }

    whichPanel = (tab) => {
        switch(tab){
            case 'General Information':
                return <GeneralInformationPanel info={this.props.info} isEditing={this.state.isEditing}/>
            case 'Application Process':
                return <ApplicationProcessPanel info={this.props.info} isEditing={this.state.isEditing}/>
            default:
                return <p>Hello world</p>
        }
    }

    editToggle = () => {
        this.setState({isEditing: !this.state.isEditing});
    }

    render(){
        return <div className="studentdetails-modal" onClick={this.props.exitModal}>
            <div className="studentdetails-background" onClick={(e)=> e.stopPropagation()}>
                {this.tabs.map((name, index)=>{
                    return <div style={{left: (index * 25.06666)+"%"}} className={"studentdetails-tab" + (this.state.selectedTab === name ? " tab-selected" : "")} onClick={()=>this.changeTab(name)} key={index}>
                        <p className="tab-text">{name}</p>
                    </div>
                })}
                <div className="studentdetails-titleflag">
                    <p className="studentdetails-title">{this.props.info.firstName + " " + this.props.info.lastName}</p>
                    {this.props.flagged ? <img className="studentdetails-flag" src={orange_flag} alt="flagged icon"/> : null}
                </div>
                <p className="studentdetails-goal">{"Goal: " + (typeof this.props.info.goal === "undefined" ? "--" : this.props.info.goal)}</p>
                <div className="studentdetails-innerbackground"/>
                <div className="studentdetails-content">
                    {this.whichPanel(this.state.selectedTab)}
                    <button className="studentdetails-editbutton" onClick={this.editToggle}/>
                </div>
            </div>
        </div>
    }
}

export default StudentDetailsModal;