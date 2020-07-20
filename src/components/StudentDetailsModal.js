import React, {useState} from 'react';
import edit_symbol from '../assets/edit_symbol.png';
import profile_avatar from '../assets/profile_avatar.png';
import orange_flag from "../assets/orange_flag.png";

function meetingsNumber(person, field) {
    if (typeof person[field] === "undefined"){
        return 0;
    }
    return Number(person[field]);
}

/* Note: I'm using many grids instead of one because we'll later have to loop through all a person's notes */

function CaseloadManagementPanel(props) {
    const [editing, changeEditing] = useState(false);
    const [text, changeText] = useState("");
    let info = props.info;
    return (
        <div className="caseload-panel">
            <div className="caseload-meetingsnum">
                <p>Meetings:</p>
                <p>{"Individual - " + meetingsNumber(info, "individualMeetings")}</p>
                <p>{"Event - " + meetingsNumber(info, "eventMeetings")}</p>
                <p>{"Group - " + meetingsNumber(info, "groupMeetings")}</p>
                <p>{"Total - " + (meetingsNumber(info, "individualMeetings") + meetingsNumber(info, "eventMeetings") + meetingsNumber(info, "groupMeetings"))}</p>
            </div>
            <div className="caseload-noteitem">
                <p>Date of Meeting</p>
                <p>Type of Meeting</p>
                <p>Notes</p>
            </div>
            <div className="caseload-noteitem">
                <p className="caseload-notedate">7/1/20</p>
                <select value="group" className="caseload-notetype">
                    <option value="individual">Individual</option>
                    <option value="group">Group</option>
                    <option value="event">Event</option>
                </select>
                <textarea className="caseload-notetext" value={text} onChange={e=>changeText(e.target.value)} />
            </div>
        </div>
    );
}

function editSelection(isEditing, title, field, info){
    if (isEditing) return <p><span>{title + ": "}</span><input type="text" /></p>
    return <p><span>{title + ": "}</span>{info[field]}</p>
}

function ApplicationProcessPanel(props) {
    const [editing, changeEditing] = useState(false);
    let info = props.info
    return(
        <div className="appproc-panel">
            <div className="appproc-col">
                <div className="app-group">
                    <div className="app-circle" />
                    <b>Pre-Application</b>
                    <p><span>Visits: </span>{info.visits}</p>
                    <p>Balanced College List</p>
                </div>
                <div className="app-group">
                    <div className="app-circle" />
                    <b>Application Checklist</b>
                    <p><span>Early Applications: </span>{info.earlyApplications}</p>
                    <p><span>Regular Applications: </span>{info.regularApplications}</p>
                    <p><span>Essays: </span>{info.essays}</p>
                    <p><span>Testing: </span>{info.testing}</p>
                    <p><span>Counselor Recommendations: </span>{info.counselorRecommendations}</p>
                    <p><span>Teacher Recommendations: </span>{info.resume}</p>
                </div>
                <div className="app-group">
                    <div className="app-circle" />
                    <b>Post-Application</b>
                    <p><span>Results: </span>{info.results}</p>
                    <p><span>Admitted Schools: </span>{info.admittedSchools}</p>
                    <p><span>Rejected Schools: </span>{info.rejectedSchools}</p>
                    <p><span>Waitlisted Schools: </span>{info.waitlistedSchools}</p>
                    <p><span>Student Decision: </span>{info.decision}</p>
                </div>
                <div className="app-group">
                    <div className="app-circle" />
                    <b>Post-Decision Checklist</b>
                    <p><span>Deposit: </span>{info.deposit}</p>
                    <p><span>Orientation: </span>{info.orientation}</p>
                    <p><span>Summer Programs: </span>{info.summerPrograms}</p>
                    <p><span>Housing: </span>{info.housing}</p>
                </div>
                <div className="app-group" style={{borderLeft: "0px"}}>
                    <div className="app-circle" />
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
            <button className="studentdetails-editbutton" onClick={()=>changeEditing(!editing)}/>
        </div>
    );
}

function GeneralInformationPanel(props) {
    const [editing, changeEditing] = useState(false);
    let info = props.info;
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
            {editing ? <p>EDITING</p> : null}
            <button className="studentdetails-editbutton" onClick={()=>changeEditing(!editing)}/>
        </div>
}

class StudentDetailsModal extends React.Component {
    constructor(props) {
        super(props);
        this.tabs = ["General Information", "Caseload Management", "College List", "Application Process"];
        this.state = {
            selectedTab: "General Information"
        }
    }

    changeTab = (tab) => {
        this.setState({selectedTab: tab});
    }

    whichPanel = (tab) => {
        switch(tab){
            case 'General Information':
                return <GeneralInformationPanel info={this.props.info}/>
            case 'Application Process':
                return <ApplicationProcessPanel info={this.props.info}/>
            case 'Caseload Management':
                return <CaseloadManagementPanel info={this.props.info}/>
            default:
                return <p>Hello world</p>
        }
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
                </div>
            </div>
        </div>
    }
}

export default StudentDetailsModal;