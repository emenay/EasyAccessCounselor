import React from 'react';
import { db } from '../firebase/firebase';

import '../css/Dashboard.css';
import DashboardPanel from '../components/dashboard/DashboardPanel';
import StudentCard from '../components/dashboard/StudentCard';
import AddStudentsModal from '../components/addStudents/AddStudentsModal';
import {UserContext} from '../providers/UserProvider';

class Dashboard extends React.Component {
  static contextType = UserContext;
  constructor() {
    super();
    this.state = {
      data : null,
      viewAddStudentModal : false
    };
    this.viewAddStudent = this.viewAddStudent.bind(this);
    this.closeAddStudent = this.closeAddStudent.bind(this);
  }

  async componentDidMount() {
    let query = await db.collection("students").where("cuid", "==", this.context.state.user.uid).get();
    this.setState({data: query.docs.map(doc => doc.data())});
  }

  viewAddStudent() {
    this.setState({viewAddStudentModal: true});
  }

  closeAddStudent() {
    this.setState({viewAddStudentModal: false});
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

  render() {
      return (
        <div className="dashboard-container">
          {this.state.viewAddStudentModal ? <AddStudentsModal cuid={this.props.cuid} closeAddStudent={this.closeAddStudent} /> : ''}
          <div className="dash-container-left">
            <DashboardPanel data={this.state.data} viewAddStudent={this.viewAddStudent} />
          </div>
          <div className="dash-container-right">
            <p>Welcome to the Easy Access Counselor Portal!</p>
          </div>
        </div>
      );
  }
}

export default Dashboard;
