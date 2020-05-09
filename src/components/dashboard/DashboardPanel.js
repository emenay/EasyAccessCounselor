import React from 'react';
import '../../css/Dashboard.css';

import AddStudentsBtn from '../AddStudentsBtn';
import StudentCard from './StudentCard';

function displayCards(data) {
  let students = [];
  data.forEach(student => students.push(student));
  let cardList = 
    <div>
      {students.map(student => <div key={student.uid}>
        <StudentCard firstName={student.firstName} lastName={student.lastName} />
      </div>)}
    </div>
  return cardList;
}

function DashboardPanel(props) {
  return (
    <div class="dashboard-panel">
      <div class="panel-header">
        <p class="list-title">My Students</p>
        <p>Students: [num]</p>
      </div>
      <div class="panel-section">
        <AddStudentsBtn/>
      </div>
      <div class="student-list">
        {props.data ? displayCards(props.data) : "You do not have any students."}
      </div>
    </div>
  )
}

export default DashboardPanel;