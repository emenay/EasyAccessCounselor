import React from 'react';
// import ReactDOM from 'react-dom';
import * as data2 from '../data_caseload_management.json';
import MainDataView from '../components/dataViews/MainDataView';
import '../css/CaseloadPage.css'
import 'bulma/css/bulma.css'

//import Autocomplete from '@material-ui/lab/Autocomplete';
import { db } from '../firebase/firebase';

export function inputSearch(props) {
  return (
    <div style={{ width: '100%' }}>
      {/*<Autocomplete
        id="search-input"
        freeSolo
        options={props.default.map((option) => option.Name)}
        renderInput={(params) => (
          <TextField {...params} label="Find a student (Ex: John Doe)" margin="normal" variant="outlined" />
        )}
      />*/}
    </div>
  );
}

class CaseloadPage extends React.Component {
  constructor(props){
    super(props);
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

    this.filterFields = new Map([
      ["Goal", ["4 year", "2 year"]],
      ["Early Apps", ["yes", "no"]]
    ]);

  }
  render(){
    return <MainDataView fields={this.fields} filterFields={this.filterFields}/>
  }
}

export default CaseloadPage;