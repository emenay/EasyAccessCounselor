import React from 'react';
import '../css/CohortCreation.css';
import readXlsxFile from 'read-excel-file';
import {auth, db} from "../firebase/firebase";
import "../css/Account.css";
import firebase from "firebase/app";
import "firebase/auth";
import {UserContext} from '../providers/UserProvider';
import { Link } from 'react-router-dom';
import {history} from './App';
import SubscribeModal from '../components/SubscribeModal.js'
// import { resultsAriaMessage } from 'react-select/src/accessibility';

/*
    This file is messy because it was worked on by multiple people.
    The login portions can likely be deleted, I'm leaving them here now for posterity

*/

// export default function Login() {
//   const [cohort, setCohort] = useState("");
//   const user = useContext(UserContext);
//   const {displayName, email} = user;
//   var cohortCode;
//   function validateForm() {
//     return cohort.length > 0;
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//   }

//   return (
//     <div className="Login">
//       <form onSubmit={handleSubmit}>
//         <Form.Group controlId="text" bsSize="large">
//           <FormLabel>Create a new Cohort</FormLabel>
//           <br/>
//           <FormControl
//             autoFocus
//             type="text"
//             placeholder="Name your Cohort"
//             value={cohort}
//             onChange={e => setCohort(e.target.value)}
//           />
//         </Form.Group>
       
//         <Link to="/netflix">Upload Data</Link>
//         <Route path="/:id" children={<Child />} />

//       </form>
//       <div>
//         <h2 >{displayName}</h2>
//         <h3 >{email}</h3>
//         {/* <button  onClick = {() => {auth.signOut()}}>Sign out</button> */}
//         </div>
//       <button  id = "cohortCode" onClick = {() => {db.collection("cohortCode").add({
//         cohort: "unc",
//         studentID: "1231251"
//       }).then(function(docRef) {
//         cohortCode = docRef.id;
//         // this.props.history.push({
//         //     pathname: '/cohortcreation2',
//         //     data: "data" // your data array of objects
//         //   })
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
//     });}}>Generate cohort Code</button>


//     </div>
//   );
// }







class Login extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="Login">
                <div>hi</div>
              {/* <form>
                <Form.Group controlId="text" bsSize="large">
                  <FormLabel>Create a new Cohort</FormLabel>
                  <br/>
                  <FormControl
                    autoFocus
                    type="text"
                    placeholder="Name your Cohort"
                    // value={cohort}
                    // onChange={e => setCohort(e.target.value)}
                  />
                </Form.Group>
               
                <Link to="/netflix">Upload Data</Link>
        
              </form> */}
              <div>
                {/* <h2 >{displayName}</h2> */}
                {/* <h3 >{email}</h3> */}
                {/* <button  onClick = {() => {auth.signOut()}}>Sign out</button> */}
                </div>
              
        
        
            </div>
          );
    }
      

}

// Component for selecting which file to upload
class FileUploadSelection extends React.Component {
    constructor(props){
        super(props);
        this.state = {fileName: null, data: null, dragOver: false}
    }

    preventDefault = e => e.preventDefault();

    // Listeners necessary for dragging events
    componentDidMount() {
        window.addEventListener("dragover", this.preventDefault);
        window.addEventListener("drop", this.preventDefault);
    }

    componentWillUnmount() {
        window.removeEventListener("dragover", this.preventDefault);
        window.removeEventListener("drop", this.preventDefault);
    }

    // Determines which file type to parse
    // TODO: implement csv
    handleFile = (file) => {
        switch (file.name.split('.').pop()){
            case 'xlsx':
                readXlsxFile(file).then((rows)=>{
                    this.setState({fileName: file.name, data: rows});
                })
                .catch(error=>console.log(error));
                break;
            case 'csv':
                alert('.csv not added yet');
                break;
            default:
                alert('File must be .xlsx or .csv');
        }
    }

    // Called when file is selected by user
    onChange = (e) => {
        this.handleFile(e.target.files[0]);
    }


    handleDrop = (e) => {
        this.setState({dragOver: false});
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.handleFile(e.dataTransfer.files[0]);
        }
    }

    // Sets data to what was uploaded and moves to field matching panel
    onSubmit = () => {
        if (this.state.data){
            this.props.setData(this.state.data);
            this.props.changePanel("fieldMatching");
        }
    }

    // Two functions for handling drag events over upload box
    // dragOver used to render if user dragging over the uploadbox
    onDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({dragOver: true});
    }

    onDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({dragOver: false});
    }
    
    render(){
        return (
            <div className="file-upload-wrapper">
                <p className="file-upload-title">Upload your student data.</p>
                <div className={"uploadbox" + (this.state.dragOver ? " upload-drag": "")} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} onDrop={this.handleDrop}>{this.state.fileName ? this.state.fileName : "Drag and drop file."}</div>
                <div className="file-upload-buttons">
                    <input className="uploadinput" id="file" type="file" name="file" accept=".csv, .xlsx" onChange={this.onChange} />
                    <label htmlFor="file" className="select-entry-btn">Browse</label>
                    <button className={"select-entry-btn" + (this.state.fileName ? "": " inactive")} onClick={this.onSubmit}>Upload</button>
                </div>
            </div>
        );
    }
}


/*
    Initial panel selected
    For use in deciding if manual or upload
*/
class DataEntrySelection extends React.Component {
    static contextType = UserContext;
    constructor(props){
        super(props);
        this.state = {
            selectedState: null,
            modal: false
        }
    }
    
    exitModal = () => {
        this.setState({modal: false});
    }
    onChange = (e)=> {
        this.setState({selectedState: e.target.value});
    }

    onSubmit = async ()=> {

        const subscriptionRef = db.collection('customers')
            .doc(this.context.state.user.uid)
            .collection('subscriptions')
            .where('status', 'in', ['trialing', 'active']);

        const snapshot = await subscriptionRef.get();

        if (snapshot.empty && this.context.state.cohorts.length != 0) {
            this.setState({modal: true});
            return;
        } 

        switch(this.state.selectedState){
            case "manual":
                let name = this.props.name();
                if (name === "" || name === null) {
                    alert("You must enter a name for the cohort!");
                    return;
                }
                
                // base fields to set visible for new cohorts
                const fieldsVisPref =  ["id", "firstName", "lastName","goal", "gpa",  "sat", "act","classRank",  "efc", "payMismatch",  "major",  "major2",  "safetyColleges",  "targetColleges",  "reachColleges", "additions"];
                const colListFieldsPref = ["GPA", "Class Rank", "SAT", "ACT", "EFC", "Ability to Pay", "Major 1", "Major 2", "Distance from Home", "Region", "College Size", "College Diversity", "College Type", "Religion", "Military/ROTC", "Athletics"];
                const colListFieldsHide = [];
                // Upload the cohort
                // TODO: CohortCode unneccessary?????
                db.collection("cohortCode").add({
                    cohort: "unc",
                    studentID: "1231251"
                  }).then(function(docRef) {

                    var result = ''
                    //var result = name+'-'
                    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                    var charactersLength = characters.length
                    for ( var i = 0; i < 5; i++ ) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength))
                    }
                    
                    console.log(result)

                    db.collection("student_counselors").doc(result).set({name:name,counselor:firebase.auth().currentUser.uid, fieldVisPref: fieldsVisPref});
                    return [name, result];
        
                })
                .then(([name, code]) => {this.context.addCohort(name, code); history.push('/caseload_management')})
                
                break;
            case "upload":
                this.props.changePanel("fileUpload");
                break;
            default:
                console.log("None selected!");
        }

    }
    
    render() {
        return (
        <div className="select-entry-type">
            <p>Data Entry</p>
            <div className="rad-select-group">
                    <input className="rad-select-btn" type="radio" name="dataEntry" value="manual" onChange={this.onChange}/>
                    <p>Manually enter student data</p>
            </div>  
            <div className="rad-select-group">
                    <input className="rad-select-btn" type="radio" name="dataEntry" value="upload" onChange={this.onChange}/>
                    <p>Upload data from your computer</p>
            </div>  
            <button className={"select-entry-btn" + (this.state.selectedState ? "": " inactive")} onClick={this.onSubmit}>Create</button>
            {this.state.modal && <SubscribeModal exitModal={this.exitModal}/>}
        </div>);
    }
}

// Component for matching db fields to upload fields
// TODO: Don't show a field in dropdown if already selected by another field
class FieldMatches extends React.Component {
    static contextType = UserContext;
    constructor(props){
        super(props);
        let fieldsMap = new Map(); // Map for upload file fields to fields from dropdown
        this.props.data[0].forEach(field=>fieldsMap.set(field, "None"));
        this.state = {
            fieldsMap: fieldsMap
        };
        this.fields = {
            "UniqueID": "id",
            "First Name": "firstName",
            "Last Name": "lastName",
            "Date of Birth": "dob",
            "Ethnicity": "ethnicity",
            "Gender": "gender",
            "GPA": "gpa",
            "Class Rank": "classRank",
            "SAT": "sat",
            "ACT": "act",
            "Goal": "goal",
            "Student Email": "studentEmail",
            "Student Email 2": "studentEmail2",
            "Student Phone": "studentPhone",
            "Parent Email": "parentEmail",
            "Parent Email 2": "parentEmail2",
            "Parent Phone": "parentPhone",
            "Parent Phone 2": "parentPhone2",
            "Student Address": "studentAddress",
            "Total Meetings": "totalMeetings",
            "Individual Meetings": "individualMeetings",
            "Group Meetings": "groupMeetings",
            "Event Meetings": "eventMeetings",
            "State": "state",
            "Zipcode": "zipcode",
            "EFC": "efc",
            "Ability to Pay Mismatch": "payMismatch",
            "Field of Study/Major 1": "major",
            "Field of Study/Major 2": "major2",
            "Safety Colleges": "safetyColleges",
            "Target Colleges": "targetColleges",
            "Reach Colleges": "reachColleges",
            "Counselor Notes": "additions",
            "Want to Attend (Region)": "region",
            "College Size": "collegeSize",
            "College Setting": "collegeSetting",
            "College Diversity (% URM)": "collegeDiversity",
            "College Diversity (Types)": "collegeDiversityTypes",
            "Religion": "religion",
            "Military/ROTC": "rotc",
            "Athletics": "athletics"
        }
    }

    // Called when an upload field is selected
    selectField = (e, field) => {
        let new_fields = new Map(this.state.fieldsMap);
        new_fields.set(field[0], e.target.value);
        this.setState({fieldsMap: new_fields});
    }

    startUpload = () => {
        var name = document.getElementById("name").value;
        if (name === "" || name === null) {
            alert("You must enter a name for the cohort!");
            return;
        }
        var props = this.props;
        var state = this.state;
        var counselor = firebase.auth().currentUser.uid;
        var code;
        var addedFields = new Set();

        // This needs to be refactored for batch writes, also no idea what they were going for with cohortCode
        db.collection("cohortCode").add({
            cohort: "unc",
            studentID: "1231251"
          }).then(function(docRef) {
            var result = ''
            //var result = name+'-'
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            var charactersLength = characters.length
            for ( var j = 0; j < 5; j++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength))
            }
            
            console.log(result)
            
            code = result

            console.log(code)
            // db.collection('counselors').doc(counselor).update( {
            //     cohort: db.FieldValue.arrayUnion(docRef.id)
            //  });
            for (var i = 1; i < props.data.length; i++){
                var myobj = {};
                var counter = 0;
                Array.from(state.fieldsMap).forEach(entry=>
                    {
                        if (entry[1] !== "None"){
                            if (entry[1] === "Add Field"){
                                myobj[entry[0]] = props.data[i][counter];
                                addedFields.add(entry[0]);
                            } else {
                                myobj[entry[1]] = props.data[i][counter];
                            }
                            counter = counter + 1;
                        }
                    }
                );
                db.collection("student_counselors").doc(code).collection("students").add(myobj);
            }
            
            db.collection("student_counselors").doc(code).set({name:name, counselor:counselor, addedFields: Array.from(addedFields)});
            // db.collection("counselors").doc(counselor).update({})
            return [name, code];

        })
        .then(([name, code]) => {this.context.addCohort(name, code); history.push('/caseload_management')})
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        
        
        
    }

    render(){
        return (
            <div>
                <p className="fields-description"><span>Match</span> your upload's fields with the fields in the Easy Access database, or <span>create</span> a new field.</p>
                <div className="field-titles">
                    <p>Upload's Field</p>
                    <p>Easy Access Field</p>
                </div>
                <div className="fields-view">
                    {Array.from(this.state.fieldsMap).map(field=>{
                        return(
                        <div key={field[0]} className="field-select">
                            <p>{field[0]}</p>
                            <select className="select-dropdown" value={field[1]} onChange={e=>this.selectField(e, field)}>
                                <option value="None">Select Option</option>
                                <option value="Add Field">Add as custom field</option>
                                {Object.entries(this.fields).map(val=>{
                                    return <option key={val[1] + field} value={val[1]}>{val[0]}</option>
                                })}
                            </select>
                        </div>
                        );
                    })}
                </div> 
                <button className="select-entry-btn upload-position" onClick={this.startUpload}>Upload</button>      
            </div>
        );
    }
}


/*
    This is the main component for the cohort creation page.
    It works by selecting which component to display from its panels object
*/
class CohortCreation extends React.Component {

    constructor(props){
        super(props);
        // const { data } = this.props.location.data;
        this.state = {
            selectedPanel: "dataEntry",
            data: null,
            name: ""
        };
        this.panels = {
            "login": <Login data={this.state.data} changePanel={this.changePanel}/>,
            "dataEntry": <DataEntrySelection changePanel={this.changePanel} name={this.getName}/>,
            "fileUpload": <FileUploadSelection changePanel={this.changePanel} setData={this.setData}/>,
            "fieldMatching": <FieldMatches data={this.state.data} changePanel={this.changePanel}/>
        }
    }

    // Called when name input changed
    nameChange = (e) => {
        this.setState({name: e.target.value});
    }

    // ????
    getName = () => {
        return this.state.name;
    }

    // Simple function for changing panel to a selected panel
    changePanel = (panel) => {
        this.setState({selectedPanel: panel});
    }
    
    // ??????
    setData = data => {this.setState({data: data}); this.panels.fieldMatching=<FieldMatches data={data} changePanel={this.changePanel}/>};

    render(){
        
        var num = this.props.location;;
        return (
            <div className="cohort-creation-content">
                <p className="name-description"><span>Create a New Cohort</span></p>
                <input id="name" onChange={this.nameChange} placeholder="Enter Cohort Name"></input>
                <br></br>
                <br></br>
                {this.panels[this.state.selectedPanel]}
                  
            </div>
        );
    }
}

export default CohortCreation;