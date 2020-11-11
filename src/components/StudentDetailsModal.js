import React, {useState, useContext, useEffect} from 'react';
import edit_symbol from '../assets/essentials_icons/svg/edit.svg';
import plus_symbol from "../assets/essentials_icons/svg/plus.svg";
import minus_symbol from "../assets/essentials_icons/svg/minus.svg";
import profile_avatar from '../assets/profile_avatar.png';
import orange_flag from "../assets/orange_flag.png";
import {db} from '../firebase/firebase';
import {UserContext} from '../providers/UserProvider';
import firebase from 'firebase/app';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';

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
    let col = [];
    for (let i=0; i<props.fields.length; i++) {
        const processedField = processField(props.fields[i]);
        if (processedField) col.push(
            <ModalFieldElement 
                editing={props.editing} 
                removeFromPreferences={props.removeFromPreferences} 
                field={processedField} 
                info={props.info[props.fields[i]]} 
                dbField={props.fields[i]}
            />
        );
    }

    return <div className="fieldsSection">
            {col}
            {/* Only show the following element if the user is in edit mode and in the process of
            adding a field */}
            {props.editing && props.addedFields && 
                <AddFieldElt 
                    addNewPreferences={props.addNewPreferences} 
                    addedFields={props.addedFields} 
                    setAddedFields={props.setAddedFields} 
                    fields={props.fields} 
                    info={props.info} 
                />
            }
        </div>
}

function ModalFieldElement(props) {
    return <div className="modalFieldElement">
        {/* If the user is in edit mode, display button to remove this field element */}
        {props.editing === true && 
            <button onClick={() => props.removeFromPreferences(props.dbField)}>
                <img src={minus_symbol}/>
            </button>
        }
        <p><span>{props.field}: </span>{props.info}</p>
    </div>
}


// Element consisting of dropdown selection to allow user to add hidden fields back to
// student profile card
function AddFieldElt(props) {
    const [dropdownSelected, setDropdownSelected] = useState(false);

    // User should only have the option to add fields that aren't already shown
    const totalOptions = Object.keys(props.info);
    const shownOptions = getNonVisibleOptions(totalOptions, props.fields);
 
    const handleChange = (selectedOption) => {
        setDropdownSelected(selectedOption.value);
        props.addNewPreferences(selectedOption.value);
        props.setAddedFields(false);
    }

    /*
    NOTE: The logic here is redundant as this element should no longer be displayed as soon as the
    user selects an option
    */
    return <div className="addFieldElt">
        <div className="dropdownContainer">
            <Select options={shownOptions} onChange={handleChange} />
        </div>
        <span>:</span>
        {dropdownSelected ? <p>{props.info[dropdownSelected]}</p> : <p>. . .</p>}
    </div>
}


// Helper function that is meant to return any fields available in the student object that are not in the
// users preferences for show fields
function getNonVisibleOptions(totalOptions, visibleOptions) {
    let nonVisibleOptions = []
    for (let i=0; i<totalOptions.length; i++) {
        const processedField = processField(totalOptions[i]);
        if (findEltinArr(visibleOptions, totalOptions[i]) === -1 && processedField) {
            const option = {value: totalOptions[i], label: processedField}
            nonVisibleOptions.push(option);
        }
    }

    return nonVisibleOptions;
}


// Helper parent component to contain buttons to display in editing mode
function EditButtonSuite(props) {
    const nonVisibleOptions = getNonVisibleOptions(Object.keys(props.info), props.fields);
    const availableOptions = (nonVisibleOptions.length > 0);

    return <div className="editButtonSuite">
        {/* We want to disable the ability to add a field if there are no more fields to add (!availableOptions)
        or the user is already in the process of adding a field (props.addedFields) */}
        {props.addedFields || !availableOptions ?
            <div>
                <button data-tip="Finish adding your other element first!" className="disabledAddFieldButton" >
                    <img src={plus_symbol} />
                    Add Item
                </button> 
                <ReactTooltip place="top" type="dark" effect="solid" />
            </div>
            :
            <button className="addFieldButton" onClick={()=> {props.setAddedFields(true);}}>
                <img src={plus_symbol} />
                Add Item
            </button>
        }
        <div className="saveCancelContainer">
            <button 
                className="save" 
                onClick={() => {
                    props.setAddedFields(false);
                    props.editExit(false, true)
                }}
            >Save Changes</button>
            <button 
                className="cancel" 
                onClick={() => {
                    props.setAddedFields(false);
                    props.editExit(false, false)
                }}
            >Cancel</button>
        </div>
    </div>
}

// Helper component to accomodate for call to database
function HandleEditInit(props) {
        return <div className="editSuite">
            {props.editing === true ? 
                <EditButtonSuite editExit={props.setEdit} info={props.info} fields={props.fieldsData} addedFields={props.addedFields} setAddedFields={props.setAddedFields}/> :
                <ToggleEditButton setEdit={props.setEdit}/>
            }
        </div>
}

function ToggleEditButton(props) {
    return <div>
        <button data-tip="Customize what fields are shown" className="studentdetails-editbutton" onClick={()=> {props.setEdit(true)}}>
            <img src={edit_symbol} alt="edit"/>
        </button>
        <ReactTooltip place="top" type="dark" effect="solid"/>
    </div>
}


// Just a poorly optimized helper function to find the index of an element in a given array, returns -1 if not found
function findEltinArr(arr, elt) {
    for (let i=0; i<arr.length; i++) {
        if (arr[i] === elt) return i;
    }

    return -1;
}


/*
This function is more of a bandaid than a necessary function. It serves two purposes:
    1. Account for data in student objects that we know shouldn't be displayed in
       the general information tab
    2. Account for non user-friendly key names for default student data
*/
function processField(field) {
    // 1.
    if (
        field === "uid" || 
        field === "goal" ||
        field === "notes"
        ) return null;

    // 2.
    const fieldSwap = {
        id  :  "Unique ID",
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

// Dynamic panel for general info
function GeneralInformationPanel(props) {
    const [editing, changeEditing] = useState(false); // keeps track of whether user is in edit mode
    const [fieldsData, setFieldsData] = useState(false); // keeps track of what fields user wants to see
    const [addedFields, setAddedFields] = useState(false); // keeps track of whether user is in process of adding field

    useEffect(() => {refreshWithDatabase();}, []) // Basically, on render pull field preferences from database

    const refreshWithDatabase = () => {
        db.collection("student_counselors").doc(props.cohort).get()
        .then(resp => {
            if (resp.data().genInfoFields) {
                setFieldsData(resp.data().genInfoFields);
            } else {
                /*
                If it's the user's first time accessing a student profile card, set their preferences to any data that is
                available for the selected student
                */
                let kindaDefaultFields = Object.keys(props.info);
                // Remove uid from default fields
                if ("uid" in kindaDefaultFields) kindaDefaultFields.splice(findEltinArr(kindaDefaultFields, "uid"), 1);

                // update database
                db.collection("student_counselors").doc(props.cohort).update({
                    genInfoFields: kindaDefaultFields
                });

                setFieldsData(kindaDefaultFields); // update state
            }
        })
        .catch(err => {console.log(err);})
    }

    // Function to change whether or not the user is in editing mode and whether or not
    // to save the changes they made. Save in this case means to update the database
    // with a new set of preferences for what fields are to be shown
    const setEdit = (editing, saveChanges=false) => {
        changeEditing(editing);

        if (saveChanges) {
            db.collection("student_counselors").doc(props.cohort).update({
                genInfoFields: fieldsData
            });
        // No need to refresh from DB if we just updated it with local data
        } else {
            refreshWithDatabase();
        }
    }

    // Helper function for the delete field feature
    const removeFromPreferences = (field) => {
        fieldsData.splice(findEltinArr(fieldsData, field), 1);
        let newFieldsData = [...fieldsData];
        setFieldsData(newFieldsData);
    }

    // Helper function for the add field feature
    const addToPreferences = (newField) => {
        let newFieldsData = [...fieldsData]
        newFieldsData.push(newField);
        setFieldsData(newFieldsData);
    }

    // Helper function to change whether or not the user is in the process of adding
    // a field.
    const changeAddedFields = (val) => {setAddedFields(val);}

    let info = props.info;
    return <div className="geninfo-panel">
            <div className="geninfo-row1"> {/*This is a misleading classname should be updated here and in css*/}
                {
                    fieldsData &&
                        <GenInfoCol 
                            info={info} 
                            fields={fieldsData} 
                            editing={editing} 
                            removeFromPreferences={removeFromPreferences} 
                            setAddedFields={changeAddedFields}
                            addedFields={addedFields}
                            addNewPreferences={addToPreferences}
                        />
                }
                <div className="geninfo-col3"> {/*This is a misleading classname should be updated here and in css*/}
                    <img className="studentdetails-avatar" alt="avatar icon" src={profile_avatar}/>
                    <p><span>Unique ID: </span>{info.id}</p>
                    <p><span>Name: </span>{info.firstName} {info.lastName}</p>
                    {fieldsData && 
                        <HandleEditInit 
                            info={info}
                            setEdit={setEdit} 
                            editing={editing} 
                            fieldsData={fieldsData} 
                            setAddedFields={changeAddedFields} 
                            addedFields={addedFields}
                            addNewPreferences={addToPreferences}
                        />
                    }
                </div>
            </div>
            <hr class="mainFieldBreak"></hr>
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