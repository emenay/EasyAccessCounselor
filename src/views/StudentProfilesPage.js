import React from 'react';
import {GridView} from "../components/dataViews/GridView.js";
import 'bulma/css/bulma.css';
import "../css/CaseloadPage.css";
import data2 from '../data_caseload_management.json';

class StudentProfilesPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedCard: null,
            sortField: "Testing",
            searchString: "",
            viewModal: false
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

    render(){
        let sortedData = data2.sort(this.compare);
        return <div className="profiles-content">
            <GridView data={sortedData} />
        </div>
    }
}

export default StudentProfilesPage;