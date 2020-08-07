import React, {useState, useContext, useEffect} from 'react';
import edit_symbol from '../assets/edit_symbol.png';
import profile_avatar from '../assets/profile_avatar.png';
import orange_flag from "../assets/orange_flag.png";
import {db} from '../firebase/firebase';
import {UserContext} from '../providers/UserProvider';
import firebase from 'firebase/app';

function meetingsNumber(person, field) {
    if (typeof person[field] === "undefined"){
        return 0;
    }
    return Number(person[field]);
}

function uploadNote(date, type, text, personId, cohortId) {
    if (cohortId) {
        db.collection("student_counselors").doc(cohortId)
        .collection("students").doc(personId)
        .update({notes: firebase.firestore.FieldValue.arrayUnion({date: new Date(date), type: type, text: text})})
        .catch(error=>console.log(error));
    }
}

function CollegeListPanel(props){
    const [editing, changeEditing] = useState(false);
    let info = props.info;
    return (
        <div className="college-panel">
            <div className="college-side">
                <b>College Information</b>
                <p><span>Field of Study 1: </span>{info.major}</p>
                <p><span>Field of Study 2: </span>{info.major2}</p>
                <p><span>Region: </span>{info.region}</p>
                <p><span>College Size: </span>{info.collegeSize}</p>
                <p><span>College Setting: </span>{info.collegeSetting}</p>
                <p><span>College Diversity (% URM:) </span>{info.collegeDiversity}</p>
                <p><span>College Diversity (Type): </span>{info.collegeDiversityTypes}</p>
                <p><span>Religion: </span>{info.religion}</p>
                <p><span>Military/ROTC: </span>{info.rotc}</p>
                <p><span>Athletics: </span>{info.athletics}</p>
            </div>
            <div className="college-side">
                <b>Student Information</b>
                <p><span>State: </span>{info.state}</p>
                <p><span>Zip: </span>{info.zipcode}</p>
                <p><span>GPA: </span>{info.gpa}</p>
                <p><span>Class Rank: </span>{info.classRank}</p>
                <p><span>ACT: </span>{info.act}</p>
                <p><span>SAT: </span>{info.sat}</p>
                <p><span>EFC: </span>{info.efc}</p>
                <p><span>Ability to Pay Mismatch: </span>{info.payMismatch}</p>
            </div>
            <button className="studentdetails-editbutton" onClick={()=>changeEditing(!editing)}/>
        </div>
    );
}

/* Note: I'm using many grids instead of one because we'll later have to loop through all a person's notes */
/*function arrayReducer(array, val) {
    var new_arr = array.slice();
    new_arr.unshift(val);
    return new_arr;
}*/


function NotesPanel(props) {
    let info = props.info;
    const context = useContext(UserContext);
    const [noteType, changeNoteType] = useState("Individual");
    const [text, changeText] = useState("");
    const [date, changeDate] = useState(new Date().toISOString().slice(0, 10));
    const [notes, setNotes] = useState([]);
    const [noteViewed, changeNoteViewed] = useState(null);

    useEffect(()=>{
        setNotes(info.notes === undefined ? [] : info.notes.reverse());
    }, []);

    return (
        <div className="caseload-panel">
            <div className="caseload-meetingsnum">
                <p>Meetings:</p>
                <p>{"Individual - " + meetingsNumber(info, "individualMeetings")}</p>
                <p>{"Event - " + meetingsNumber(info, "eventMeetings")}</p>
                <p>{"Group - " + meetingsNumber(info, "groupMeetings")}</p>
                <p>{"Total - " + (meetingsNumber(info, "individualMeetings") + meetingsNumber(info, "eventMeetings") + meetingsNumber(info, "groupMeetings"))}</p>
            </div>
            <div className="caseload-maincontent">
                <div className="caseload-noteitem">
                    <p>Date of Meeting</p>
                    <p>Type of Meeting</p>
                    <p>Notes</p>
                </div>
                <div className="caseload-noteitem">
                    <input type="date" className="caseload-enterdate" value={date} onChange={e=>(changeDate(e.target.value))} />
                    <select value={noteType} className="caseload-notetype" onChange={e=>changeNoteType(e.target.value)}>
                        <option value="Individual">Individual</option>
                        <option value="Group">Group</option>
                        <option value="Event">Event</option>
                    </select>
                    <div>
                        <textarea className="caseload-notetext" value={text} onChange={e=>changeText(e.target.value)} />
                        <button className="caseload-savebutton" onClick={()=>{
                            //uploadNote(date, noteType, text, info.uid, context.state.selectedCohort); 
                            //addNotes({date: date, type: noteType, text: text});
                            info.notes.unshift({date: date, type: noteType, text: text});
                            changeText("");
                            changeDate(new Date().toISOString().slice(0, 10));
                        }}>Save</button>
                    </div>
                </div>
                {notes.map((note, index)=>{
                    return(
                    <div className="caseload-noteitem" key={index}>
                        <p className="caseload-textitem">{typeof note.date === "string" ? note.date : note.date.toDate().toISOString().slice(0,10)}</p>
                        <p className="caseload-textitem">{note.type}</p>
                        <p className={"caseload-textitem itemhoverable" + (noteViewed === note ? " viewingNote" : "")} onClick={()=>{noteViewed===note ? changeNoteViewed(null) : changeNoteViewed(note)}}>{note.text}</p>
                    </div>
                    );
                })}
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
        this.tabs = ["General Information", "Notes", "College List", "Application Process"];
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
            case 'Notes':
                return <NotesPanel info={this.props.info}/>
            case 'College List':
                return <CollegeListPanel info={this.props.info}/>
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
                <div className={"studentdetails-content" + (this.state.selectedTab === "Notes" ? " caseloadContents" : "")}>
                    {this.whichPanel(this.state.selectedTab)}
                </div>
            </div>
        </div>
    }
}

export default StudentDetailsModal;