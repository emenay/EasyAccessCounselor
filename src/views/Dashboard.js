import React from 'react';
import { db } from '../firebase/firebase';

import '../css/Dashboard.css';
import StudentCard from '../components/dashboard/StudentCard';

import Button from '@material-ui/core/Button';

class Dashboard extends React.Component {
  state = {
    data : null,
  }

  async componentDidMount() {
    let query = await db.collection("students").where("cuid", "==", this.props.cuid).get();
    this.setState({data: query.docs.map(doc => doc.data())})
  }

  displayCards() {
    let students = [];
    this.state.data.forEach(student => students.push(student));
    let cardList = 
      <div>
        {students.map(student => <div key={student.uid}>
          <StudentCard firstName={student.firstName} lastName={student.lastName} />
        </div>)}
      </div>
    return cardList;
  }

  temp() {
    alert("Work In Progress");
  }

  render() {
      return (
        <div class="dashboard-container">
          <div class="dash-container-left">
            <div class="dashboard-panel">
              <div class="panel-header">
                <p class="list-title">My Students</p>
                <p>Students: [num]</p>
              </div>
              <div class="panel-section">
                <Button variant="contained" color="primary" onClick={() => this.temp()}>
                  Add Students
                </Button>
              </div>
              <div class="student-list">
                {this.state.data ? this.displayCards() : "You do not have any students."}
              </div>
            </div>
          </div>
          <div class="dash-container-right">
            <p>Welcome to the Easy Access Counselor Portal!</p>
          </div>
        </div>
      );
  }
}

export default Dashboard;
