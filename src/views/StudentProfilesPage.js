import React from 'react';
import {GridView} from "../components/dataViews/GridView.js";
import 'bulma/css/bulma.css';
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
        this.state = {
            selectedCard: null,
            sortField: "Testing",
            searchString: ""
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

    clickCard = (name) => {
        this.setState({selectedCard: name});
    }

    exitModal = () => {
        this.setState({selectedCard: null});
    }

    render(){
        let details;
        if (this.state.selectedCard){
            console.log(typeof(this.state.selectedCard));
            details = <StudentDetailsModal exitModal={this.exitModal} studentName={this.state.selectedCard} />
        }
        let sortedData = data2.sort(this.compare);
        return <div className="profiles-content">
            {details}
            <GridView data={sortedData} clickCard={this.clickCard} />
        </div>
    }
}

export default StudentProfilesPage;