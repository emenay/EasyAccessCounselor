import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDataGrid from 'react-data-grid';
import data2 from "../data_caseload_management.json";
import 'react-data-grid/dist/react-data-grid.css';

class CaseloadPage extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      searchString: ""
    });
    this.fields = [
      {key: "uid", name: "ID", editable: false},
      {key: 'Goal', name: 'Goal', editable: true},
      {key: "Meetings", name: 'Meetings', editable: true},
      {key: "Tasks", name: 'Tasks', editable: true},
      {key: "Visit", name: 'Visit', editable: true},
      {key: "Testing", name: 'Testing', editable: true},
      {key: "List", name: 'List', editable: true},
      {key: "Fee Waiver", name: 'Fee Waiver', editable: true},
      {key: "Early Apps", name: 'Early Apps', editable: true},
      {key: "Essay", name: 'Essay', editable: true},
      {key: "Teacher Recs", name: 'Teacher Recs', editable: true}
    ];
    
  }

  getContent = (e) => {
    console.log(e.target.value);
  }
  render(){
    return (
      <div className="caseload-content">
        <div className="profiles-header">
          <input type="text" id="myInput" onKeyUp={this.changeSearchString} placeholder="Search for Students.." />
        </div>
                  
          <ReactDataGrid
            columns={this.fields}
            rows={data2}
            rowGetter={i => data2[i]}
            rowsCount={data2.length}
            minHeight={2} />
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