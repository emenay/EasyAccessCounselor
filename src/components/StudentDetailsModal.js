import React, { useState, useContext, useEffect, useReducer } from 'react'
import edit_symbol from '../assets/essentials_icons/svg/edit.svg'
import plus_symbol from '../assets/essentials_icons/svg/plus.svg'
import minus_symbol from '../assets/essentials_icons/svg/minus.svg'
import profile_avatar from '../assets/profile_avatar.png'
import orange_flag from '../assets/orange_flag.png'
import { db } from '../firebase/firebase'
import firebase from 'firebase/app'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import $ from 'jquery'
import '../css/CollegeListPage.css'
import axios from 'axios'

import NotesPanel from './notes/NotesPanel'
import CollegeListPanel from './collegeList/CollegeListPanel'
import ApplicationProcessPanel from './applicationProcess/ApplicationProcessPanel'

// helper component to allow for editing of different tabs
function InputFieldElement(props) {
  // return(<p>
  //     <span>{props.field}: </span>
  //     {props.editing===true ? <input type="text" defaultValue={props.info} onChange={(e) => props.updateValue(e,props.dbField)} />:props.info}
  //     </p>);
  // return(<p>
  //     <span> {props.field}: </span>
  //     {props.editing===true
  //         ? <input type="text" defaultValue={props.info} onChange={(e) => props.updateValue(e,props.dbField)} />:

  //         props.info === undefined || props.info === ""
  //             ? <text>{props.info }</text> :
  //         <text class = "fieldElement" style = {x}>{props.info}</text>}
  //     </p>);

  // let studentfield = db.collection("student_counselors").doc(props.)

  return (
    <tbody>
      <tr className="inputFieldElement" id={props.dbField}>
        <td>
          {/* If the user is in edit mode, display button to remove this field element */}
          {props.editing === true && (
            <button onClick={() => hide(props.dbField)}>
              <img src={minus_symbol} />
            </button>
          )}
        </td>
        <td>{props.name}</td>

        <td>
          <p key={props.info}>
            <span>{props.field} </span>
            {props.editing === true ? (
              <input
                type="text"
                defaultValue={props.info}
                onChange={(e) => props.updateValue(e, props.dbField)}
              />
            ) : props.info === undefined || props.info === '' ? (
              <text>{props.info}</text>
            ) : (
              <text class="fieldElement">{props.info}</text>
            )}
          </p>
        </td>
        <td>
          <input type="checkbox" />
        </td>
        <td></td>
        <td>
          {props.studentinfo === undefined || props.studentinfo === '' ? (
            <text>{props.studentinfo}</text>
          ) : (
            <text class="fieldElement">{props.studentinfo}</text>
          )}
        </td>
      </tr>
    </tbody>
  )
}

function hide(id) {
  $('#' + id).hide()
}

// Helper parent component to contain buttons to display in editing mode
function EditButton(props) {
  return (
    <div className="editButtonSuite">
      <div className="saveCancelContainer">
        <button
          className="save"
          onClick={() => {
            props.editExit(false, true)
          }}>
          Save Changes
        </button>
        <button
          className="cancel"
          onClick={() => {
            props.editExit(false, false)
          }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

// Helper component to accomodate for call to database
function HandleEdit(props) {
  return (
    <div className="editSuite" style={{ width: '250px', height: '40px' }}>
      {props.editing === true ? (
        <EditButton editExit={props.setEdit} info={props.info} />
      ) : (
        <ToggleEditButton setEdit={props.setEdit} />
      )}
    </div>
  )
}

function ProcessPanelElement(props) {
  return (
    <p>
      <span>{props.field}: </span>
      {props.editing === true ? (
        <input
          type="text"
          defaultValue={props.info}
          onChange={(e) => props.updateValue(e, props.dbField)}
        />
      ) : (
        props.info
      )}
    </p>
  )
}

// Generate the card information depending on editing or not
function GenInfoCol(props) {
  console.log(props.info)
  let col = []
  for (let i = 0; i < props.fields.length; i++) {
    const processedField = processField(props.fields[i])
    if (processedField)
      col.push(
        <ModalFieldElement
          key={'something_' + i}
          editing={props.editing}
          removeFromPreferences={props.removeFromPreferences}
          field={processedField}
          info={props.info[props.fields[i]]}
          dbField={props.fields[i]}
          updateValue={props.updateValue}
        />
      )
  }

  return (
    <div className="fieldsSection">
      {col}
      {/* Only show the following element if the user is in edit mode and in the process of
            adding a field */}
      {props.editing && props.addedFields && (
        <AddFieldElt
          addNewPreferences={props.addNewPreferences}
          addedFields={props.addedFields}
          setAddedFields={props.setAddedFields}
          fields={props.fields}
          info={props.info}
        />
      )}
    </div>
  )
}

// component for minus button + input text that shows when pressing edit button
function ModalFieldElement(props) {
  return (
    <div className="modalFieldElement" id={props.dbField}>
      {/* If the user is in edit mode, display button to remove this field element */}
      {props.editing === true && (
        <button onClick={() => props.removeFromPreferences(props.dbField)}>
          <img src={minus_symbol} />
        </button>
      )}

      <p key={props.info}>
        <span>{props.field}: </span>
        {props.editing === true ? (
          <input
            type="text"
            defaultValue={props.info}
            onChange={(e) => props.updateValue(e, props.dbField)}
          />
        ) : (
          props.info
        )}
      </p>
    </div>
  )
}

// Element consisting of dropdown selection to allow user to add hidden fields back to
// student profile card
function AddFieldElt(props) {
  const [dropdownSelected, setDropdownSelected] = useState(false)

  // User should only have the option to add fields that aren't already shown
  const totalOptions = Object.keys(props.info)
  const shownOptions = getNonVisibleOptions(totalOptions, props.fields)

  const handleChange = (selectedOption) => {
    setDropdownSelected(selectedOption.value)
    props.addNewPreferences(selectedOption.value)
    props.setAddedFields(false)
  }

  /*
    NOTE: The logic here is redundant as this element should no longer be displayed as soon as the
    user selects an option
    */
  return (
    <div className="addFieldElt">
      <div className="dropdownContainer">
        <Select options={shownOptions} onChange={handleChange} />
      </div>
      <span>:</span>
      {dropdownSelected ? <p>{props.info[dropdownSelected]}</p> : <p>. . .</p>}
    </div>
  )
}

// Helper function that is meant to return any fields available in the student object that are not in the
// users preferences for show fields
function getNonVisibleOptions(totalOptions, visibleOptions) {
  let nonVisibleOptions = []
  for (let i = 0; i < totalOptions.length; i++) {
    const processedField = processField(totalOptions[i])
    if (
      findEltinArr(visibleOptions, totalOptions[i]) === -1 &&
      processedField
    ) {
      const option = { value: totalOptions[i], label: processedField }
      nonVisibleOptions.push(option)
    }
  }

  return nonVisibleOptions
}

// Helper parent component to contain buttons to display in editing mode
function EditButtonSuite(props) {
  const nonVisibleOptions = getNonVisibleOptions(
    Object.keys(props.info),
    props.fields
  )
  const availableOptions = nonVisibleOptions.length > 0

  return (
    <div className="editButtonSuite">
      {/* We want to disable the ability to add a field if there are no more fields to add (!availableOptions)
        or the user is already in the process of adding a field (props.addedFields) */}
      {props.addedFields || !availableOptions ? (
        <div>
          <button
            data-tip="Finish adding your other element first!"
            className="disabledAddFieldButton">
            <img src={plus_symbol} />
            Add Item
          </button>
          <ReactTooltip place="top" type="dark" effect="solid" />
        </div>
      ) : (
        <button
          className="addFieldButton"
          onClick={() => {
            props.setAddedFields(true)
          }}>
          <img src={plus_symbol} />
          Add Item
        </button>
      )}
      <div className="saveCancelContainer">
        <button
          className="save"
          onClick={() => {
            props.setAddedFields(false)
            props.editExit(false, true)
          }}>
          Save Changes
        </button>
        <button
          className="cancel"
          onClick={() => {
            props.setAddedFields(false)
            props.editExit(false, false)
          }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

// Helper component to accomodate for call to database
function HandleEditInit(props) {
  return (
    <div className="editSuite">
      {props.editing === true ? (
        <EditButtonSuite
          editExit={props.setEdit}
          info={props.info}
          fields={props.fieldsData}
          addedFields={props.addedFields}
          setAddedFields={props.setAddedFields}
        />
      ) : (
        <ToggleEditButtonInit
          setEdit={props.setEdit}
          addField={props.addField}
          submitAddedField={props.submitAddedField}
        />
      )}
    </div>
  )
}

// Simpler editbutton component for just editing
function ToggleEditButton(props) {
  return (
    <div>
      <button
        style={{ width: '50px', height: '50px' }}
        data-tip="Customize what fields are shown"
        className="studentdetails-editbutton"
        onClick={() => {
          props.setEdit(true)
        }}>
        <img src={edit_symbol} alt="edit" />
      </button>
      <ReactTooltip place="top" type="dark" effect="solid" />
      {props.editing != true && (
        <Popup
          trigger={
            <button
              className="button"
              data-tip="Add a custom field"
              className="studentdetails-editbutton">
              <img src={plus_symbol} alt="edit" />
            </button>
          }
          modal
          nested>
          {(close) => (
            <div className="popup-modal">
              <p>
                <span>Add New Field: </span>
                <input
                  type="text"
                  onChange={(e) => props.addToPreferences(e)}
                />
              </p>
              <div className="saveCancelContainer">
                <button
                  className="save"
                  onClick={() => {
                    close()
                  }}>
                  Add Field
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    console.log('modal closed ')
                    close()
                  }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Popup>
      )}
    </div>
  )
}

// More complex edit button component with add fields button next to it and popup code
function ToggleEditButtonInit(props) {
  return (
    <div className="card-buttons">
      <button
        data-tip="Customize what fields are shown"
        className="studentdetails-editbutton"
        onClick={() => {
          props.setEdit(true)
        }}>
        <img src={edit_symbol} alt="edit" />
      </button>
      <ReactTooltip place="top" type="dark" effect="solid" />
      {props.editing != true && (
        <Popup
          trigger={
            <button
              className="button"
              data-tip="Add a custom field"
              className="studentdetails-editbutton">
              <img src={plus_symbol} alt="edit" />
            </button>
          }
          modal
          nested>
          {(close) => (
            <div className="popup-modal">
              <p>
                <span>Add New Field: </span>
                <input type="text" onChange={(e) => props.addField(e)} />
              </p>
              <div className="saveCancelContainer">
                <button
                  className="save"
                  onClick={() => {
                    props.submitAddedField()
                    close()
                  }}>
                  Add Field
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    console.log('modal closed ')
                    close()
                  }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Popup>
      )}
    </div>
  )
}

// Just a poorly optimized helper function to find the index of an element in a given array, returns -1 if not found
function findEltinArr(arr, elt) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === elt) return i
  }

  return -1
}

/*
This function is more of a bandaid than a necessary function. It serves two purposes:
    1. Account for data in student objects that we know shouldn't be displayed in
       the general information tab
    2. Account for non user-friendly key names for default student data
*/
function processField(field) {
  // 1.
  if (
    field === 'uid' ||
    field === 'goal' ||
    field === 'notes' ||
    field === 'Date of Last Meeting'
  )
    return null

  // 2.
  const fieldSwap = {
    id: 'Unique ID',
    firstName: 'First Name',
    lastName: 'Last Name',
    dob: 'Date of Birth',
    ethnicity: 'Ethnicity',
    gender: 'Gender',
    gpa: 'GPA',
    classRank: 'Class Rank',
    sat: 'SAT',
    act: 'ACT',
    goal: 'Goal',
    studentEmail: 'Student Email',
    studentEmail2: 'Student Email 2',
    studentPhone: 'Student Phone',
    parentEmail: 'Parent Email',
    parentEmail2: 'Parent Email 2',
    parentPhone: 'Parent Phone',
    parentPhone2: 'Parent Phone 2',
    studentAddress: 'Student Address',
    totalMeetings: 'Total Meetings',
    individualMeetings: 'Individual Meetings',
    groupMeetings: 'Group Meetings',
    eventMeetings: 'Event Meetings',
    state: 'State',
    zipcode: 'Zipcode',
    efc: 'EFC',
    payMismatch: 'Ability to Pay Mismatch',
    major: 'Field of Study/Major 1',
    major2: 'Field of Study/Major 2',
    safetyColleges: 'Safety Colleges',
    targetColleges: 'Target Colleges',
    reachColleges: 'Reach Colleges',
    additions: 'Counselor Notes',
    region: 'Want to Attend (Region)',
    distanceFromHome: 'Distance From Home',
    collegeSize: 'College Size',
    collegeSetting: 'College Setting',
    collegeDiversity: 'College Diversity (% URM)',
    collegeDiversityTypes: 'College Diversity (Types)',
    collegeType: 'College Type',
    religion: 'Religion',
    rotc: 'Military/ROTC',
    athletics: 'Athletics',
  }

  if (field in fieldSwap) return fieldSwap[field]
  return field
}

// Dynamic panel for general info
function GeneralInformationPanel(props) {
  const [editing, changeEditing] = useState(false) // keeps track of whether user is in edit mode
  const [fieldsData, setFieldsData] = useState(false) // keeps track of what fields user wants to see
  const [addedFields, setAddedFields] = useState(false) // keeps track of whether user is in process of adding field
  const [editedFields, setEditedFields] = useState([]) // keeps track of changes made to existing field values
  const [newField, setNewField] = useState('')

  useEffect(() => {
    refreshWithDatabase()
  }, []) // Basically, on render pull field preferences from database

  const refreshWithDatabase = () => {
    db.collection('student_counselors')
      .doc(props.cohort)
      .get()
      .then((resp) => {
        if (resp.data().genInfoFields) {
          setFieldsData(resp.data().genInfoFields)
        } else {
          /*
                If it's the user's first time accessing a student profile card, set their preferences to any data that is
                available for the selected student
                */
          let kindaDefaultFields = Object.keys(props.info)

          // kindaDefaultFields.push('Counselor Notes')
          // console.log(kindaDefaultFields)

          // Remove uid from default fields
          if ('uid' in kindaDefaultFields)
            kindaDefaultFields.splice(
              findEltinArr(kindaDefaultFields, 'uid'),
              1
            )

          // Add Counselor Notes in a similar way above

          // update database
          // add Counselor Notes into Firebase here
          db.collection('student_counselors').doc(props.cohort).update({
            genInfoFields: kindaDefaultFields,
          })

          setFieldsData(kindaDefaultFields) // update state
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Function to change whether or not the user is in editing mode and whether or not
  // to save the changes they made. Save in this case means to update the database
  // with a new set of preferences for what fields are to be shown
  const setEdit = (editing, saveChanges = false) => {
    changeEditing(editing)

    if (saveChanges) {
      db.collection('student_counselors').doc(props.cohort).update({
        genInfoFields: fieldsData,
      })

      props.cardUpdate(props.info.uid, editedFields, props.info)

      setEditedFields([])

      // No need to refresh from DB if we just updated it with local data
    } else {
      refreshWithDatabase()
    }
  }

  // Helper function for the delete field feature
  const removeFromPreferences = (field) => {
    fieldsData.splice(findEltinArr(fieldsData, field), 1)
    let newFieldsData = [...fieldsData]
    setFieldsData(newFieldsData)
  }

  // Helper function for the add field feature
  const addToPreferences = (newField) => {
    let newFieldsData = [...fieldsData]
    newFieldsData.push(newField)
    setFieldsData(newFieldsData)
  }

  // Helper function for the edit field future
  const updateValue = (e, field) => {
    let newEditedField = [...editedFields]
    newEditedField.push({ [field]: e.target.value })
    setEditedFields(newEditedField)
  }

  // Helper function for add custom field feature
  const addField = (e) => {
    setNewField(e.target.value)
  }

  // Function to add custom field to database
  const submitAddedField = () => {
    if (newField != null && newField != '') {
      db.collection('student_counselors')
        .doc(props.cohort)
        .update({
          addedFields: firebase.firestore.FieldValue.arrayUnion(newField),
          genInfoFields: firebase.firestore.FieldValue.arrayUnion(newField),
          fieldVisPref: firebase.firestore.FieldValue.arrayUnion(newField),
        })
        .catch((error) => console.log(error))

      addToPreferences(newField)

      setNewField('')
    }
  }

  // Helper function to change whether or not the user is in the process of adding
  // a field.
  const changeAddedFields = (val) => {
    setAddedFields(val)
  }

  let info = props.info
  return (
    <div className="geninfo-panel">
      <div className="geninfo-row1">
        {' '}
        {/*This is a misleading classname should be updated here and in css*/}
        {fieldsData && (
          <GenInfoCol
            info={info}
            fields={fieldsData}
            editing={editing}
            removeFromPreferences={removeFromPreferences}
            setAddedFields={changeAddedFields}
            addedFields={addedFields}
            addNewPreferences={addToPreferences}
            updateValue={updateValue}
          />
        )}
        <div className="geninfo-col3">
          {' '}
          {/*This is a misleading classname should be updated here and in css*/}
          <img
            className="studentdetails-avatar"
            alt="avatar icon"
            src={profile_avatar}
          />
          <p>
            <span>Unique ID: </span>
            {info.id}
          </p>
          <p>
            <span>Name: </span>
            {info.firstName} {info.lastName}
          </p>
          {fieldsData && (
            <HandleEditInit
              info={info}
              setEdit={setEdit}
              editing={editing}
              fieldsData={fieldsData}
              setAddedFields={changeAddedFields}
              addedFields={addedFields}
              addNewPreferences={addToPreferences}
              addField={addField}
              submitAddedField={submitAddedField}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Component handles backround css, tab switching
// Info = person object
export default class StudentDetailsModal extends React.Component {
  constructor(props) {
    super(props)
    this.tabs = ['General', 'Notes', 'College List', 'Checklist']
    this.state = {
      selectedTab: 'General',
      selectedCohort: this.props.cohort,
    }

    db.collection('student_counselors').doc()
  }

  changeTab = (tab) => {
    this.setState({ selectedTab: tab })
  }

  whichPanel = (tab) => {
    switch (tab) {
      case 'General':
        return (
          <GeneralInformationPanel
            fields={this.state.fields}
            cohort={this.props.cohort}
            info={this.props.info}
            cardUpdate={this.props.cardUpdate}
          />
        )
      case 'Checklist':
        return (
          <ApplicationProcessPanel
            info={this.props.info}
            cardUpdate={this.props.cardUpdate}
            fields={this.state.fields}
            cohort={this.props.cohort}
          />
        )
      case 'Notes':
        return <NotesPanel info={this.props.info} />
      case 'College List':
        return (
          <CollegeListPanel
            fields={this.state.fields}
            cohort={this.props.cohort}
            info={this.props.info}
            studentinfo={this.props.studentinfo}
            cardUpdate={this.props.cardUpdate}
          />
        )
      default:
        return <p>Hello world</p>
    }
  }
  // Display of a specific tab is based on which is the current selectedTab
  render() {
    return (
      <div className="studentdetails-modal" onClick={this.props.exitModal}>
        <div
          className="studentdetails-background"
          onClick={(e) => e.stopPropagation()}>
          {this.tabs.map((name, index) => {
            return (
              <div
                style={{ left: index * 25.06666 + '%' }}
                className={
                  'studentdetails-tab' +
                  (this.state.selectedTab === name ? ' tab-selected' : '')
                }
                onClick={() => this.changeTab(name)}
                key={index}>
                <p className="tab-text">{name}</p>
              </div>
            )
          })}
          <div className="studentdetails-titleflag">
            <p className="studentdetails-title">
              {this.props.info.firstName + ' ' + this.props.info.lastName}
            </p>
            {this.props.flagged ? (
              <img
                className="studentdetails-flag"
                src={orange_flag}
                alt="flagged icon"
              />
            ) : null}
          </div>
          <div className="studentdetails-innerbackground" />
          <div
            className={
              'studentdetails-content' +
              (this.state.selectedTab === 'Notes' ? ' caseloadContents' : '')
            }>
            {this.whichPanel(this.state.selectedTab)}
          </div>
        </div>
      </div>
    )
  }
}
