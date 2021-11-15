import React from 'react'
import '../../css/Dashboard.css'

function StudentCard(props) {
  return (
    <div className="student-card">
      <p className="card-name">
        {props.firstName} {props.lastName}
      </p>
      {/* TODO: Other information displayed on the cards */}
    </div>
  )
}

export default StudentCard
