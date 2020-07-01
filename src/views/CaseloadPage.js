import React from 'react';
import '../css/searchBar.css';
import '../css/CaseloadPage.css';

class CaseloadPage extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      searchString: ""
    });
    this.fields = [
      "Goal",
      "Meetings",
      "Tasks",
      "Visit",
      "Testing",
      "List",
      "Fee Waiver",
      "Early Apps",
      "Essay",
      "Teacher Recs",
      "Counselor Rec",
      "Resume",
      "FAFSA",
      "CSS Profile",
      "Results",
      "Verification",
      "Award Letters",
      "Appeal",
      "Spring Visit",
      "Decision",
      "Latest"
    ];
    
  }

  getContent = (e) => {
    console.log(e.target.value);
  }
  render(){
    console.log("rendered");
    return (
      <div className="caseload-content">
        <div className="profiles-header">
          <input type="text" id="myInput" onKeyUp={this.changeSearchString} placeholder="Search for Students.." />
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