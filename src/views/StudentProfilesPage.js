import React from 'react';
import {GridView} from "../components/dataViews/GridView.js";
import 'bulma/css/bulma.css';
import "../css/CaseloadPage.css";
import * as data2 from '../data_caseload_management.json';

class StudentProfilesPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedCard: null
        }
    }

    render(){
        return <div className="profiles-content">
            <GridView data={data2} />
        </div>
    }
}

export default StudentProfilesPage;