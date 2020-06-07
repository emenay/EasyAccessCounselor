import React, { useContext } from 'react';
import { UserContext } from "../../providers/UserProvider";

import '../../css/components.css';

import AddStudentManual from './AddStudentManual';
import AddStudentSpreadsheet from './AddStudentSpreadsheet';

import { db } from '../../firebase/firebase';

// This modal will have two options: add a single student manually or import a spreadsheet.

class AddStudentsModal extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      view: <AddStudentManual closeAddStudent={this.props.closeAddStudent} onSubmit={this.onSubmit}/>,
      data: null
    }
  }

  changeView = (event) => {
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
      case 'add_manually': currentComponent.setState(
        { view: <AddStudentManual closeAddStudent={this.props.closeAddStudent} onSubmit={this.onSubmit} /> }
        )
        break;
      case 'import_spreadsheet': currentComponent.setState(
        { view: <AddStudentSpreadsheet closeAddStudent={this.props.closeAddStudent} onSubmit={this.onSubmit} /> }
        )
        break;
      default: 
        console.log("here");
    }
  }

  onSubmit(e, child) {
    child.state.cuid = this.props.cuid;
    const newStudent = db.collection('students').doc();
    const uid = newStudent.id;
    child.state.uid = uid;

    this.setState({
      data: child.state
    }, () => {
      newStudent.set(this.state.data).catch(console.error);
      this.props.closeAddStudent();
      // TODO: Replace the page reload with a loading animation and update components as needed.
      window.location.reload();
    });
  }

  render() {
    return (
      <div>
        <div className="blackout" />
        <div className="add-students-modal">
          <p className="modal-header">Add Students</p>
          <div className="tabs is-centered" id="tabs">
            <ul id="navigation">
              <li className="btn is-active" id="manual" onClick={this.changeView}><a id="add_manually" className="navbar-item tab">Add Manually</a></li>
              <li className="btn" id="import" onClick={this.changeView}><a id="import_spreadsheet" className="navbar-item tab">Import Spreadsheet</a></li>
            </ul>
          </div>
          <div className="add-students-view">
            {this.state.view}
          </div>
        </div>
      </div>
    )
  }

}

export default AddStudentsModal;