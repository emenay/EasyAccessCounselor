import React from 'react';
import MainDataView from '../components/dataViews/MainDataView';

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