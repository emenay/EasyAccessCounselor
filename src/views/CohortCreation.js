import React from 'react';
import '../css/CohortCreation.css';

class FileUploadSelection extends React.Component {
    constructor(props){
        super(props);
        this.state = {fileName: null, file: null}
    }

    preventDefault = e => e.preventDefault();

    componentDidMount() {
        window.addEventListener("dragover", this.preventDefault);
        window.addEventListener("drop", this.preventDefault);
    }

    componentWillUnmount() {
        window.removeEventListener("dragover", this.preventDefault);
        window.removeEventListener("drop", this.preventDefault);
    }

    handleFile = (file) => {
        let fileType = file.name.split('.').pop();
        if (!["xls", "xlsv", "csv"].includes(fileType)){
            alert('File must be .xls, .xlsv, or .csv');
        } else {
            this.setState({fileName: file.name, file: file});
        }
    }

    onChange = (e) => {
        this.handleFile(e.target.files[0]);
    }

    handleDrop = (e) => {
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.handleFile(e.dataTransfer.files[0]);
        }
    }

    onSubmit = () => {
        if (this.state.file){
            let fileReader = new FileReader();
            console.log("reading");
            fileReader.addEventListener('load', (event)=> {
                console.log(event.target.result);
                this.props.setData(event.target.result);
                this.props.changePanel("fieldMatching");
            });
            fileReader.readAsText(this.state.file);
        }
    }
    render(){
        return (
            <div className="file-upload-wrapper">
                <p>Upload your student data.</p>
                <div className="uploadbox" onDrop={this.handleDrop}>{this.state.fileName ? this.state.fileName : "Drag and drop file."}</div>
                <div className="file-upload-buttons">
                    <input className="uploadinput" id="file" type="file" name="file" accept=".csv, .xlsx, .xls" onChange={this.onChange} />
                    <label htmlFor="file" className="select-entry-btn">Browse</label>
                    <button className={"select-entry-btn" + (this.state.file ? "": " inactive")} onClick={this.onSubmit}>Upload</button>
                </div>
            </div>
        );
    }
}

class DataEntrySelection extends React.Component {
    constructor(props){
        super(props);
        this.state = {selectedState: null}
    }
    onChange = (e)=> {
        this.setState({selectedState: e.target.value});
    }

    onSubmit = ()=> {
        switch(this.state.selectedState){
            case "manual":
                window.location.href = window.location.origin + "/caseload_management";
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
        </div>);
    }
}

class FieldMatches extends React.Component {
    constructor(props){
        super(props);
        let fieldsMap = new Map();
        this.props.data.split('\n')[0].split(',').forEach(field=>fieldsMap.set(field, "None"));
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
        "Field of Study/Major 1": "major",
        "Field of Study/Major 2": "major2",
        "Safety Colleges": "safetyColleges",
        "Target Colleges": "targetColleges",
        "Reach Colleges": "reachColleges",
        "Counselor Additions": "additions",
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

    selectField = (e, field) => {
        let new_fields = new Map(this.state.fieldsMap);
        new_fields.set(field[0], e.target.value);
        this.setState({fieldsMap: new_fields});

    }

    render(){
        return (
            <div>
                <p>Match your upload's fields with the fields in the Easy Access database, or create a new field</p>
                <div className="field-titles">
                    <p>Upload's Field</p>
                    <p>Easy Access Field</p>
                </div>
                <div className="fields-view">
                    {Array.from(this.state.fieldsMap).map(field=>{
                        return(
                        <div key={field[0]} className="field-select">
                            <p>{field[0]}</p>
                            <select value={field[1]} onChange={e=>this.selectField(e, field)}>
                                <option value="None">Select Option</option>
                                {Object.entries(this.fields).map(val=>{
                                    return <option key={val[1] + field} value={val[1]}>{val[0]}</option>
                                })}
                            </select>
                        </div>
                        );
                    })}
                </div>        
            </div>
        );
    }
}

class CohortCreation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedPanel: "dataEntry",
            data: null 
        };
        this.panels = {
            "dataEntry": <DataEntrySelection changePanel={this.changePanel}/>,
            "fileUpload": <FileUploadSelection changePanel={this.changePanel} setData={this.setData}/>,
            "fieldMatching": <FieldMatches data={this.state.data} changePanel={this.changePanel}/>
        }
    }

    changePanel = (panel) => {
        this.setState({selectedPanel: panel});
    }
    
    setData = data => {this.setState({data: data}); this.panels.fieldMatching=<FieldMatches data={data} changePanel={this.changePanel}/>};

    render(){
        return (
            <div className="cohort-creation-content">
                {this.panels[this.state.selectedPanel]}
            </div>
        );
    }
}

export default CohortCreation;