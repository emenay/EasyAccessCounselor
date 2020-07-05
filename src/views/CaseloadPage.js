import React from 'react';
// import ReactDOM from 'react-dom';
import data2 from "../data_caseload_management.json";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../css/CaseloadPage.css';
import {db} from '../firebase/firebase.js';

class CaseloadPage extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      searchString: "",
      data: []
    });
    this.fields = [
      {field: "id", headerName: "ID", width: "70"},
      {field: "firstName", headerName: "First Name", sortable: true, filter: true, editable: true, resizable: true},
      {field: 'lastName', headerName: 'Last Name', sortable: true, filter: true, editable: true, resizable: true},
      {field: "Meetings", headerName: 'Meetings', sortable: true, editable: true, filter: 'agNumberColumnFilter', resizable: true},
      {field: "Tasks", headerName: 'Tasks', sortable: true, editable: true, filter: 'agNumberColumnFilter', resizable: true},
      {field: "Visit", headerName: 'Visit', sortable: true, filter: true, editable: true, resizable: true},
      {field: "Testing", headerName: 'Testing', sortable: true, editable: true, filter: 'agNumberColumnFilter', resizable: true},
      {field: "List", headerName: 'List', sortable: true, filter: true, editable: true, resizable: true},
      {field: "Fee Waiver", headerName: 'Fee Waiver', sortable: true, filter: true, editable: true, resizable: true},
      {field: "Early Apps", headerName: 'Early Apps', sortable: true, filter: true, editable: true, resizable: true},
      {field: "Essay", headerName: 'Essay', sortable: true, filter: true, editable: true, resizable: true},
      {field: "Teacher Recs", headerName: 'Teacher Recs', sortable: true, filter: true, editable: true, resizable: true}
    ];
    
  }

  componentDidMount() {
    db.collection("student_counselors").doc("Vt4H50TQklsch0mJNGBM").collection("students")
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
                data: data
            });
        })
        .catch(error => {console.log(error)});

    
  }

  cellEditingStopped(e) {
    // TODO: where updating the database will occur
    if (e.data.uid in e.data) {
      var data = Object.assign({}, e.data);
      var uid = data.uid;
      delete data.uid;
      db.collection("student_counselors").doc("Vt4H50TQklsch0mJNGBM").collection("students")
      .doc(uid)
      .set(data);
    } else {
      console.log(e);
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
            rowData={this.state.data}>
          </AgGridReact>
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