import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../css/CaseloadPage.css';
import {db} from '../firebase/firebase.js';
import '../css/searchBar.css';
import '../css/CaseloadPage.css';
import {UserContext} from '../providers/UserProvider';


class CaseloadPage extends React.Component {
  static contextType = UserContext;
  constructor(props){
    super(props);
    this.state = ({
      searchString: "",
      data: [],
      lastCohort: null
    });
    this.fields = [
      {field: "id", headerName: "ID", editable: true, valueParser: this.numberType, width: "70"},
      {field: "firstName", headerName: "First Name", sortable: true, comparator: this.comparator, filter: true, editable: true, resizable: true},
      {field: 'lastName', headerName: 'Last Name', sortable: true, comparator: this.comparator, filter: true, editable: true, resizable: true},
      {field: "gpa", headerName: 'GPA', comparator: this.numComparator, sortable: true, editable: true, valueParser: this.numberType, filter: 'agNumberColumnFilter', resizable: true},
      {field: "classRank", headerName: 'Class Rank', comparator:  this.numComparator, sortable: true, valueParser: this.numberType, editable: true, filter: 'agNumberColumnFilter', resizable: true},
      {field: "safetyColleges", headerName: 'Safety', comparator: this.comparator, sortable: true, filter: true, editable: true, resizable: true},
      {field: "reachColleges", headerName: 'Reach', comparator: this.comparator, sortable: true, editable: true, filter: true, resizable: true},
      {field: "individualMeetings", headerName: 'Ind Mtng', comparator:  this.numComparator, valueParser:this.numberType, sortable: true, filter: 'agNumberColumnFilter', editable: true, resizable: true},
      {field: "groupMeetings", headerName: 'Group Mtngs', comparator:  this.numComparator, valueParser:this.numberType, sortable: true, filter: 'agNumberColumnFilter', editable: true, resizable: true},
      {field: "eventMeetings", headerName: 'Event Mtngs', comparator:  this.numComparator, valueParser:this.numberType, sortable: true, filter: 'agNumberColumnFilter', editable: true, resizable: true}
    ];
    
  }

  numComparator = (a, b, aNode, bNode, isInverted) => {
    let inverter = isInverted ? -1 : 1;
    let aVal = Number(a);
    let bVal = Number(b);

    if (aNode.data.uid === undefined){
      return 1 * inverter;
    }else if (bNode.data.uid === undefined) {
      return -1 * inverter;
    } 
    if(isNaN(aVal)) {
      if (isNaN(bVal)) return 0;
      return -1;
    }
    if(isNaN(bVal)) return 1;
    return aVal-bVal;
  }

  comparator = (aVal, bVal, aNode, bNode, isInverted) => {
    let inverter = isInverted ? -1 : 1;

    if (aNode.data.uid === undefined){
      return 1 * inverter;
    }else if (bNode.data.uid === undefined) {
      return -1 * inverter;
    } 
    if(aVal === undefined) {
      if (bVal === undefined) return 0;
      return -1;
    }
    if(bVal === undefined) return 1;
    if (aVal === bVal) return 0;
    return aVal < bVal ? -1 : 1;
  }

  numberType = (params) => {
    let num = Number(params.newValue);
    if (isNaN(num)) return 0;
    return num;
  }

  getCohortData = () => {
    if (this.context.state.selectedCohort && this.state.lastCohort !== this.context.state.selectedCohort){
      db.collection("student_counselors").doc(this.context.state.selectedCohort).collection("students")
        .get()
        .then(querySnapshot => {
        // array of student objects
            return querySnapshot.docs.map(doc =>{
              var ent = doc.data();
              ent.uid = doc.id;
              return ent;
            } );
         
        })
        .then(data => {
          data.push({});
            this.setState({
                data: data,
                lastCohort: this.context.state.selectedCohort
            });
        })
        .catch(error => {console.log(error)});
      }
  }

  componentDidMount() {
    this.getCohortData();
  }

  componentDidUpdate() {
    this.getCohortData();
  }

  cellEditingStopped(e) {
    // TODO: where updating the database will occur
    if (e.data.uid) {
      var data = Object.assign({}, e.data);
      var uid = data.uid;
      delete data.uid;
      db.collection("student_counselors").doc(this.context.state.selectedCohort).collection("students")
      .doc(uid)
      .update(data);
    } else {
      if (e.value !== undefined && e.value !== ""){
        db.collection("student_counselors").doc(this.context.state.selectedCohort).collection("students")
        .add(e.data)
        .then(response=>{
          e.data.uid = response.id;
          var new_data = [...this.state.data];
          new_data.push({});
          this.setState({data: new_data})
        });
      }
    }


  }

  changeSearchString = (e) => {
    this.setState({searchString: e.target.value});
  }


  render(){
    return (
      <div className="caseload-content">
        <div className="profiles-header">
          <input type="text" id="myInput" onKeyUp={this.changeSearchString} placeholder="Search Table..." />
        </div>
                  
        <div
          className="ag-theme-alpine"
          style={{
          height: '600px',
          width: '100%' }}>
          <AgGridReact
            quickFilterText={this.state.searchString}
            onCellEditingStopped={(e) => this.cellEditingStopped(e)}
            columnDefs={this.fields}
            rowData={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default CaseloadPage;

/*

<table id="caseload-table">
            <thead>
              {this.fields.map(field => {
                return <th className="caseload-headcell">{field}</th>;
              })}

            </thead>
            <tbody>
            <tr>
              <td className="tableCell" ><input className="inputCell" type="text" defaultValue="Hi" onChange={this.getContent}/></td>
            </tr>
            </tbody>
          </table>

*/