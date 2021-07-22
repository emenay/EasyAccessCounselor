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
import $ from 'jquery';
import "../css/CollegeListPage.css";
import {colleges} from './CollegeArray.js';
import { Autosuggest } from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { validateParams } from 'airtable/lib/query';
//import 'reactjs-popup/dist/index.css';

// Make an edit for testBranch

// File controls popups for student profiles page
// Each tab in the popup is a component "panel" displayed by the StudentDetailsModal

// Fairly static panel displaying info on college list
function CollegeListPanel(props){
        
    const [editing, changeEditing] = useState(false);
    const [editedFields, setEditedFields] = useState([]);
    // const [editing, changeEditing] = useState(false); // keeps track of whether user is in edit mode
    const [fieldsData, setFieldsData] = useState(false); // keeps track of what fields user wants to see
    const [addedFields, setAddedFields] = useState(false); // keeps track of whether user is in process of adding field
    // const [editedFields, setEditedFields] = useState([]); // keeps track of changes made to existing field values
    const [newField, setNewField] = useState("");
    const [make, setMake] = React.useState();

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
         
        } else {
            refreshWithDatabase();
        }
    }

    const removeFromPreferences = (field) => {
        fieldsData.splice(findEltinArr(fieldsData, field), 1);
        let newFieldsData = [...fieldsData];
        setFieldsData(newFieldsData);
    }

    const addToPreferences = (newField) => {
        let newFieldsData = [...fieldsData]
        newFieldsData.push(newField);
        setFieldsData(newFieldsData);
    }

    const addField = (e) => {
        setNewField(e.target.value);
    }

    const submitAddedField = () => {
        if (newField != null && newField != "") {
            db.collection("student_counselors").doc(props.cohort)
                .update({addedFields: firebase.firestore.FieldValue.arrayUnion(newField),  genInfoFields: firebase.firestore.FieldValue.arrayUnion(newField), fieldVisPref: firebase.firestore.FieldValue.arrayUnion(newField)})
                .catch(error=>console.log(error));

                addToPreferences(newField);
                
                setNewField("");
                
        }
    }

    const changeAddedFields = (val) => {setAddedFields(val);}
    // static arrays with information in the two columns
    let info = props.info;

    let affordabilityInfo = ["GPA", "Class Rank", "SAT", "ACT", "EFC", "Ability to Pay"];
    let fitInfo = ["Major 1", "Major 2", "Distance from Home", "Region", "College Size", "College Diversity", "College Type", "Religion", "Military/ROTC", "Athletics"];
    let allinfo = ["GPA", "Class Rank", "SAT", "ACT", "EFC", "Ability to Pay","Major 1", "Major 2", "Distance from Home", "Region", "College Size", "College Diversity", "College Type", "Religion", "Military/ROTC", "Athletics"];
    var fieldsPref;
    var fieldsHide;
    var dbinfo = ["gpa", "classRank", "sat", "act", "efc", "payMismatch"];
    var dbinfo2 = ["major1", "major2", "distancefromHome", "region", "collegeSize", "collegeDiversity", "collegeType", "religion", "rotc", "athletics"];
    let count = 0;
    // 
    let affordabilityView = [];
    for (let i = 0; i < dbinfo.length; i++) {
        affordabilityView.push(
            
            <InputFieldElement
                name = {affordabilityInfo[i]} 
                editing={editing}  
                info={info[dbinfo[i]]} 
                dbField={[dbinfo[i]]}
                updateValue={updateValue}/>
           
            
        )
    }
    let collegeFitView = [];
    for (let i = 0; i < dbinfo2.length; i++) {
        collegeFitView.push(
            
            <InputFieldElement
                name = {fitInfo[i]} 
                editing={editing}  
                info={info[dbinfo2[i]]} 
                dbField={dbinfo2[i]}
                updateValue={updateValue}/>
           
            
        )
    }
    
    // return two columns as arrays along with button
    var x = {width: "100%"}
    var y = {visibility: "hidden"}
    var z = {textAlign: "center"}
    var gpa = validate(props)[1];
    var state = validate(props)[2];
    var zip = validate(props)[3];
    var gpaInput = "";
    var stateInput = "";
    var zipInput = "";

    var collegesObject = {colleges: colleges}

    return (
    <div>
        <HandleEdit
                            info={info}
                            setEdit={setEdit} 
                            editing={editing} 
                        /*    fieldsData={fieldsData} 
                            setAddedFields={changeAddedFields} 
                            addedFields={addedFields}
                            addNewPreferences={addToPreferences}*/
                        />

    <table class = "colListTable" style = {x}>
    <tbody>
        <tr>
        <th></th> 
        <th>Information</th>
        <th>Counselor <button class = "colListButton">Sync</button></th> 
        <th></th>
        <th>Student</th>
        </tr>
    </tbody>

    <tbody>
        <tr>
        <th></th>
        <th>Affordabiity and Selectivity Info</th> 
        <th></th>
        <th></th>
        <th></th>
        </tr>
    </tbody>
    
    
    {/* <tr> */}
    {affordabilityView}
    <tbody>
        <tr>
        <th></th>
        <th>Fit Information</th>
        <td></td> 
        <td><input type = "checkbox"/></td>
        <td></td>
        </tr>
    </tbody>


    {collegeFitView}
        
  </table>
  {/* <div class = "grid-container" id = "grid-container">
        <div class = "grid-item"> </div>
        <div class = "grid-item"> Affordable </div>
        <div class = "grid-item"> Maybe Affordable </div>
        <div class = "grid-item"> Reach </div>
        <div class = "grid-item"> some stuff </div>
        <div class = "grid-item"> some stuff </div>
        <div class = "grid-item"> Target </div>
        <div class = "grid-item"> some stuff </div>
        <div class = "grid-item"> some stuff </div>
        <div class = "grid-item"> Safety </div>
        <div class = "grid-item"> some stuff </div>
        <div class = "grid-item"> some stuff </div>
    </div> */}
    <br/>
    <br/>
    <b>College List</b>
    <table class = "colListTable2">
        <tbody>
            <tr>
                <th class = "greyCell"></th>
                <th class = "greyCell">Safety</th>
                <th class = "greyCell">Target</th>
                <th class = "greyCell">Reach</th>
            </tr>
        </tbody>
            <tr>
                <td>$</td>
                <td></td>
                <td></td>
                <td></td>

            </tr>
        <tbody>

            <tr>
                <td>$$</td>
                <td class = "greyCell"></td>
                <td class = "greyCell"></td>
                <td class = "greyCell"></td>
                
            </tr>

        </tbody>

        <tbody>
            <tr>
                <td>$$$</td>
                <td></td>
                <td></td>
                <td></td>
                
            </tr>
        </tbody>

    </table>

    <br/>
    <br/>
    <table class = "colListTable3">
        <tbody>
        <tr>
            <th style = {z}>Search for Colleges
            </th>
        </tr>
        </tbody>
        <tbody>
        <tr>
            <td style = {z}>
                <div>
                Filter Using Counselor Info
                </div>
                <button class = "colListButton">Search</button>
                <div>
                OR
                </div>
                {/* <form >
            <Autosuggest
                name="Colleges"
                options={colleges}
                handleChange={setMake}
                value={make}
            />
            <button>Submit</button>
        </form> */}
            {/* <button>Submit</button> */}

            <ReactTooltip place="bottom" type="dark" effect="solid"/>
                <Popup
                    trigger={<button className="colListButton">Add to list</button>}
                    modal
                    >
                    {close => (
                        <div className="popup-addcollege">
                            <div className="popup-header">
                                <b>{validate(props)[0]}</b>
                            </div>
                            
                            <div className="popup-addcollcontent">
                                {gpa ?
                                (<p><span>Add GPA: </span><input type="text" onChange={(e) => gpaInput = e}/></p>) 
                                : console.log("No GPA input needed")}
                            </div>

                            <div className="popup-addcollcontent">
                                {state ?
                                (<p><span>Add home state: </span><input type="text" onChange={(e) => stateInput = e}/></p>)
                                : console.log("No state input needed")}
                            </div>

                            <div className="popup-addcollcontent">
                                {zip ?
                                (<p><span>Add zipcode: </span><input type="text" onChange={(e) => zipInput = e}/></p>) 
                                : console.log("No zipcode input needed")}
                            </div>

                            <button onClick={()=> {
                                
                                close()}}>Done</button>
                        </div>
                    )}
                    </Popup>
            </td>
        </tr>
        </tbody>
    </table>

    </div>
         
        );
}

function validate(props) {
    let info = props.info;
    const errors = [];
    let g = typeof(info.gpa) === "undefined" || info.gpa === null || info.gpa <= 0;
    let s = typeof(info.state) === "undefined" || info.state === null;
    let z = typeof(info.zipcode) === "undefined" || info.zipcode <= 0 || info.zipcode === null;


    if(g && s && z) {
        errors.push("Cannot add to list without valid GPA, home state, and zipcode.");
        errors.push(true, true, true);
    } else if(g && z) {
        errors.push("Cannot add to list without valid GPA and zipcode.");
        errors.push(true, false, true);
    } else if(s && z) {
        errors.push("Cannot add to list without valid home state and zipcode.");
        errors.push(false, true, true);
    } else if(g && s) {
        errors.push("Cannot add to list without valid GPA and home state.");
        errors.push(true, true, false);
    } else if(z) {
        errors.push("Cannot add to list without valid zipcode.");
        errors.push(false, false, true);
    } else if(s) {
        errors.push("Cannot add to list without valid state.\n");
        errors.push(false, true, false);
    } else if(g) {
        errors.push("Cannot add to list without valid GPA.\n");
        errors.push(true, false, false);
    } 
    if(errors.length < 1) {
        errors.push("College added!");
    }
    console.log(errors);
    return errors;
}

// helper component to allow for editing of different tabs
function InputFieldElement(props) {
     
    // return(<p> 
    //     <span>{props.field}: </span> 
    //     {props.editing===true ? <input type="text" defaultValue={props.info} onChange={(e) => props.updateValue(e,props.dbField)} />:props.info}
    //     </p>);
    var x = {color: 'white'};
    var y = {display: "none"}
    // return(<p> 
    //     <span> {props.field}: </span> 
    //     {props.editing===true 
    //         ? <input type="text" defaultValue={props.info} onChange={(e) => props.updateValue(e,props.dbField)} />:
            
    //         props.info === undefined || props.info === ""
    //             ? <text>{props.info }</text> :
    //         <text class = "fieldElement" style = {x}>{props.info}</text>}
    //     </p>);
    return <tbody>
        <tr className="inputFieldElement" id = {props.dbField}>
       <td>
        {/* If the user is in edit mode, display button to remove this field element */}
        {props.editing === true && 
            <button onClick={() => hide(props.dbField)}>
                <img src={minus_symbol}/>
            </button>
        }
        </td>
         <td>
        {props.name}
        </td>
        <td>
       <p key={props.info}><span>{props.field} </span>
       {props.editing===true 
            ? <input type="text" defaultValue={props.info} onChange={(e) => props.updateValue(e,props.dbField)} />:
            
            props.info === undefined || props.info === ""
                ? <text>{props.info }</text> :
            <text class = "fieldElement" style = {x}>{props.info}</text>}

        </p>  
        </td>  
        <td><input type = "checkbox"/></td>
        <td>awaiting</td>
       
        </tr>
        </tbody>
}

function hide(id) {

    $("#" + id).hide();
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
    const [fieldsData, setFieldsData] = useState(false);
    const [newField, setNewField] = useState("");

    useEffect(() => {refreshWithDatabase();}, []) // Basically, on render pull field preferences from database

    const refreshWithDatabase = () => {
        db.collection("student_counselors").doc(props.cohort).get()
        .then(resp => {
            if (resp.data().appFields) {
                setFieldsData(resp.data().appFields);
            } else {
                /*
                If it's the user's first time accessing a student profile card, set their preferences to any data that is
                available for the selected student
                */
                let kindaDefaultFields = Object.keys(origAppFields);

                // update database
                db.collection("student_counselors").doc(props.cohort).update({
                    appFields: origAppFields
                });
            }
        })
        .catch(err => {console.log(err);})
    }

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

/*     const removeFromPreferences1 = (field) => {
        fieldsData.splice(findEltinArr(fieldsData, field), 1);
        let newFieldsData = [...fieldsData];
        setFieldsData(newFieldsData);
    } */

    let removeFromPreferences = (e) => {
        console.log(e);
        $('#' + e).toggle()
    }

    let addInfo = [];

    const addToPreferences = () => {
        fieldSwap.set(newField, newField);
        addArr[addArr.length]=newField;
        console.log(newField);
        console.log(addArr[0]);
        console.log(fieldSwap.get(addArr[0]));
         addInfo.push(
            <ModalFieldElement
                editing={editing}
                removeFromPreferences={removeFromPreferences}
                field={fieldSwap.get(addArr[(addArr.length)-1])}
                info={info[fieldSwap.get(addArr[(addArr.length)-1])]}
                dbField={addArr[(addArr.length)-1]}
                updateValue={updateValue}
            />) 
        setNewField("");
    }

    const addField = (e) => {
        setNewField(e.target.value);
    }

    const submitAddedField = () => {
        if (newField != null && newField != "") {
            addToPreferences(newField);
            setNewField("");
        }
    } 

    // very static array for column
    let info = props.info;

    const fieldSwap = new Map();
    fieldSwap.set("visits", "Visits");
    fieldSwap.set("earlyApplications", "Early Applications");
    fieldSwap.set("regularApplications", "Regular Applications");
    fieldSwap.set("essays", "Essays");
    fieldSwap.set("testing", "Testing");
    fieldSwap.set("counselorRecommendations", "Counselor Recommendations");
    fieldSwap.set("resume", "Teacher Recommendations");
    fieldSwap.set("results", "Results");
    fieldSwap.set("admitttedSchools", "Admitted Schools");
    fieldSwap.set("rejectedSchools", "Rejected Schools");
    fieldSwap.set("waitlistedSchools", "Waitlisted Schools");
    fieldSwap.set("decision", "Student Decision");
    fieldSwap.set("deposit", "Deposit");
    fieldSwap.set("orientation", "Orientation");
    fieldSwap.set("summerPrograms", "Summer Programs");
    fieldSwap.set("housing", "Housing");
    fieldSwap.set("appFeeWaiver", "App Fee Waiver");
    fieldSwap.set("fafsaStatus", "FAFSA Status");
    fieldSwap.set("fafsaVerification", "FAFSA Verification");
    fieldSwap.set("financialAidAwardLetters", "Financial Aid Award Letters");
    fieldSwap.set("financialAidAppeal", "Financial Aid Appeal");
    fieldSwap.set("ccsProfile", "CCS Profile");

    // Static arrays for different checklist portions
    let origAppFields = ["earlyApplications", "regularApplications", "essays", "testing", "counselorRecommendations",
    "resume", "results", "admittedSchools", "rejectedSchools", "waitlistedSchools", "decision", "deposit", "orientation", "summerPrograms", "housing",
    "appFeeWaiver", "fafsaStatus", "fafsaVerification", "financialAidAwardLetters", 
                        "financialAidAppeal", "cssProfile"]

    let appArr = ["earlyApplications", "regularApplications", "essays", "testing", "counselorRecommendations",
                    "resume"];
    let postappArr = ["results", "admittedSchools", "rejectedSchools", "waitlistedSchools", "decision"];
    let postdesArr = ["deposit", "orientation", "summerPrograms", "housing"];
    let finaidArr = ["appFeeWaiver", "fafsaStatus", "fafsaVerification", "financialAidAwardLetters", 
                        "financialAidAppeal", "cssProfile"];
    let addArr = [];

    
    // Series of for loops to create different arrays for different checklist sections
    let appInfo = [];
    for (let i=0; i<appArr.length; i++) {
        const processedField = fieldSwap.get(appArr[i]);
        if (processedField) appInfo.push(
            <ModalFieldElement 
                editing={editing} 
                removeFromPreferences={removeFromPreferences} 
                field={processedField} 
                info={info[processedField]} 
                dbField={appArr[i]}
                updateValue={updateValue}
            />
        );
    }

    let postappInfo = [];
    for (let i=0; i<postappArr.length; i++) {
        const processedField = fieldSwap.get(postappArr[i]);
        if (processedField) postappInfo.push(
            <ModalFieldElement 
                editing={editing} 
                removeFromPreferences={removeFromPreferences} 
                field={processedField}  
                info={info[processedField]} 
                dbField={postappArr[i]}
                updateValue={updateValue}
            />
        );
    }

    let postdesInfo = [];
    for (let i=0; i<postdesArr.length; i++) {
        const processedField = fieldSwap.get(postdesArr[i]);
        if (processedField) postdesInfo.push(
            <ModalFieldElement 
                editing={editing}  
                removeFromPreferences={removeFromPreferences}
                field={processedField} 
                info={info[processedField]} 
                dbField={postdesArr[i]}
                updateValue={updateValue}
            />
        );
    }

    let finaidInfo = [];
    for (let i=0; i<finaidArr.length; i++) {
        const processedField = fieldSwap.get(finaidArr[i]);
        if (processedField) finaidInfo.push(
            <ModalFieldElement 
                editing={editing}  
                removeFromPreferences={removeFromPreferences}
                field={processedField} 
                info={info[processedField]} 
                dbField={finaidArr[i]}
                updateValue={updateValue}
            />
        );
    }

    //let addInfo = [];
/*     for (let i=0; i<addArr.length; i++) {
        const processedField = fieldSwap.get(addArr[i]);
        if (processedField) addInfo.push(
            <ModalFieldElement
                editing={editing}
                removeFromPreferences={removeFromPreferences}
                field={processedField}
                info={info[processedField]}
                dbField={addArr[i]}
                updateValue={updateValue}
            />
        );
    } */

    // Final div with arrays in checklist and buttons
    return(
        <div className="appproc-panel">
            <div className="appproc-col">
                <div className="app-group">
                    <div className="app-circle" />
                    <b>Pre-Application</b>
                       {<ModalFieldElement
                        editing={editing}
                        removeFromPreferences={removeFromPreferences}
                        field="Visits"
                        info={info["Visits"]}
                        dbField="visits"
                        updateValue={updateValue}
                        />}

                        {<ModalFieldElement 
                        editing={editing}  
                        removeFromPreferences={removeFromPreferences}
                        field="Balanced College List" 
                        info={info["Balanced College List"]} 
                        dbField="balancedCollegeList"
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

            
            <div>
                <div className="app-group">
                    <b>Financial Aid</b>
                    {finaidInfo}
                </div>
                <div className="app-group">
                    <b>Additional Information</b>
                    {addInfo}
                </div> 
            </div>

            
            <HandleEditInit
                            info={info}
                            setEdit={setEdit} 
                            editing={editing}
                            addToPreferences={addToPreferences}
                            addField={addField}
                            submitAddedField = {submitAddedField}

                            //fieldsData={fieldsData} 
                            //addNewPreferences={addToPreferences}
                            //removeFromPreferences={removeFromPreferences}
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
    return <div className="modalFieldElement" id={props.dbField}>
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
                <ReactTooltip place="top" type="dark" effect="solid"/>
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
    /* return <div>
        <button data-tip="Customize what fields are shown" className="studentdetails-editbutton" onClick={()=> {props.setEdit(true)}}>
            <img src={edit_symbol} alt="edit"/>
        </button>
        <ReactTooltip place="top" type="dark" effect="solid"/>
    </div> */

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
                            <input type="text" onChange={(e) => props.addToPreferences(e)} />
                            </p>
                            <div className="saveCancelContainer">
                                <button 
                                    className="save" 
                                    onClick={() => {
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
export default class StudentDetailsModal extends React.Component {
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
                return <ApplicationProcessPanel info={this.props.info} cardUpdate={this.props.cardUpdate} fields={this.state.fields} cohort={this.props.cohort} />
            case 'Notes':
                return <NotesPanel info={this.props.info}/>
            case 'College List':
                return <CollegeListPanel fields={this.state.fields} cohort={this.props.cohort} info={this.props.info} cardUpdate={this.props.cardUpdate} />
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
                <div className="studentdetails-innerbackground"/>
                <div className={"studentdetails-content" + (this.state.selectedTab === "Notes" ? " caseloadContents" : "")}>
                    {this.whichPanel(this.state.selectedTab)}
                </div>
            </div>
        </div>
    }
}
