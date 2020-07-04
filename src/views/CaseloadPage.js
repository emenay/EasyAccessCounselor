import React from 'react';
// import ReactDOM from 'react-dom';
import data2 from "../data_caseload_management.json";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../css/CaseloadPage.css';

class CaseloadPage extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      searchString: ""
    });
    this.fields = [
      {field: "id", headerName: "ID", width: "70"},
      {field: "Name", headerName: "Name", sortable: true, filter: true, editable: true, resizable: true},
      {field: 'Goal', headerName: 'Goal', sortable: true, filter: true, editable: true, resizable: true},
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
    console.log("mounted");
    // TODO: where fetch data for display will be implemented
  }

  async cellEditingStopped(e) {
    console.log(e.colDef.field + ": " + e.data.id + " " + e.data[e.colDef.field]);
    // TODO: where updating the database will occur
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
            rowData={data2}>
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