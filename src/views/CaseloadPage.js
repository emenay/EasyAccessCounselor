import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import Select from 'react-select';
import CustomHeader from '../components/caseloadPage/customHeader.jsx';
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
import filter_outline from "../assets/essentials_icons/svg/controls-4.svg"
import filter_icon from "../assets/essentials_filled/svg/controls-4-filled.svg"
import {ReactComponent as menu_btn} from '../assets/essentials_icons/svg/menu-1.svg'

//TODO: 
// Issue 1: Added fields don't seem to be populated on load of CaseloadPage between states
// - Discovered: custom field shows up in ag-grid but is not present in the fields or addedFields property of CaseloadPage instance
// Issue 2: As custom fields are added, those changes needed to be reflected in the filter options passed as props to DownloadPopUp 
//          on its initial render
// Issue 3: If the download window is opened while a cell in the grid is being edited, the grid overlay will appear above DownloadPopUp

function IconButton(props) {
  return <button className={props.class} style={{backgroundImage: "url(" + props.url + ")"}} onClick={props.clickMethod}/>
}

export class DownloadPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.columnOptions = React.createRef();
  }
  state = {};

  render() {
    return <div className={this.props.class}> 
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
          <SelectBox ref={this.columnOptions} className={'popup-column-filter'} placeholder={'Select Column Options...'} filterOptions={this.props.columnOptions} onColumnOptionChange={this.props.onColumnOptionChange}/>
          <SelectBox className={'popup-row-filter'} placeholder={'Select Row Options...'} filterOptions={this.props.rowOptions} onColumnOptionChange={this.props.onColumnOptionChange}/>
          <input className ='search_box' type="text" id="popup-name-input" placeholder="Give your file a name..." />
        </div>
        <div id='download-preview'>
        </div>
      </div>
      <div id='popup-footer'>
        <div id='download-btn' onClick={this.props.clickMethod}>
          Download 
        </div>
        <div id='cancel-btn'>
          Cancel
        </div>
      </div>
    </div>
  </div> 
  }
}

export class FieldDisplayPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allColDefs: props.allColDefs.slice(1), // remove row select column def
      fieldVisPref: props.fieldVisPref,
    };
    // Define list of manageable fields and set array of selected fields; this should happen more dynamically as a function of a visible fields state in the parent
    this.fieldList = this.state.allColDefs != null ? this.state.allColDefs.map((field) => {
      return (
            <label key={field.field} htmlFor={field.field}>
              {/* Determine default checked condition of a field label */}
              {this.state.fieldVisPref.includes(field.field) ? <input onChange={this.onChange} type="checkbox" id={field.field} defaultChecked/> : 
                                                                    <input onChange={this.onChange} type="checkbox" id={field.field}/>}
              <span>{field.headerName}</span>
            </label>
        );
    }) : '';
  }

  onChange = (e) => {
    let fieldId = e.target.id;
    this.setState((state) => {
      let selected = !state.fieldVisPref.includes(fieldId) ? [...state.fieldVisPref, fieldId]:
                                                                state.fieldVisPref.filter(field => field != fieldId); // Remove the field from the selected fields list if already exists
      return {
        fieldVisPref: selected,
      }
    });
  }

  onSave = () => {
    this.props.onSave(this.state.fieldVisPref);
    this.props.onClose();
  }

  render() {
    return (
      <div className={'field_management'}> 
        <div className="download-popup-content">
          <div id='popup-header' value='Download Caseload Data'>
            <div></div>
            <span>Manage Field Visibility</span>
            <span className="close" onClick={this.props.onClose}>
              <img src={close_btn} alt='close-download-popup'></img>
            </span>
          </div>
          <div id='field_list'>
            {this.fieldList}
          </div>
          <div id='popup-footer'>
            <div id='save-btn' onClick={this.onSave}>
              Save
            </div>
            <div id='cancel-btn' onClick={this.props.onClose}>
              Cancel
            </div>
          </div>
        </div>
      </div> 
    );
  }

}

// React-Select Component for use in the DownloadPopUp
class SelectBox extends React.Component {
  constructor(props){
    super(props)
    // this.filterOptions = props.filterOptions;
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedOption: null,
      filterOptions: null,
    };
  }
  // state = {
  //   selectedOption: null,
  //   filterOptions: null,
  // };

  customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      textOverflow: "ellipsis",
      maxWidth: "90%",
      whiteSpace: "nowrap",
      overflow: "hidden",
    })
  };

  updateFilterOptions = () => {
    this.setState({
      filterOptions: this.props.filterOptions()
    })
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.onColumnOptionChange(selectedOption)
  };

  render() {
    const { selectedOption } = this.state;
    const { filterOptions } = this.state;

    const downloadColumns = this.props.downloadColumns;
    return (
      <Select
        isMulti
        name="colors"
        // options={this.props.filterOptions}
        options={filterOptions}
        className={this.props.className}
        placeholder={this.props.placeholder}
        value={selectedOption}
        onChange={this.handleChange}
        styles={this.customStyles}
      />
    );
  }
}

class CaseloadPage extends React.Component {
  static contextType = UserContext;
  constructor(props){
    super(props);
    this.state = ({
      modules: AllCommunityModules, 
      rowsSelected: false,
      searchString: "",
      data: [],
      undoRows: [],
      lastCohort: null,
      addedFields: [],
      allColDefs: [],
      columns: [],
      downloadColumns: [],
      frameworkComponents: { agColumnHeader: CustomHeader },
      fieldPopUpOpen: false,
      visibleColumns: [],
      fieldVisPref: [], // array to be passed to database for persistence of visible fields between sessions 
    });
    
    // Bind in order to access AgGrid properties from download-popup
    this.onBtnDownload = this.onBtnDownload.bind(this);
    this.downloadData = this.downloadData.bind(this);
    this.handleColumnOptionChange = this.handleColumnOptionChange.bind(this);
    this.getColumnNames = this.getColumnNames.bind(this);
    this.updateFieldFilter = this.updateFieldFilter.bind(this);
    // this.updateAllColDefs = this.updateAllColDefs.bind(this);

    // Each object is a column, passed to constructor for Ag-grid
    this.fields = [
      {width: "50", pinned: 'left', lockPosition: true, lockPinned: true, sortable: false, checkboxSelection: true, suppressMenu: true, cellStyle: params => {return {backgroundColor: "white", borderTop: "0", borderBottom: "0"}}},
      {field: "id", headerName: "ID", editable: true, valueParser: this.numberType, width: "70", suppressMenu: true},
      {field: "firstName", headerName: "First Name", sortable: true, comparator: this.comparator, filter: true, editable: true, resizable: true, sortable: true},
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
    this.state.allColDefs = this.state.allColDefs.concat(this.fields);

    // Reference for download popup to set column option state when new columns are added
    this.downloadPopUp = React.createRef();
  }

  // Function for handling selection of column filter options in download popup
  handleColumnOptionChange(downloadColumns) {
    this.setState({downloadColumns})
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
            let addedFields = (result.data().addedFields !== undefined ? result.data().addedFields.map(field=> {
              return {
                field: field, headerName: field, comparator: this.comparator, sortable: true, editable: true, filter: true, resizable: true, headerComponentParams: {menuIcon: menu_btn},
              }
            }) : [])
            this.setState({
              data: data,
              lastCohort: this.context.state.selectedCohort,
              addedFields: addedFields,
              allColDefs: this.state.allColDefs.concat(addedFields)
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
        console.log('Adding field');
        console.log(e.data);
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
    var selectedCols = this.state.downloadColumns;
    var colIdList = [];
    selectedCols.forEach((col) => {
      colIdList.push(col.value);
    })
    var params = colIdList.length > 0 ? {fileName: name, columnKeys: colIdList} : 
                                        {fileName: name};
    this.gridApi.exportDataAsCsv(params)
  }

  getColumnNames() {
    // var columns = this.addedFields != undefined ? this.fields.concat(this.addedFields) : this.fields;
    var columns = this.gridColumnApi.getAllColumns();
    // console.log(otherCols);
    var colNames = [];
    var rowSelect = true; 
    columns.forEach((col)=>{
      if (rowSelect){ //Skips over column that represents row select
        rowSelect = false;
        return;
      }  
      var header = col.colDef.headerName;
      var id = col.colId;
      var option = {
        'label': header,
        'value': id
      }
      colNames.push(option);
    });
    // console.log(colNames);
    return colNames;
  }

  /* Takes in an array of field id values from the FieldManagementPopUp 
  - updates caseload page state of visibleColumns (ag-grid colDefs)
  - updates caseload page state of fieldVisPref (associated with cohort to persist pref. between sessions)
  */
  updateFieldFilter(fields) {
    let visibleColumns = this.fields.concat(this.state.addedFields);
    visibleColumns = visibleColumns.filter((colDef) => {
      return fields.includes(colDef.field);
    });
    console.log(visibleColumns);
    this.setState({
      visibleColumns: visibleColumns,
      fieldVisPref: fields,
    });
  }

  // /* Catch all function to make sure that allColDefs state variable represents all default and user defined columns at any time */
  // updateAllColDefs() {
  //   let userDef = this.state.addedFields;
  //   let defaultDef = this.fields;
  //   this.setState({
  //     allColDefs: defaultDef.concat(userDef),
  //   });
  // }

  // Autosize all columns
  autoSizeAll = () => {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, true);
  };

  // plus from https://icons8.com/icons/set/plus
  // TODO: (1) create a tool tip for the download button when no data is selected
  //       (2) bind CaseloadPage to DownloadPopup for more flexibility with ag Grid
  render(){
    const downloadColumns = this.state.downloadColumns;
    return (
      <div className="caseload-content">
        <DownloadPopUp ref={this.downloadPopUp} class={'download-popup'} clickMethod={this.onBtnDownload} columnOptions={this.getColumnNames} rowOptions={this.rowOptions} onColumnOptionChange={this.handleColumnOptionChange}/>
        {this.state.fieldPopUpOpen ? <FieldDisplayPopUp ref={this.fieldPopUp} onSave={this.updateFieldFilter} onClose={this.displayFieldManagement.bind(this)} allColDefs={this.state.allColDefs} fieldVisPref={this.state.fieldVisPref}/> : ''}
        <div className="caseload-header">
          <input className ='search_box' type="text" id="myInput" onKeyUp={this.changeSearchString} placeholder="Search Table..." />
          {this.state.rowsSelected && <IconButton url={trash} clickMethod={this.deleteRows} class={'icon_button'}/>}             
          {this.state.undoRows.length > 0 && <IconButton url={undo} clickMethod={this.undoDelete} class={'icon_button'}/>}
          <IconButton url={filter_outline} clickMethod={this.displayFieldManagement} class={'icon_button'}></IconButton>
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
            modules={this.state.modules}
            quickFilterText={this.state.searchString}
            onCellEditingStopped={(e) => this.cellEditingStopped(e)}
            columnDefs={this.state.visibleColumns.length == 0 ? this.fields.concat(this.state.addedFields) : this.state.visibleColumns}
            defaultColDef={{editable: true, filter: true, headerComponentParams: {menuIcon: menu_btn}}}
            rowData={this.state.data}
            rowSelection="multiple"
            onSelectionChanged={this.onSelectionChanged}
            suppressRowClickSelection={true}
            frameworkComponents = {this.state.frameworkComponents}
            suppressMenuHide={true}
            />
        </div>
      </div>
    );
  }

  downloadData(){
    var popup = document.querySelector('.download-popup');
    popup.style.display = 'block';
    this.columnOptions = this.getColumnNames(); 
    // Update the options for the react select column options component when the download window opens
    this.downloadPopUp.current.columnOptions.current.updateFilterOptions();
    
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

  displayFieldManagement = () => {
    this.setState(state => {
      return {
        fieldPopUpOpen: !state.fieldPopUpOpen,
      }
    });
  }

}

export default CaseloadPage;
