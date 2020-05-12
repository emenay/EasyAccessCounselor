import React from 'react';
import '../../css/components.css';

function AddStudentManual() {
  return (
    <div className="add-student-manual">
      <div>
        <p>Add a new student.</p>
      </div>
      <div className="add-student-form">
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input className="input" type="text" placeholder="First Name"></input>
          </div>
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" placeholder="Last Name"></input>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddStudentManual;