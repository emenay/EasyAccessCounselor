import React from 'react'
import '../../css/components.css'

import Button from '@material-ui/core/Button'

class AddStudentSpreadsheet extends React.Component {
  state = {}

  temp() {
    alert('WIP! This functionality is currently not supported.')
  }

  render() {
    return (
      <div className="add-student-spreadsheet">
        <div>
          <p>
            Work in Progress. This will allow the counselor to upload a
            spreadsheet of students.
          </p>
        </div>
        <div className="add-modal-btns">
          <div style={{ marginRight: 60 }}>
            <Button variant="outlined" onClick={this.props.closeAddStudent}>
              Cancel
            </Button>
          </div>
          <div>
            {/* <Button variant="contained" color="primary" onClick={(e) => this.props.onSubmit(e, this)}>
              Add
            </Button> */}
            <Button variant="contained" color="primary" onClick={this.temp}>
              Add
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddStudentSpreadsheet
