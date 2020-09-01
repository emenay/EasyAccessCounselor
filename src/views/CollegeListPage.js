import React from 'react';
import MainDataView from '../components/dataViews/MainDataView';

// Previously implemented with MainDataView
// Likely can be deleted/look at new implementation since past implementation was early in dev cycle
class CollegeListPage extends React.Component {
  constructor(props){
    super(props);
    this.fields = [
      "Goal",
      "Public Safety",
      "Public Target",
      "Public Reach",
      "Private Safety",
      "Private Target",
      "Public Reach",
      "GPA",
      "SAT",
      "ACT",
      "EFC",
      "Ability to Pay",
      "ZIP",
      "State",
      "Want to Attend (Region)",
      "Major"
    ];
  }
  render(){
    //return <MainDataView fields={this.fields}/>
    return <p>Coming soon</p>
  }
}

export default CollegeListPage;