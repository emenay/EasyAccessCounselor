import React, {useState, useContext, useEffect} from 'react';
import edit_symbol from '../assets/essentials_icons/svg/edit-1.svg';
import plus_symbol from "../assets/essentials_icons/svg/plus.svg";
import profile_avatar from '../assets/profile_avatar.png';
import orange_flag from "../assets/orange_flag.png";
import {db} from '../firebase/firebase';
import {UserContext} from '../providers/UserProvider';
import firebase from 'firebase/app';

// File controls popups for student profiles page
// Each tab in the popup is a component "panel" displayed by the StudentDetailsModal

// Fairly static panel displaying info on college list
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

// Helper for formating number of meetings
function meetingsNumber(person, field) {
    if (typeof person[field] === "undefined"){
        return 0;
    }
    return Number(person[field]);
}

// Uploads a note based on note data
function uploadNote(date, type, text, personId, cohortId) {
    if (cohortId) {
        db.collection("student_counselors").doc(cohortId)
        .collection("students").doc(personId)
        .update({notes: firebase.firestore.FieldValue.arrayUnion({date: new Date(date), type: type, text: text})})
        .catch(error=>console.log(error));
    }
}

// Panel allows user to upload notes
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
                            uploadNote(date, noteType, text, info.uid, context.state.selectedCohort); 
                            if (info.notes === undefined) {
                                info.notes = [{date: date, type: noteType, text: text}];
                                setNotes(info.notes);
                            }else {
                                info.notes.unshift({date: date, type: noteType, text: text});
                            }
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

// Static panel for viewing Application Process
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

function GenInfoCol(props) {
    // just do the jsx rendering
    console.log("made it to to genInfoCol");
    console.log("fields to render: " + props.fields);

    const fields = props.fields.sort();

    let col = []
    for (let i=0; i<fields.length; i+=2) {
        col.push(genInfoColRow(fields[i], fields[i+1], props.info, props.editing, props.removeFromPreferences))
    }

    return <div className="fieldsSection">
            {col}
        </div>
}

function genInfoColRow(field1, field2, info, editing, removeFromPreferences) {
    const processedField1 = processField(field1);
    const processedField2 = processField(field2);
    const info1 = info[field1];
    const info2 = info[field2]; 
    
    let elts = []
    if (processedField1) elts.push(<ModalFieldElement editing={editing} removeFromPreferences={removeFromPreferences} field={processedField1} info={info1} dbField={field1}/>);
    if (processedField2) elts.push(<ModalFieldElement editing={editing} removeFromPreferences={removeFromPreferences} field={processedField2} info={info2} dbField={field2}/>);
    
    return <div className="genInfoRow">
        {elts}
    </div>
    
}

function ModalFieldElement(props) {
    return <div className="modalFieldElement">
        {props.editing === true ? <a onClick={() => props.removeFromPreferences(props.dbField)}> X </a> : ""}
        <p><span>{props.field}: </span>{props.info}</p>
    </div>
}


// TODO: Implement the ability to add new fields
function AddFieldElt(props) {

    return <div className="addFieldElt">

    </div>
}

function EditButtonSuite(props) {
    return <div className="editButtonSuite">
        <button className="addFieldButton"><img src={plus_symbol} />Add Item</button>
        <div className="saveCancelContainer">
            <button className="save" onClick={() => {props.editExit(false, true)}}>Save Changes</button>
            <button className="cancel" onClick={() => {props.editExit(false, false)}}>Cancel</button>
        </div>
    </div>
}

function HandleEditInit(props) {
        return <div>
            {props.editing === true ? 
                <EditButtonSuite editExit={props.setEdit} fields={props.fieldsData}/> :
                <button className="studentdetails-editbutton" onClick={()=> {props.setEdit(true)}}>
                    <img src={edit_symbol} alt="edit"/>
                </button>
            }
        </div>
}

function findEltinArr(arr, elt) {
    for (let i=0; i<arr.length; i++) {
        if (arr[i] === elt) {
            return i;
        }
    }

    return -1;
}

function processField(field) {

    if (field === "uid" || field === "goal") return null;

    const fieldSwap = {
        id  :  "UniqueID",
        firstName  :  "First Name",
        lastName  :  "Last Name",
        dob  :  "Date of Birth",
        ethnicity  :  "Ethnicity",
        gender  :  "Gender",
        gpa  :  "GPA",
        classRank  :  "Class Rank",
        sat  :  "SAT",
        act  :  "ACT",
        goal  :  "Goal",
        studentEmail  :  "Student Email",
        studentEmail2  :  "Student Email 2",
        studentPhone  :  "Student Phone",
        parentEmail  :  "Parent Email",
        parentEmail2  :  "Parent Email 2",
        parentPhone  :  "Parent Phone",
        parentPhone2  :  "Parent Phone 2",
        studentAddress  :  "Student Address",
        totalMeetings  :  "Total Meetings",
        individualMeetings  :  "Individual Meetings",
        groupMeetings  :  "Group Meetings",
        eventMeetings  :  "Event Meetings",
        state  :  "State",
        zipcode  :  "Zipcode",
        efc  :  "EFC",
        payMismatch  :  "Ability to Pay Mismatch",
        major  :  "Field of Study/Major 1",
        major2  :  "Field of Study/Major 2",
        safetyColleges  :  "Safety Colleges",
        targetColleges  :  "Target Colleges",
        reachColleges  :  "Reach Colleges",
        additions  :  "Counselor Additions",
        region  :  "Want to Attend (Region)",
        collegeSize  :  "College Size",
        collegeSetting  :  "College Setting",
        collegeDiversity  :  "College Diversity (% URM)",
        collegeDiversityTypes  :  "College Diversity (Types)",
        religion  :  "Religion",
        rotc  :  "Military/ROTC",
        athletics  :  "Athletics",
    }

    if (field in fieldSwap) return fieldSwap[field];
    return field;
}

// static panel for general info
function GeneralInformationPanel(props) {
    const [editing, changeEditing] = useState(false);
    const [fieldsData, setFieldsData] = useState(false);
    const [pullFromDataBase, setPullFromDatabase] = useState(true);
    // const context = useContext(UserContext);
    useEffect(() => {
        refreshWithDatabase();
        setPullFromDatabase(false);
    }, [])

    const refreshWithDatabase = () => {
        console.log("DB refresh called");
        console.log(props.info);
        db.collection("student_counselors").doc(props.cohort).get()
        .then(resp => {
            if (resp.data().genInfoFields) {
                setFieldsData(resp.data().genInfoFields);
            } else {
                let kindaDefaultFields = Object.keys(props.info);
                if ("uid" in kindaDefaultFields) kindaDefaultFields.splice(findEltinArr(kindaDefaultFields, "uid"), 1);

                db.collection("student_counselors").doc(props.cohort).update({
                    genInfoFields: kindaDefaultFields
                });
                setFieldsData(kindaDefaultFields);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const setEdit = (editing, saveChanges=false) => {
        changeEditing(editing);

        if (saveChanges) {
            db.collection("student_counselors").doc(props.cohort).update({
                genInfoFields: fieldsData
            });
        } else {
            refreshWithDatabase();
        }
    }

    const removeFromPreferences = (field) => {
        console.log("field to delete: " + field);
        fieldsData.splice(findEltinArr(fieldsData, field), 1);
        let newFieldsData = [...fieldsData];
        setFieldsData(newFieldsData);

        console.log("fields data after delete: " + fieldsData);
    }

    let info = props.info;
    return <div className="geninfo-panel">
            <div className="geninfo-row1">
                {fieldsData ? <GenInfoCol info={info} fields={fieldsData} editing={editing} removeFromPreferences={removeFromPreferences} /> : ""}
                {/* <GenInfoCol info={info} cohort={props.cohort} /> */}
                {/* <div className="geninfo-col1">
                    <p><span>Date of Birth: </span>{info.dob}</p>
                    <p><span>Ethnicity: </span>{info.ethnicity}</p>
                    <p><span>Gender: </span>{info.gender}</p>
                    <p><span>Race: </span>{info.race}</p>
                    <p><span>GPA: </span>{info.gpa}</p>
                    <p><span>Class Rank: </span>{info.classRank}</p>
                    <p><span>SAT Score: </span>{info.sat}</p>
                    <p><span>ACT Score: </span>{info.act}</p>
                </div> */}
                {/* <div className="geninfo-col2">
                    <p><span>Parent Email: </span>{info.parentEmail}</p>
                    <p><span>Parent Email 2: </span>{info.parentEmail2}</p>
                    <p><span>Parent Phone: </span>{info.parentPhone}</p>
                    <p><span>Parent Phone 2: </span>{info.parentPhone2}</p>
                    <p><span>Student Email: </span>{info.studentEmail}</p>
                    <p><span>Student Phone: </span>{info.studentPhone}</p>
                </div> */}
                <div className="geninfo-col3">
                    <img className="studentdetails-avatar" alt="avatar icon" src={profile_avatar}/>
                    <p><span>Student ID: </span>{info.id}</p>
                    <p><span>Name: </span>{info.firstName} {info.lastName}</p>
                    {fieldsData ? <HandleEditInit setEdit={setEdit} editing={editing} fieldsData={fieldsData} /> : ""}
                </div>
            </div>
            <p><span>Counselor Notes: </span>{info["Latest Note"]}</p>
        </div>
}

// Component handles backround css, tab switching
// Info = person object
class StudentDetailsModal extends React.Component {
    constructor(props) {
        super(props);
        this.tabs = ["General Information", "Notes", "College List", "Application Process"];
        this.state = {
            selectedTab: "General Information",
            selectedCohort: this.props.cohort
        }

        // const context = useContext(UserContext);
        // db.collection("student_counselors").doc(this.props.cohort).get()
        // .then(response => {
        //     const fields = response.data().genInfoFields[0];
        //     this.setState({
        //         genInfoFields: fields
        //     });

        //     // console.log(this.state.genInfoFields);
        // })
        // .catch(err => {
        //     alert(err);
        // })

        db.collection("student_counselors").doc()
    }

    componentDidMount() {
        this.getCohortData();
    }

    getCohortData = () => {
        if (this.context.state){
            db.collection("student_counselors").doc(this.props.selectedCohort)
            .get()
            .then(querySnapshot => {
                this.setState({
                    fields: querySnapshot.genInfoFields
                });
            })
            .catch(error => {console.log(error)});
        }
    }

    changeTab = (tab) => {
        this.setState({selectedTab: tab});
    }

    whichPanel = (tab) => {
        switch(tab){
            case 'General Information':
                return <GeneralInformationPanel fields={this.state.fields} cohort={this.props.cohort} info={this.props.info}/>
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
    // Display of a specific tab is based on which is the current selectedTab
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