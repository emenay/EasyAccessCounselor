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
import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';


// File controls popups for student profiles page
// Each tab in the popup is a component "panel" displayed by the StudentDetailsModal

// Fairly static panel displaying info on college list
function CollegeListPanel(props){
    const [editing, changeEditing] = useState(false);
    const [editedFields, setEditedFields] = useState([]);

    // helper function to be called when user types in input text box
    const updateValue = (e, field) => {
        let newEditedField = [...editedFields];
        newEditedField.push({[field]: e.target.value});
        setEditedFields(newEditedField);
    }

    // calls parent function to reload card once save Changes button clicked
    const setEdit = (editing, saveChanges=false) => {
        changeEditing(editing);

        if (saveChanges) {
            
            props.cardUpdate(props.info.uid,editedFields,props.info);

            setEditedFields([]);
         
        }
    }

    // static arrays with information in the two columns
    let info = props.info;
    let collegeArr = ["major", "major2", "region", "collegeSize", "collegeSetting", "collegeDiversity", 
                        "collegeDiversityTypes", "religion", "rotc", "athletics"]
    let studentArr = ["state", "zipcode", "gpa", "classRank", "act", "sat", "efc", "payMismatch"];

    // Create arrays of div elements for two columns
    let collegeInfo = [];
    for (let i=0; i<collegeArr.length; i++) {
        const processedField = processField(collegeArr[i]);
        if (processedField) collegeInfo.push(
            <InputFieldElement 
                editing={editing}  
                field={processedField} 
                info={info[collegeArr[i]]} 
                dbField={collegeArr[i]}
                updateValue={updateValue}
            />
        );
    }

    let studentInfo = [];
    for (let i=0; i<studentArr.length; i++) {
        const processedField = processField(studentArr[i]);
        if (processedField) studentInfo.push(
            <InputFieldElement 
                editing={editing}  
                field={processedField} 
                info={info[studentArr[i]]} 
                dbField={studentArr[i]}
                updateValue={updateValue}
            />
        );
    }

    // return two columns as arrays along with button
    return (<div className="college-panel">
                <div className="college-side">
                    <b>College Information</b>
                    {collegeInfo}
                </div>

                <div className="college-side">
                    <b>Student Information</b>
                    {studentInfo}
                </div>

         <HandleEdit
                            info={info}
                            setEdit={setEdit} 
                            editing={editing} 
                        /*    fieldsData={fieldsData} 
                            setAddedFields={changeAddedFields} 
                            addedFields={addedFields}
                            addNewPreferences={addToPreferences}*/
                        />
        </div>
        );
}

// helper component to allow for editing of different tabs
function InputFieldElement(props) {
    return(<p> 
        <span>{props.field}: </span> 
        {props.editing===true ? <input type="text" defaultValue={props.info} onChange={(e) => props.updateValue(e,props.dbField)} />:props.info}
        </p>);
}

// Helper parent component to contain buttons to display in editing mode
function EditButton(props) {

    return <div className="editButtonSuite">
        <div className="saveCancelContainer">
            <button 
                className="save" 
                onClick={() => {
                    props.editExit(false, true);
                }}
            >Save Changes</button>
            <button 
                className="cancel" 
                onClick={() => {
                    props.editExit(false, false);
                }}
            >Cancel</button>
        </div>
    </div>
}

// Helper component to accomodate for call to database
function HandleEdit(props) {
        return <div className="editSuite">
            {props.editing === true ? 
                <EditButton editExit={props.setEdit} info={props.info} /> :
                <ToggleEditButton setEdit={props.setEdit}/>
            }
        </div>
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
    const [editedFields, setEditedFields] = useState([]);

    // update value based on user typing in input text box
    const updateValue = (e, field) => {
        let newEditedField = [...editedFields];
        newEditedField.push({[field]: e.target.value});
        setEditedFields(newEditedField);
    }

    // call parent function to reload card/update database
    const setEdit = (editing, saveChanges=false) => {
        changeEditing(editing);

        if (saveChanges) {

            props.cardUpdate(props.info.uid,editedFields,props.info, true);

            setEditedFields([]);
            
        }
    }

    // very static array for column
    let info = props.info;
    let fieldSwap = {
        visits  :  "Visits",
        earlyApplications  :  "Early Applications",
        regularApplications  :  "Regular Applications",
        essays  :  "Essays",
        testing  :  "Testing",
        counselorRecommendations  :  "Counselor Recommendations",
        resume  :  "Teacher Recommendations",
        results  :  "Results",
        admittedSchools  :  "Admitted Schools",
        rejectedSchools  :  "Rejected Schools",
        waitlistedSchools  :  "Waitlisted Schools",
        decision  :  "Student Decision",
        deposit  :  "Deposit",
        orientation  :  "Orientation",
        summerPrograms  :  "Summer Programs",
        housing  :  "Housing",
        appFeeWaiver  :  "App Fee Waiver",
        fafsaStatus  :  "FAFSA Status",
        fafsaVerification  :  "FAFSA Verification",
        financialAidAwardLetters  :  "Financial Aid Award Letters",
        financialAidAppeal  :  "Financial Aid Appeal",
        cssProfile  :  "CSS Profile",
    };

    // Static arrays for different checklist portions
    let appArr = ["earlyApplications", "regularApplications", "essays", "testing", "counselorRecommendations",
                    "resume"];
    let postappArr = ["results", "admittedSchools", "rejectedSchools", "waitlistedSchools", "decision"];
    let postdesArr = ["deposit", "orientation", "summerPrograms", "housing"];
    let finaidArr = ["appFeeWaiver", "fafsaStatus", "fafsaVerification", "financialAidAwardLetters", 
                        "financialAidAppeal", "cssProfile"];

    
    // Series of for loops to create different arrays for different checklist sections
    let appInfo = [];
    for (let i=0; i<appArr.length; i++) {
        const processedField = fieldSwap[appArr[i]];
        if (processedField) appInfo.push(
            <InputFieldElement 
                editing={editing}  
                field={processedField} 
                info={info[processedField]} 
                dbField={processedField}
                updateValue={updateValue}
            />
        );
    }

    let postappInfo = [];
    for (let i=0; i<postappArr.length; i++) {
        const processedField = fieldSwap[postappArr[i]];
        if (processedField) postappInfo.push(
            <InputFieldElement 
                editing={editing}  
                field={processedField} 
                info={info[processedField]} 
                dbField={processedField}
                updateValue={updateValue}
            />
        );
    }

    let postdesInfo = [];
    for (let i=0; i<postdesArr.length; i++) {
        const processedField = fieldSwap[postdesArr[i]];
        if (processedField) postdesInfo.push(
            <InputFieldElement 
                editing={editing}  
                field={processedField} 
                info={info[processedField]} 
                dbField={processedField}
                updateValue={updateValue}
            />
        );
    }

    let finaidInfo = [];
    for (let i=0; i<finaidArr.length; i++) {
        const processedField = fieldSwap[finaidArr[i]];
        if (processedField) finaidInfo.push(
            <InputFieldElement 
                editing={editing}  
                field={processedField} 
                info={info[processedField]} 
                dbField={processedField}
                updateValue={updateValue}
            />
        );
    }


    // Final div with arrays in checklist and buttons
    return(
        <div className="appproc-panel">
            <div className="appproc-col">
                <div className="app-group">
                    <div className="app-circle" />
                    <b>Pre-Application</b>
                   {<InputFieldElement 
                        editing={editing}  
                        field="Visits" 
                        info={info["Visits"]} 
                        dbField="Visits"
                        updateValue={updateValue}
                        />}
                    {<InputFieldElement 
                        editing={editing}  
                        field="Balanced College List" 
                        info={info["Balanced College List"]} 
                        dbField="Balanced College List"
                        updateValue={updateValue}
                        />}
                </div>
                <div className="app-group">
                    <div className="app-circle" />
                    <b>Application Checklist</b>
                    {appInfo}
                </div>
                <div className="app-group">
                    <div className="app-circle" />
                    <b>Post-Application</b>
                    {postappInfo}
                </div>
                <div className="app-group">
                    <div className="app-circle" />
                    <b>Post-Decision Checklist</b>
                    {postdesInfo}
                </div>
                <div className="app-group" style={{borderLeft: "0px"}}>
                    <div className="app-circle" />
                    <b>Graduation!</b>
                </div>
            </div>
            <div className="appproc-col">
                <b>Financial Aid</b>
                {finaidInfo}
            </div>
            
            <HandleEdit
                            info={info}
                            setEdit={setEdit} 
                            editing={editing} 
                        /*    fieldsData={fieldsData} 
                            setAddedFields={changeAddedFields} 
                            addedFields={addedFields}
                            addNewPreferences={addToPreferences}*/
                        />
        </div>
    );
}

// Generate the card information depending on editing or not
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
                updateValue={props.updateValue}
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

// component for minus button + input text that shows when pressing edit button
function ModalFieldElement(props) {
    return <div className="modalFieldElement">
        {/* If the user is in edit mode, display button to remove this field element */}
        {props.editing === true && 
            <button onClick={() => props.removeFromPreferences(props.dbField)}>
                <img src={minus_symbol}/>
            </button>
        }
        
       <p key={props.info}><span>{props.field}: </span>
        {props.editing === true ?
            <input type="text" defaultValue={props.info} onChange={(e) => props.updateValue(e,props.dbField)} /> : props.info
        }

        </p>    
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
                <ToggleEditButtonInit setEdit={props.setEdit} addField={props.addField} submitAddedField={props.submitAddedField}/>
            }
        </div>
}


// Simpler editbutton component for just editing
function ToggleEditButton(props) {
    return <div>
        <button data-tip="Customize what fields are shown" className="studentdetails-editbutton" onClick={()=> {props.setEdit(true)}}>
            <img src={edit_symbol} alt="edit"/>
        </button>
        <ReactTooltip place="top" type="dark" effect="solid"/>
    </div>
}

// More complex edit button component with add fields button next to it and popup code
function ToggleEditButtonInit(props) {
    return <div class="card-buttons">
        <button data-tip="Customize what fields are shown" className="studentdetails-editbutton" onClick={()=> {props.setEdit(true)}}>
            <img src={edit_symbol} alt="edit"/>
        </button>
        <ReactTooltip place="top" type="dark" effect="solid"/>
        {props.editing != true && <Popup
                        trigger={<button className="button" data-tip="Add a custom field" className="studentdetails-editbutton"><img src={plus_symbol} alt="edit"/></button>}
                        modal
                        nested
                    >
                        {close => (
                        <div className="popup-modal">
                            <p><span>Add New Field: </span>
                            <input type="text" onChange={(e) => props.addField(e)} />
                            </p>
                            <div className="saveCancelContainer">
                                <button 
                                    className="save" 
                                    onClick={() => {
                                        props.submitAddedField();
                                        close();
                                    }}
                                >Add Field</button>
                                <button 
                                    className="cancel" 
                                    onClick={() => {
                                        console.log('modal closed ');
                                        close();
                                        }}
                                >Cancel</button>
                            </div>
                        </div>
                        )}
                    </Popup> }
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
        field === "notes" ||
        field === "Date of Last Meeting"
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
    const [editedFields, setEditedFields] = useState([]); // keeps track of changes made to existing field values
    const [newField, setNewField] = useState("");

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
            
            props.cardUpdate(props.info.uid,editedFields,props.info);

            setEditedFields([]);
            
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

    // Helper function for the edit field future
    const updateValue = (e, field) => {
        let newEditedField = [...editedFields];
        newEditedField.push({[field]: e.target.value});
        setEditedFields(newEditedField);
    }

    // Helper function for add custom field feature
    const addField = (e) => {
        setNewField(e.target.value);
    }

    // Function to add custom field to database
    const submitAddedField = () => {
        if (newField != null && newField != "") {
            db.collection("student_counselors").doc(props.cohort)
                .update({addedFields: firebase.firestore.FieldValue.arrayUnion(newField),  genInfoFields: firebase.firestore.FieldValue.arrayUnion(newField), fieldVisPref: firebase.firestore.FieldValue.arrayUnion(newField)})
                .catch(error=>console.log(error));

                addToPreferences(newField);
                
                setNewField("");
                
        }
    }


    // Helper function to change whether or not the user is in the process of adding
    // a field.
    const changeAddedFields = (val) => {setAddedFields(val);}

    let info = props.info;
    return <div className="geninfo-panel">
            <div className="geninfo-row1"> {/*This is a misleading classname should be updated here and in css*/}
                {fieldsData &&
                    <GenInfoCol 
                        info={info} 
                        fields={fieldsData} 
                        editing={editing} 
                        removeFromPreferences={removeFromPreferences} 
                        setAddedFields={changeAddedFields}
                        addedFields={addedFields}
                        addNewPreferences={addToPreferences}
                        updateValue={updateValue}
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
                            addField={addField}
                            submitAddedField = {submitAddedField}
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
        this.tabs = ["General", "Notes", "College List", "Checklist"];
        this.state = {
            selectedTab: "General",
            selectedCohort: this.props.cohort
        }

        db.collection("student_counselors").doc()
    }

    changeTab = (tab) => {
        this.setState({selectedTab: tab});
    }

    whichPanel = (tab) => {
        switch(tab){
            case 'General':
                return <GeneralInformationPanel fields={this.state.fields} cohort={this.props.cohort} info={this.props.info} cardUpdate={this.props.cardUpdate} />
            case 'Checklist':
                return <ApplicationProcessPanel info={this.props.info} cardUpdate={this.props.cardUpdate} />
            case 'Notes':
                return <NotesPanel info={this.props.info}/>
            case 'College List':
                return <CollegeListPanel info={this.props.info} cardUpdate={this.props.cardUpdate} />
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