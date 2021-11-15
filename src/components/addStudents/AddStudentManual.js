import React from 'react'
import '../../css/components.css'

import Button from '@material-ui/core/Button'

// TODO: Give counselors ability to create their own fields

var items = [
  { fieldName: 'firstName', label: 'First Name' },
  { fieldName: 'lastName', label: 'Last Name' },
]

class AddStudentManual extends React.Component {
  state = {}

  onChange(e, fieldName) {
    this.setState({
      [fieldName]: e.target.value,
    })
  }

  render() {
    return (
      <div className="add-student-manual">
        <div>
          <p>Add a new student.</p>
        </div>
        <div className="add-student-form">
          <div className="field">
            {items.map(({ fieldName, label }) => (
              <div>
                <label key={'l_' + fieldName} className="label">
                  {label}
                </label>
                <div className="control">
                  <input
                    key={'i_' + fieldName}
                    className="input"
                    type="text"
                    placeholder={label}
                    onChange={(e) => {
                      this.onChange(e, fieldName)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="add-modal-btns">
          <div style={{ marginRight: 60 }}>
            <Button variant="outlined" onClick={this.props.closeAddStudent}>
              Cancel
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => this.props.onSubmit(e, this)}>
              Add
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddStudentManual
