import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { AgGridReact } from 'ag-grid-react';
import Select from 'react-select';
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
import download from '../assets/essentials_icons/svg/download.svg'
import download_filled from '../assets/essentials_filled/svg/download.svg'
import add from '../assets/essentials_icons/svg/add.svg'
import close_btn from '../assets/essentials_icons/svg/multiply.svg'

function IconButton(props) {
  return <button className={props.class} style={{backgroundImage: "url(" + props.url + ")"}} onClick={props.clickMethod}/>
}

function DownloadPopUp(props) {
  //TODO: pass row filters and column lables as props from the main view
  return <div className={props.class}> 
    <div className="download-popup-content">
      <div id='popup-header' value='Download Caseload Data'>
        <div></div>
        <span>Download Caseload Data</span>
        <span className="close">
          <img src={close_btn} alt='close-download-popup'></img>
        </span>
      </div>
      <div id='popup-body'>
        <div id='download-options'>
          <span>Apply Additional Filters</span>
          <SelectBox className={'popup-column-filter'} placeholder={'Select Column Options...'} filterOptions={props.columnOptions}/>
          <SelectBox className={'popup-row-filter'} placeholder={'Select Row Options...'} filterOptions={props.rowOptions}/>
          <input className ='search_box' type="text" id="popup-name-input" placeholder="Give your file a name..." />
        </div>
        <div id='download-preview'>
        </div>
      </div>
      <div id='popup-footer'>
        <div id='download-btn' onClick={props.clickMethod}>
          Download 
        </div>
        <div id='cancel-btn'>
          Cancel
        </div>
      </div>
    </div>
  </div> 
}


class SelectBox extends React.Component {
  constructor(props){
    super(props)
    this.filterOptions = props.filterOptions;
  }
  state = {
    selectedOption: null,
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <Select
        isMulti
        name="colors"
        options={this.filterOptions}
        className={this.props.className}
        placeholder={this.props.placeholder}
        value={selectedOption}
        onChange={this.handleChange}
      />
    );
  }
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
    // Bind this in order to access AgGrid properties from download-popup
    this.onBtnDownload = this.onBtnDownload.bind(this);
    this.downloadData = this.downloadData.bind(this);
    // Each object is a column, passed to constructor for Ag-grid
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
    this.columnOptions = [];
    this.rowOptions = [];
  }

  // Comparator for sorting numbers, ensuring blank fields and mistakes are lowest and that empty entry field stays at bottom
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

  // String comparator, ensures blank row for new row stays at bottom
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

  // Displays number fields as a number
  numberType = (params) => {
    let num = Number(params.newValue);
    if (isNaN(num)) return 0;
    return num;
  }

  // Querying data from db
  // Individual column parameters are constructed upon cohort data retrieval 
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
          // Query for getting the added fields
          // Could actually just use this query and get the students from the returned collection? TODO
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

  // Handler for saving data to DB and adding new student when lowest row is edited
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

  // TODO: Delete a field implementation
  deleteColumn = (e) => {
    console.log("here");
    console.log(e);
  }

  // Deletes selected rows using Ag-grid api
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

  // Undo delete based on saved data from delet under state.undoRows
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

  // Handler for changing the rowsSelected value in the state
  onSelectionChanged = (e) => {
    e.api.getSelectedNodes().length===0 ? (this.state.rowsSelected && this.setState({rowsSelected: false})) : (!this.state.rowsSelected && this.setState({rowsSelected: true}));
  }

  // Function for adding a field to grid and database
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

  // Function for downloading data from the grid view
  onBtnDownload(e) {
    var inputName = document.getElementById('popup-name-input').value;
    var name = inputName != '' ? inputName : 'caseload'
    var params = {fileName: name};
    this.gridApi.exportDataAsCsv(params)
  }

  getColumnNames() {
    var columns = this.fields.concat(this.addedFields)
    var colNames = [];
    colNames.forEach((col)=>{
      var field = col.field;
      var option = {
        'label': field[0].toUpperCase() + field.substring(1),
        'value': field
      }
      colNames.push(option);
    });
    return colNames;
  }

  // plus from https://icons8.com/icons/set/plus
  // TODO: create a tool tip for the download button when no data is selected
  render(){
    return (
      <div className="caseload-content">
        <DownloadPopUp class={'download-popup'} clickMethod={this.onBtnDownload} columnOptions={this.columnOptions} rowOptions={this.rowOptions}/>
        <div className="caseload-header">
          <input className ='search_box' type="text" id="myInput" onKeyUp={this.changeSearchString} placeholder="Search Table..." />
          {this.state.rowsSelected && <IconButton url={trash} clickMethod={this.deleteRows} class={'icon_button'}/>}             
          {this.state.undoRows.length > 0 && <IconButton url={undo} clickMethod={this.undoDelete} class={'icon_button'}/>}
          <IconButton url={add} clickMethod={this.addField} class={'icon_button'}/>
          {this.state.rowsSelected ? <IconButton url={download_filled} clickMethod={this.downloadData} class={'right_icon_button'}/> :
                                      <IconButton url={download} clickMethod={this.downloadData} class={'right_icon_button'} />}
        </div>       
        <div
          className="ag-theme-alpine"
          style={{
          height: '600px',
          width: '100%' }}>
          <AgGridReact
            onGridReady={ (params) => {
              this.gridApi = params.api;
              this.gridColumnApi = params.columnApi;
            }}
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

  downloadData(){
    var popup = document.querySelector('.download-popup');
    popup.style.display = 'block';
    this.columnOptions = this.getColumnNames(); 
    console.log(this.columnOptions);
    
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('#cancel-btn')

    closeBtn.addEventListener('click', () => {
      // container.parentNode.removeChild(popup)
      popup.style.display = 'none';
      document.getElementsByClassName('page-container')[0].style.filter = 'blur(0px) grayscale(0%)'
    });

    cancelBtn.addEventListener('click', () => {
      // container.parentNode.removeChild(popup)
      popup.style.display = 'none';
      document.getElementsByClassName('page-container')[0].style.filter = 'blur(0px) grayscale(0%)'
    });
  }

}

export default CaseloadPage;
