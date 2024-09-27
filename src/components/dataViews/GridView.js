import React, { useState, useContext, useEffect } from 'react'
import { db } from '../../firebase/firebase'
import Select from 'react-select'
import unflagged from '../../assets/essentials_icons/svg/flag-3.svg'
import orange_flag from '../../assets/essentials_filled/svg/flag-3-filled.svg'
import green_flag from '../../assets/essentials_filled/svg/flag-3-filled-green.svg'
import purple_flag from '../../assets/essentials_filled/svg/flag-3-filled-purple.svg'
import edit_symbol from '../../assets/essentials_icons/svg/edit.svg'
import minus_symbol from '../../assets/essentials_icons/svg/minus.svg'

function generateField(name, dataField) {
  if (dataField === null || typeof dataField === 'undefined') {
    return name
  }
  return name + dataField
}

var fields = {
  uid: 'Unique ID',
  dob: 'Date of Birth',
  ethnicity: 'Ethnicity',
  gender: 'Gender',
  schools: 'Schools',
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
  major: 'Major',
  major2: 'Major 2',
  safetyColleges: 'Safety Colleges',
  targetColleges: 'Target Colleges',
  reachColleges: 'Reach Colleges',
  additions: 'Counselor Notes',
  region: 'Want to Attend (Region)',
  collegeSize: 'College Size',
  collegeSetting: 'College Setting',
  collegeDiversity: 'College Diversity (% URM)',
  collegeDiversityTypes: 'College Diversity (Types)',
  religion: 'Religion',
  rotc: 'Military/ROTC',
  athletics: 'Athletics',
}

// Helper function that is meant to return any fields available in the student object that are not in the
// users preferences for show fields
function findEltinArr(arr, elt) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === elt) return i
  }

  return -1
}

export function GridView(props) {
  const [chosenFields, setChosenFields] = useState(false) // keeps track of what fields user wants to see

  useEffect(() => {
    getFieldsShownData()
  }, []) // Basically, on render pull field preferences from database

  const getFieldsShownData = () => {
    db.collection('student_counselors')
      .doc(props.cohort)
      .get()
      .then((resp) => {
        if (resp.data().fieldsShown) {
          setChosenFields(resp.data().fieldsShown)
        } else {
          /*
          If it's the user's first time in Grid view, set their preferences to schools, major,
          gpa, sat, and act
          */
          let defaultFields = ['schools', 'major', 'gpa', 'sat', 'act']

          // update database
          db.collection('student_counselors').doc(props.cohort).update({
            fieldsShown: defaultFields,
          })

          setChosenFields(defaultFields) // update state
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // uses a static list of all fields to find the options for choosing different field preferences
  const getFieldOptions = () => {
    let optionsKeys = Object.keys(fields)

    for (var i = 0; i < chosenFields.length; i++) {
      if (optionsKeys.includes(chosenFields[i])) {
        optionsKeys.splice(findEltinArr(optionsKeys, chosenFields[i]), 1)
      }
    }

    let options = []

    for (var i = 0; i < optionsKeys.length; i++) {
      options[i] = { value: optionsKeys[i], label: fields[optionsKeys[i]] }
    }

    return options
  }

  // helper for chossing a field option from the dropdown list
  const dropdownToggle = (selectedOption) => {
    let editedFields = []
    var i

    for (i = 0; i < chosenFields.length; i++) {
      editedFields[i] = chosenFields[i]
    }

    editedFields.push(selectedOption.value)

    // updates the database
    db.collection('student_counselors').doc(props.cohort).update({
      fieldsShown: editedFields,
    })

    setChosenFields(editedFields) // updates state
  }

  // All of the "minusToggle" functions help to remove a specific field from the preferences
  // Not the best way to implement this, should be simplified
  const minusToggle1 = () => {
    let reducedFields = []
    var i,
      j = 0

    for (i = 1; i < chosenFields.length; i++) {
      reducedFields[j] = chosenFields[i]
      j++
    }

    // updates database
    db.collection('student_counselors').doc(props.cohort).update({
      fieldsShown: reducedFields,
    })

    setChosenFields(reducedFields) // update state
  }

  const minusToggle2 = () => {
    let reducedFields = []
    var i,
      j = 0

    for (i = 0; i < chosenFields.length; i++) {
      if (i != 1) {
        reducedFields[j] = chosenFields[i]
        j++
      }
    }

    // updates database
    db.collection('student_counselors').doc(props.cohort).update({
      fieldsShown: reducedFields,
    })

    setChosenFields(reducedFields) // update state
  }

  const minusToggle3 = () => {
    let reducedFields = []
    var i,
      j = 0

    for (i = 0; i < chosenFields.length; i++) {
      if (i != 2) {
        reducedFields[j] = chosenFields[i]
        j++
      }
    }

    // updates database
    db.collection('student_counselors').doc(props.cohort).update({
      fieldsShown: reducedFields,
    })

    setChosenFields(reducedFields) // update state
  }

  const minusToggle4 = () => {
    let reducedFields = []
    var i,
      j = 0

    for (i = 0; i < chosenFields.length; i++) {
      if (i != 3) {
        reducedFields[j] = chosenFields[i]
        j++
      }
    }

    // updates database
    db.collection('student_counselors').doc(props.cohort).update({
      fieldsShown: reducedFields,
    })

    setChosenFields(reducedFields) // update state
  }

  const minusToggle5 = () => {
    let reducedFields = []
    var i,
      j = 0

    for (i = 0; i < chosenFields.length - 1; i++) {
      reducedFields[j] = chosenFields[i]
      j++
    }

    // updates database
    db.collection('student_counselors').doc(props.cohort).update({
      fieldsShown: reducedFields,
    })

    setChosenFields(reducedFields) // update state
  }

  // renders flag based on flagset
  const renderFlag = (id) => {
    if (props.flags.has(id)) {
      return orange_flag
    } else if (props.flagsGreen.has(id)) {
      return green_flag
    } else if (props.flagsPurp.has(id)) {
      return purple_flag
    } else {
      return unflagged
    }
  }

  // render fields shown in grid view
  // this is a very poor implementation, should be simplified if able
  // renders fields when not in edit mode
  if (!props.inEditMode) {
    if (chosenFields.length == 5) {
      return (
        <div id="grid">
          {props.data.map((person) => (
            <div
              className="card"
              key={person.uid}
              onClick={() => props.clickCard(person)}>
              <div className="scard-content">
                <p className="scard-detail" id="cardContent"></p>
                <p className="card-title scard-detail">
                  {(person.firstName !== undefined
                    ? person.firstName + ' '
                    : '') +
                    (person.lastName !== undefined
                      ? person.lastName + ' '
                      : '')}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[0]] + ': ',
                    person[chosenFields[0]]
                  )}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[1]] + ': ',
                    person[chosenFields[1]]
                  )}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[2]] + ': ',
                    person[chosenFields[2]]
                  )}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[3]] + ': ',
                    person[chosenFields[3]]
                  )}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[4]] + ': ',
                    person[chosenFields[4]]
                  )}
                </p>
                <img
                  src={renderFlag(person.uid)}
                  onClick={(e) => {
                    props.clickFlag(person.uid)
                    e.stopPropagation()
                  }}
                  className="flag"
                  alt="Flag"
                />
                <img
                  src={edit_symbol}
                  onClick={(e) => {
                    props.editToggle()
                    e.stopPropagation()
                  }}
                  className="edit"
                  alt="Edit"
                />
              </div>
            </div>
          ))}
        </div>
      )
    } else if (chosenFields.length == 4) {
      return (
        <div id="grid">
          {props.data.map((person) => (
            <div
              className="card"
              key={person.uid}
              onClick={() => props.clickCard(person)}>
              <div className="scard-content">
                <p className="scard-detail" id="cardContent"></p>
                <p className="card-title scard-detail">
                  {(person.firstName !== undefined
                    ? person.firstName + ' '
                    : '') +
                    (person.lastName !== undefined
                      ? person.lastName + ' '
                      : '')}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[0]] + ': ',
                    person[chosenFields[0]]
                  )}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[1]] + ': ',
                    person[chosenFields[1]]
                  )}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[2]] + ': ',
                    person[chosenFields[2]]
                  )}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[3]] + ': ',
                    person[chosenFields[3]]
                  )}
                </p>
                <img
                  src={renderFlag(person.uid)}
                  onClick={(e) => {
                    props.clickFlag(person.uid)
                    e.stopPropagation()
                  }}
                  className="flag"
                  alt="Flag"
                />
                <img
                  src={edit_symbol}
                  onClick={(e) => {
                    props.editToggle()
                    e.stopPropagation()
                  }}
                  className="edit"
                  alt="Edit"
                />
              </div>
            </div>
          ))}
        </div>
      )
    } else if (chosenFields.length == 3) {
      return (
        <div id="grid">
          {props.data.map((person) => (
            <div
              className="card"
              key={person.uid}
              onClick={() => props.clickCard(person)}>
              <div className="scard-content">
                <p className="scard-detail" id="cardContent"></p>
                <p className="card-title scard-detail">
                  {(person.firstName !== undefined
                    ? person.firstName + ' '
                    : '') +
                    (person.lastName !== undefined
                      ? person.lastName + ' '
                      : '')}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[0]] + ': ',
                    person[chosenFields[0]]
                  )}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[1]] + ': ',
                    person[chosenFields[1]]
                  )}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[2]] + ': ',
                    person[chosenFields[2]]
                  )}
                </p>
                <img
                  src={renderFlag(person.uid)}
                  onClick={(e) => {
                    props.clickFlag(person.uid)
                    e.stopPropagation()
                  }}
                  className="flag"
                  alt="Flag"
                />
                <img
                  src={edit_symbol}
                  onClick={(e) => {
                    props.editToggle()
                    e.stopPropagation()
                  }}
                  className="edit"
                  alt="Edit"
                />
              </div>
            </div>
          ))}
        </div>
      )
    } else if (chosenFields.length == 2) {
      return (
        <div id="grid">
          {props.data.map((person) => (
            <div
              className="card"
              key={person.uid}
              onClick={() => props.clickCard(person)}>
              <div className="scard-content">
                <p className="scard-detail" id="cardContent"></p>
                <p className="card-title scard-detail">
                  {(person.firstName !== undefined
                    ? person.firstName + ' '
                    : '') +
                    (person.lastName !== undefined
                      ? person.lastName + ' '
                      : '')}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[0]] + ': ',
                    person[chosenFields[0]]
                  )}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[1]] + ': ',
                    person[chosenFields[1]]
                  )}
                </p>
                <img
                  src={renderFlag(person.uid)}
                  onClick={(e) => {
                    props.clickFlag(person.uid)
                    e.stopPropagation()
                  }}
                  className="flag"
                  alt="Flag"
                />
                <img
                  src={edit_symbol}
                  onClick={(e) => {
                    props.editToggle()
                    e.stopPropagation()
                  }}
                  className="edit"
                  alt="Edit"
                />
              </div>
            </div>
          ))}
        </div>
      )
    } else if (chosenFields.length == 1) {
      return (
        <div id="grid">
          {props.data.map((person) => (
            <div
              className="card"
              key={person.uid}
              onClick={() => props.clickCard(person)}>
              <div className="scard-content">
                <p className="scard-detail" id="cardContent"></p>
                <p className="card-title scard-detail">
                  {(person.firstName !== undefined
                    ? person.firstName + ' '
                    : '') +
                    (person.lastName !== undefined
                      ? person.lastName + ' '
                      : '')}
                </p>
                <p className="scard-detail">
                  {generateField(
                    fields[chosenFields[0]] + ': ',
                    person[chosenFields[0]]
                  )}
                </p>
                <img
                  src={renderFlag(person.uid)}
                  onClick={(e) => {
                    props.clickFlag(person.uid)
                    e.stopPropagation()
                  }}
                  className="flag"
                  alt="Flag"
                />
                <img
                  src={edit_symbol}
                  onClick={(e) => {
                    props.editToggle()
                    e.stopPropagation()
                  }}
                  className="edit"
                  alt="Edit"
                />
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div id="grid">
          {props.data.map((person) => (
            <div
              className="card"
              key={person.uid}
              onClick={() => props.clickCard(person)}>
              <div className="scard-content">
                <p className="scard-detail" id="cardContent"></p>
                <p className="card-title scard-detail">
                  {(person.firstName !== undefined
                    ? person.firstName + ' '
                    : '') +
                    (person.lastName !== undefined
                      ? person.lastName + ' '
                      : '')}
                </p>
                <img
                  src={renderFlag(person.uid)}
                  onClick={(e) => {
                    props.clickFlag(person.uid)
                    e.stopPropagation()
                  }}
                  className="flag"
                  alt="Flag"
                />
                <img
                  src={edit_symbol}
                  onClick={(e) => {
                    props.editToggle()
                    e.stopPropagation()
                  }}
                  className="edit"
                  alt="Edit"
                />
              </div>
            </div>
          ))}
        </div>
      )
    }
  } else {
    // renders fields if in edit mode
    if (chosenFields.length == 5) {
      return (
        <div id="grid">
          {props.data.map((person) => (
            <div className="card" key={person.uid}>
              <div className="scard-content">
                <p className="card-title scard-detail">
                  {(person.firstName !== undefined
                    ? person.firstName + ' '
                    : '') +
                    (person.lastName !== undefined
                      ? person.lastName + ' '
                      : '')}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle1()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[0]] + ': ',
                    person[chosenFields[0]]
                  )}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle2()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[1]] + ': ',
                    person[chosenFields[1]]
                  )}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle3()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[2]] + ': ',
                    person[chosenFields[2]]
                  )}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle4()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[3]] + ': ',
                    person[chosenFields[3]]
                  )}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle5()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[4]] + ': ',
                    person[chosenFields[4]]
                  )}
                </p>
                <img
                  src={renderFlag(person.uid)}
                  onClick={(e) => {
                    props.clickFlag(person.uid)
                    e.stopPropagation()
                  }}
                  className="flag"
                  alt="Flag"
                />
                <button
                  className="saveField"
                  onClick={(e) => {
                    props.editToggle()
                    e.stopPropagation()
                  }}>
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )
    } else if (chosenFields.length == 4) {
      return (
        <div id="grid">
          {props.data.map((person) => (
            <div className="card" key={person.uid}>
              <div className="scard-content">
                <p className="card-title scard-detail">
                  {(person.firstName !== undefined
                    ? person.firstName + ' '
                    : '') +
                    (person.lastName !== undefined
                      ? person.lastName + ' '
                      : '')}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle1()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[0]] + ': ',
                    person[chosenFields[0]]
                  )}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle2()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[1]] + ': ',
                    person[chosenFields[1]]
                  )}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle3()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[2]] + ': ',
                    person[chosenFields[2]]
                  )}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle4()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[3]] + ': ',
                    person[chosenFields[3]]
                  )}
                </p>
                <img
                  src={renderFlag(person.uid)}
                  onClick={(e) => {
                    props.clickFlag(person.uid)
                    e.stopPropagation()
                  }}
                  className="flag"
                  alt="Flag"
                />
                <div className="scard-edit-buttons">
                  <button
                    className="saveField"
                    onClick={(e) => {
                      props.editToggle()
                      e.stopPropagation()
                    }}>
                    Save
                  </button>
                  <Select
                    className="scard-edit"
                    options={getFieldOptions()}
                    onChange={dropdownToggle}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    } else if (chosenFields.length == 3) {
      return (
        <div id="grid">
          {props.data.map((person) => (
            <div className="card" key={person.uid}>
              <div className="scard-content">
                <p className="card-title scard-detail">
                  {(person.firstName !== undefined
                    ? person.firstName + ' '
                    : '') +
                    (person.lastName !== undefined
                      ? person.lastName + ' '
                      : '')}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle1()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[0]] + ': ',
                    person[chosenFields[0]]
                  )}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle2()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[1]] + ': ',
                    person[chosenFields[1]]
                  )}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle3()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[2]] + ': ',
                    person[chosenFields[2]]
                  )}
                </p>
                <img
                  src={renderFlag(person.uid)}
                  onClick={(e) => {
                    props.clickFlag(person.uid)
                    e.stopPropagation()
                  }}
                  className="flag"
                  alt="Flag"
                />
                <div className="scard-edit-buttons">
                  <button
                    className="saveField"
                    onClick={(e) => {
                      props.editToggle()
                      e.stopPropagation()
                    }}>
                    Save
                  </button>
                  <Select
                    className="scard-edit"
                    options={getFieldOptions()}
                    onChange={dropdownToggle}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    } else if (chosenFields.length == 2) {
      return (
        <div id="grid">
          {props.data.map((person) => (
            <div className="card" key={person.uid}>
              <div className="scard-content">
                <p className="card-title scard-detail">
                  {(person.firstName !== undefined
                    ? person.firstName + ' '
                    : '') +
                    (person.lastName !== undefined
                      ? person.lastName + ' '
                      : '')}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle1()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[0]] + ': ',
                    person[chosenFields[0]]
                  )}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle2()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[1]] + ': ',
                    person[chosenFields[1]]
                  )}
                </p>
                <img
                  src={renderFlag(person.uid)}
                  onClick={(e) => {
                    props.clickFlag(person.uid)
                    e.stopPropagation()
                  }}
                  className="flag"
                  alt="Flag"
                />
                <div className="scard-edit-buttons">
                  <button
                    className="saveField"
                    onClick={(e) => {
                      props.editToggle()
                      e.stopPropagation()
                    }}>
                    Save
                  </button>
                  <Select
                    className="scard-edit"
                    options={getFieldOptions()}
                    onChange={dropdownToggle}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    } else if (chosenFields.length == 1) {
      return (
        <div id="grid">
          {props.data.map((person) => (
            <div className="card" key={person.uid}>
              <div className="scard-content">
                <p className="card-title scard-detail">
                  {(person.firstName !== undefined
                    ? person.firstName + ' '
                    : '') +
                    (person.lastName !== undefined
                      ? person.lastName + ' '
                      : '')}
                </p>
                <img
                  src={minus_symbol}
                  className="minus"
                  onClick={(e) => {
                    minusToggle1()
                    e.stopPropagation()
                  }}
                />
                <p className="scard-detail-edit">
                  {generateField(
                    fields[chosenFields[0]] + ': ',
                    person[chosenFields[0]]
                  )}
                </p>
                <img
                  src={renderFlag(person.uid)}
                  onClick={(e) => {
                    props.clickFlag(person.uid)
                    e.stopPropagation()
                  }}
                  className="flag"
                  alt="Flag"
                />
                <div className="scard-edit-buttons">
                  <button
                    className="saveField"
                    onClick={(e) => {
                      props.editToggle()
                      e.stopPropagation()
                    }}>
                    Save
                  </button>
                  <Select
                    className="scard-edit"
                    options={getFieldOptions()}
                    onChange={dropdownToggle}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div id="grid">
          {props.data.map((person) => (
            <div className="card" key={person.uid}>
              <div className="scard-content">
                <p className="card-title scard-detail">
                  {(person.firstName !== undefined
                    ? person.firstName + ' '
                    : '') +
                    (person.lastName !== undefined
                      ? person.lastName + ' '
                      : '')}
                </p>
                <img
                  src={renderFlag(person.uid)}
                  onClick={(e) => {
                    props.clickFlag(person.uid)
                    e.stopPropagation()
                  }}
                  className="flag"
                  alt="Flag"
                />
                <div className="scard-edit-buttons">
                  <button
                    className="saveField"
                    onClick={(e) => {
                      props.editToggle()
                      e.stopPropagation()
                    }}>
                    Save
                  </button>
                  <Select
                    className="scard-edit"
                    options={getFieldOptions()}
                    onChange={dropdownToggle}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    }
  }
}
