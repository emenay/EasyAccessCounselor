import React from 'react'
import '../../css/Dashboard.css'

import AddStudentsBtn from '../addStudents/AddStudentsBtn'
import StudentCard from './StudentCard'

function displayCards(data) {
  let students = []
  data.forEach((student) => students.push(student))
  let cardList = (
    <div>
      {students.map((student) => (
        <div key={student.uid}>
          <StudentCard
            firstName={student.firstName}
            lastName={student.lastName}
          />
        </div>
      ))}
    </div>
  )
  return cardList
}

function DashboardPanel(props) {
  return (
    <div className="dashboard-panel">
      <div className="panel-header">
        <p className="list-title">My Students</p>
        <p>Students: [num]</p>
      </div>
      <div className="panel-section">
        <AddStudentsBtn
          viewAddStudent={props.viewAddStudent}
          closeAddStudent={props.closeAddStudent}
        />
      </div>
      <div className="student-list">
        {props.data
          ? displayCards(props.data)
          : 'You do not have any students.'}
      </div>
    </div>
  )
}

export default DashboardPanel
