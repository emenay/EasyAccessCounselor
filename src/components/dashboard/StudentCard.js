import React from 'react';
import '../../css/Dashboard.css';

function StudentCard(props) {
  return (
    <div class="student-card">
      <p class="card-name">{props.firstName} {props.lastName}</p>
      {/* TODO: Other information displayed on the cards */}
    </div>
  )
}

export default StudentCard;