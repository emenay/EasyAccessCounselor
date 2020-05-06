import React from 'react';
import { db } from '../firebase/firebase';

import '../css/HomePageSignedIn.css'

class HomePageSignedIn extends React.Component {
  state = {
    data : null,
  }

  async componentDidMount() {
    let query = await db.collection("students").where("cuid", "==", this.props.cuid).get();
    this.setState({data: query.docs.map(doc => doc.data())})
  }

  displayTable() {
    let students = [];
    this.state.data.forEach(student => students.push(student));
    let table = 
        <div>
          {students.map(student => <div key={student.name}>
            {student.firstName} {student.lastName}
          </div>)}
        </div>
    return table;
  }

  render() {
      return (
        <div>
          Welcome to the Easy Access Counselor Portal! The following is an example of how to get info
          for a counselor's students:
          <p class="list-title">My Students</p>
          {this.state.data ? this.displayTable() : "You do not have any students."}
        </div>
      );
  }
}

export default HomePageSignedIn;
