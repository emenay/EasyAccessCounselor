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

  handleClick = (event) => {
    event.persist()
    let currentComponent = this;

    // switches active state of tabs
    let navNodes = document.getElementById("navigation").childNodes
    navNodes.forEach(e => {
      if (e.className.includes('is-active'))
        e.classList.remove('is-active')
    })
    event.target.parentElement.classList.add('is-active')

    switch (event.target.id) {
      case 'add_manually': currentComponent.setState({ view: <AddStudentManual /> })
        break;
      case 'import_spreadsheet': currentComponent.setState({ view: <AddStudentSpreadsheet /> })
        break;
      default: 
        console.log("here");
    }
  }

  temp() {
    alert("This will eventually submit the changes to the database. Right now, it just shows this alert.");
  }

  render() {
    return (
      <div>
        <div className="blackout" />
        <div className="add-students-modal">
          <p className="modal-header">Add Students</p>
          <div className="tabs is-centered" id="tabs">
            <ul id="navigation">
              <li className="btn is-active" id="manual" onClick={this.handleClick}><a id="add_manually" className="navbar-item tab">Add Manually</a></li>
              <li className="btn" id="import" onClick={this.handleClick}><a id="import_spreadsheet" className="navbar-item tab">Import Spreadsheet</a></li>
            </ul>
          </div>
          <div className="add-students-view">
            {this.state.view}
          </div>
          <div className="add-modal-btns">
            <div style={{marginRight: 60}}>
              <Button variant="outlined" onClick={this.props.closeAddStudent}>
                Cancel
              </Button>
            </div>
            <div>
              <Button variant="contained" color="primary" onClick={this.temp}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default AddStudentsModal;