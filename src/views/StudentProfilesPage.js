import React from 'react';
import {GridView} from "../components/dataViews/GridView.js";
import {DropdownSortMenu} from "../components/dataViews/MainDataView.js";
import "../css/CaseloadPage.css";
import data2 from '../data_caseload_management.json';

class StudentDetailsModal extends React.Component {

    render(){
        return <div className="studentdetails-modal" onClick={this.props.exitModal}>
            <div className="studentdetails-content">
                <p>{this.props.studentName}</p>
            </div>
        </div>
    }
}

class StudentProfilesPage extends React.Component{
    constructor(props){
        super(props);
        let flagMap = new Map();
        data2.forEach(person=>{
            flagMap.set(person.id, false);
        });
        this.state = {
            selectedCard: null,
            sortField: "Testing",
            searchString: "",
            flagMap: flagMap,
            flagToggle: false
        }
    }

    // Helper function for sorting
    compare = (a, b) => {
        let comparison = 0;
        if (b[this.state.sortField] > a[this.state.sortField]) {
          comparison = 1;
        } else if (b[this.state.sortField] < a[this.state.sortField]) {
          comparison = -1;
        }
        return comparison;
    }

    changeSort = (field) => {
        this.setState({sortField: field});
    }

    clickCard = (name) => {
        this.setState({selectedCard: name});
    }

    clickFlag = (id) => {
        this.setState({flagMap: this.state.flagMap.set(id, !this.state.flagMap.get(id))});
    }

    flagToggle = () => {
        this.setState({flagToggle: !this.state.flagToggle});
    }

    exitModal = () => {
        this.setState({selectedCard: null});
    }

    render(){
        let data = this.state.flagToggle ? data2.filter(person => {return this.state.flagMap.get(person.id)}) : data2;
        return <div className="profiles-content">
            <div className="profiles-header">
                <button className="flag-toggle" onClick={this.flagToggle}>Toggle Flags</button>
                <DropdownSortMenu changeSort={this.changeSort} />
            </div>
            {this.state.selectedCard && <StudentDetailsModal exitModal={this.exitModal} studentName={this.state.selectedCard} />}
            <GridView data={data.sort(this.compare)} clickCard={this.clickCard} clickFlag={this.clickFlag} flags={this.state.flagMap}/>
        </div>
    }
}

export default StudentProfilesPage;