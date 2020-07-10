import {db, auth} from '../firebase/firebase.js';
import React from 'react';
import '../css/CohortCreation.css';

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
                this.props.changePanel(<p>new</p>);
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
            this.state.selectedPanel
        );
    }
}

export default CohortCreation;