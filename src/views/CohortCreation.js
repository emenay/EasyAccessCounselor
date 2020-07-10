import {db, auth} from '../firebase/firebase.js';
import React from 'react';
import '../css/CohortCreation.css';

class FileUploadSelection extends React.Component {
    constructor(props){
        super(props);
        this.state = {fileName: null}
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
    onChange = (e) => {
        console.log(e.target.files[0]);
        this.setState({fileName: e.target.files[0].name})
    }

    handleDrop = (e) => {
        console.log("here");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            console.log(e.dataTransfer.files[0]);
            this.setState({fileName: e.dataTransfer.files[0].name});
        }
    }
    render(){
        return (
            <div className="file-upload-wrapper">
                <p>Upload your student data.</p>
                <div className="uploadbox" onDrop={this.handleDrop}>{this.state.fileName ? this.state.fileName : "Drag and drop file."}</div>
                <input type="file" name="file" onChange={this.onChange} />
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
                this.props.changePanel(<FileUploadSelection />);
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
            <button className={"select-entry-btn" + (this.state.selectedState ? " entry-active": "")} onClick={this.onSubmit}>Create</button>
        </div>);
    }
}

class CohortCreation extends React.Component {
    constructor(props){
        super(props);
        this.state = {selectedPanel: <DataEntrySelection changePanel={this.changePanel}/>};
    }

    changePanel = (panel) => {
        this.setState({selectedPanel: panel});
    }

    render(){
        return (
            <div className="cohort-creation-content">
                {this.state.selectedPanel}
            </div>
        );
    }
}

export default CohortCreation;