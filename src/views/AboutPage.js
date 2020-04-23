import React from 'react';
import { db } from '../firebase/firebase';

class AboutPage extends React.Component {
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
          This is just a tinkering page for right now. This currently has an example of how to
          get the info for a counselor's students.
          <h2>My Students</h2>
          {this.state.data ? this.displayTable() : ""}
        </div>
      );
  }
}

export default AboutPage;