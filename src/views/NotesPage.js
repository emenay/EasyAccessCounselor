import React from 'react';
import MainDataView from '../components/dataViews/MainDataView';

// Previously implemented with MainDataView
// Likely can be deleted/look at new implementation since past implementation was early in dev cycle
class NotesPage extends React.Component {
  constructor(props){
    super(props);
    this.fields = [
      "Meetings",
      "Latest Note"
    ];
  }
  render(){
    return <MainDataView fields={this.fields}/>
  }
}

export default NotesPage;