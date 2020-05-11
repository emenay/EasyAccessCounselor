import React from 'react';
import '../../css/components.css';

import AddStudentManual from './AddStudentManual';
import AddStudentSpreadsheet from './AddStudentSpreadsheet';

import Button from '@material-ui/core/Button';

// This modal will have two options: add a single student manually or import a spreadsheet.

class AddStudentsModal extends React.Component {
  state = {
    view: <AddStudentManual />
  }

  render() {
    return (
      <div>
        <div className="blackout" />
        <div className="add-students-modal">
          <div>
            <p className="modal-header">Add Students</p>
          </div>
          <div>
            <Button variant="outlined" onClick={this.props.closeAddStudent}>
              Close
            </Button>
          </div>
        </div>
      </div>
    )
  }

}

export default AddStudentsModal;