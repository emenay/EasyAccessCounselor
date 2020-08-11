import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../css/CaseloadPage.css';
import {db} from '../firebase/firebase.js';
import '../css/searchBar.css';
import '../css/CaseloadPage.css';
import {UserContext} from '../providers/UserProvider';
import firebase from 'firebase/app';
import trash from '../assets/trash.png';
import undo from '../assets/undo.png';
import plus from '../assets/plus.png';

function IconButton(props){
  return <button className="icon_button" style={{backgroundImage: "url(" + props.url + ")"}} onClick={props.clickMethod}/>
}


class CaseloadPage extends React.Component {
  static contextType = UserContext;
  constructor(props){
    super(props);
    this.state = ({
      rowsSelected: false,
      searchString: "",
      data: [],
      undoRows: [],
      lastCohort: null,
      addedFields: []
    });
    this.fields = [
      {width: "50", checkboxSelection: true, cellStyle: params => {return {backgroundColor: "white", borderTop: "0", borderBottom: "0"}}},
      {field: "id", headerName: "ID", editable: true, valueParser: this.numberType, width: "70"},
      {field: "firstName", headerName: "First Name", sortable: true, comparator: this.comparator, filter: true, editable: true, resizable: true},
      {field: 'lastName', headerName: 'Last Name', sortable: true, comparator: this.comparator, filter: true, editable: true, resizable: true},
      {field: 'goal', headerName: 'Goal', sortable: true, comparator: this.comparator, filter: true, editable: true, resizable: true},
      {field: "gpa", headerName: 'GPA', comparator: this.numComparator, sortable: true, editable: true, valueParser: this.numberType, filter: 'agNumberColumnFilter', resizable: true},
      {field: "sat", headerName: 'SAT', comparator: this.numComparator, sortable: true, editable: true, valueParser: this.numberType, filter: 'agNumberColumnFilter', resizable: true},
      {field: "act", headerName: 'ACT', comparator: this.numComparator, sortable: true, editable: true, valueParser: this.numberType, filter: 'agNumberColumnFilter', resizable: true},
      {field: "classRank", headerName: 'Class Rank', comparator:  this.numComparator, sortable: true, valueParser: this.numberType, editable: true, filter: 'agNumberColumnFilter', resizable: true},
      {field: "efc", headerName: 'EFC', comparator:  this.numComparator, sortable: true, valueParser: this.numberType, editable: true, filter: 'agNumberColumnFilter', resizable: true},
      {field: "payMismatch", headerName: 'Ability to Pay Mismatch', comparator: this.comparator, sortable: true, filter: true, editable: true, resizable: true},
      {field: "major", headerName: 'Major 1', comparator: this.comparator, sortable: true, filter: true, editable: true, resizable: true},
      {field: "major2", headerName: 'Major 2', comparator: this.comparator, sortable: true, filter: true, editable: true, resizable: true},
      {field: "safetyColleges", headerName: 'Safety Colleges', comparator: this.comparator, sortable: true, filter: true, editable: true, resizable: true},
      {field: "targetColleges", headerName: 'Target Colleges', comparator: this.comparator, sortable: true, filter: true, editable: true, resizable: true},
      {field: "reachColleges", headerName: 'Reach Colleges', comparator: this.comparator, sortable: true, editable: true, filter: true, resizable: true},
      {field: "additions", headerName: 'Counselor Additions', comparator: this.comparator, sortable: true, editable: true, filter: true, resizable: true}
      
    ];

    // implement for deletion dropdown on header TODO
    this.customHeader = (
      '<div class="ag-cell-label-container" role="presentation">' +
      '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
      '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
      '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
      '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
      '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
      '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
      '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
      '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
      '  </div>' +
      '</div>'
    )
    
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
    // Could probably improve the double query into one, hacking one to get working
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
          db.collection("student_counselors").doc(this.context.state.selectedCohort).get()
          .then(result=>{
            this.setState({
              data: data,
              lastCohort: this.context.state.selectedCohort,
              addedFields: (result.data().addedFields !== undefined ? result.data().addedFields.map(field=> {return {field: field, headerName: field, comparator: this.comparator, sortable: true, editable: true, filter: true, resizable: true, headerComponentParams: {
                template: this.customHeader
                 
            }}}) : [])
            });
          })
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
          this.gridApi.applyTransaction({add: [{}]})
        });
      }
    }


  }

  // IMPORTANT NOTE: Only deletes the listing in the cohort, does not delete the column data for users
  deleteColumn = (e) => {
    console.log("here");
    console.log(e);
  }

  deleteRows = () => {
    if (window.confirm("Are you sure you want to delete these rows?")){
      var selectedRows = this.gridApi.getSelectedRows().filter(row=>{return !(row.uid===undefined)});
      var batch = db.batch();
      selectedRows.forEach(row=>batch.delete(db.collection("student_counselors").doc(this.context.state.selectedCohort).collection("students").doc(row.uid)));
      batch.commit().then(()=>{
          this.gridApi.applyTransaction({ remove: selectedRows });
          this.setState({rowsSelected: false, undoRows: selectedRows});
        }
      );
    }
  }

  undoDelete = () => {
    var displayedRows = this.gridApi.getModel().rowsToDisplay;
    var node = displayedRows[displayedRows.length - 1];
    var batch = db.batch();
    this.state.undoRows.forEach(row=>batch.set(db.collection("student_counselors").doc(this.context.state.selectedCohort).collection("students").doc(row.uid), row));
      batch.commit().then(()=>{
          this.gridApi.applyTransaction({remove: [node.data]});
          this.gridApi.applyTransaction({ add: this.state.undoRows });
          this.gridApi.applyTransaction({add: [{}]});
          this.setState({undoRows: []});
        }
      );
  }

  changeSearchString = (e) => {
    this.setState({searchString: e.target.value});
  }


  onSelectionChanged = (e) => {
    e.api.getSelectedNodes().length===0 ? (this.state.rowsSelected && this.setState({rowsSelected: false})) : (!this.state.rowsSelected && this.setState({rowsSelected: true}));
  }

  addField = (e) => {
    if (this.context.state.selectedCohort) {
      let fieldName =  window.prompt("What would you like to name your field?");
      if (fieldName) {
        db.collection("student_counselors").doc(this.context.state.selectedCohort)
        .update({addedFields: firebase.firestore.FieldValue.arrayUnion(fieldName)})
        .then(result=>{
          this.setState({addedFields: this.state.addedFields.concat([{field: fieldName, headerName: fieldName, comparator: this.comparator, sortable: true, editable: true, filter: true, resizable: true}])});
          this.gridApi.setColumnDefs(this.fields.concat(this.state.addedFields));
        })
        .catch(error=>console.log(error));
      }
    }
  }


  // plus from https://icons8.com/icons/set/plus
  render(){
    return (
      <div className="caseload-content">
        <div className="profiles-header">
          <input type="text" id="myInput" onKeyUp={this.changeSearchString} placeholder="Search Table..." />
          {this.state.rowsSelected && <IconButton url={trash} clickMethod={this.deleteRows} />}
          {this.state.undoRows.length > 0 && <IconButton url={undo} clickMethod={this.undoDelete} />}
          <IconButton url={plus} clickMethod={this.addField} />
        </div>
                  
        <div
          className="ag-theme-alpine"
          style={{
          height: '600px',
          width: '100%' }}>
          <AgGridReact
            onGridReady={ params => this.gridApi = params.api}
            quickFilterText={this.state.searchString}
            onCellEditingStopped={(e) => this.cellEditingStopped(e)}
            columnDefs={this.fields.concat(this.state.addedFields)}
            rowData={this.state.data}
            rowSelection="multiple"
            onSelectionChanged={this.onSelectionChanged}
            suppressRowClickSelection={true}/>
        </div>
      </div>
    );
  }
}

export default CaseloadPage;
