import React, { useState } from 'react'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Search_college from './Search_college'
import getCollegeScores from './ClassificationHelper'
const style_college = { marginTop: '5px', marginRight: '5px' }

// this function calls the getCollegeScores() function from ClassificationHelper, which computes
// "safety" "reach" and "target" for selectivity
// "low" "medium" and "high" for affordability
// functions in ClassificationHelper are organized, to my best
// however its still in a very messy state (worse when we got it)
// if you are going to change anything, sorry for what you need to read but, we tried to clean it up
function sortSchools(schools, props) {
  let resultScores = []
  for (let i = 0; i < schools.length; i++) {
    resultScores.push(getCollegeScores(schools[i], props))
  }
  return resultScores
}

export default function Classification_table(props) {
  // Schools which are already there should be pulled from backend, studentInfo
  // but you will need to set up account for each student
  // Hopefully you are using the new backend now
  let schoolList
  if (!props.studentInfo == null && !props.studentInfo.schools == null) {
    schoolList = props.studentInfo.schools
    console.log('no schools are previously added')
  }
  // these are fake data for testing
  let schools = [
    {
      instnm: 'Harvard University',
      from: 'student',
      selectivity: 'reach',
      cost: 'high',
    },
    {
      instnm: 'NC State University',
      from: 'student',
      selectivity: 'safety',
      cost: 'low',
    },
  ]

  let a1_1 = []
  let a1_2 = []
  let a1_3 = []
  let a2_1 = []
  let a2_2 = []
  let a2_3 = []
  let a3_1 = []
  let a3_2 = []
  let a3_3 = []

  for (let i = 0; i < schools.length; i++) {
    if (schools[i].selectivity == 'safety') {
      if (schools[i].cost == 'low') {
        a1_1.push(schools[i])
      } else if (schools[i].cost == 'medium') {
        a2_1.push(schools[i])
      } else if (schools[i].cost == 'high') {
        a3_1.push(schools[i])
      }
    } else if (schools[i].selectivity == 'target') {
      if (schools[i].cost == 'low') {
        a1_2.push(schools[i])
      } else if (schools[i].cost == 'medium') {
        a2_2.push(schools[i])
      } else if (schools[i].cost == 'high') {
        a3_2.push(schools[i])
      }
    } else if (schools[i].selectivity == 'reach') {
      if (schools[i].cost == 'low') {
        a1_3.push(schools[i])
      } else if (schools[i].cost == 'medium') {
        a2_3.push(schools[i])
      } else if (schools[i].cost == 'high') {
        a3_3.push(schools[i])
      }
    }
  }

  // const [p1_1, set1_1] = useState(array1_1)
  // const [p1_2, set1_2] = useState(array1_2)
  // const [p1_3, set1_3] = useState(array1_3)
  // const [p2_1, set2_1] = useState(array2_1)
  // const [p2_2, set2_2] = useState(array2_2)
  // const [p2_3, set2_3] = useState(array2_3)
  // const [p3_1, set3_1] = useState(array3_1)
  // const [p3_2, set3_2] = useState(array3_2)
  // const [p3_3, set3_3] = useState(array3_3)

  const [dumb, setDumb] = useState(false)
  const [class_obj, setNothing] = useState({
    a1_1,
    a1_2,
    a1_3,
    a2_1,
    a2_2,
    a2_3,
    a3_1,
    a3_2,
    a3_3,
  })
  // class_obj["a1_1"].push()

  const addRows = (selected) => {
    selected.forEach((obj) => {
      obj.from = 'counselor'
    })

    let resultPosition = sortSchools(selected, props)
    // console.log("resultPosition")
    // console.log(resultPosition)
    console.log(selected.length)
    console.log(resultPosition.length)

    for (let i = 0; i < resultPosition.length; i++) {
      if (resultPosition[i].selectivityScore == 'safety') {
        if (resultPosition[i].affordabilityScore == 'low') {
          if (!class_obj['a1_1'].includes(selected[i])) {
            class_obj['a1_1'].push(selected[i])
          }
        } else if (resultPosition[i].affordabilityScore == 'medium') {
          if (!class_obj['a2_1'].includes(selected[i])) {
            class_obj['a2_1'].push(selected[i])
          }
        } else {
          if (!class_obj['a3_1'].includes(selected[i])) {
            class_obj['a3_1'].push(selected[i])
          }
        }
      } else if (resultPosition[i].selectivityScore == 'target') {
        if (resultPosition[i].affordabilityScore == 'low') {
          if (!class_obj['a1_2'].includes(selected[i])) {
            class_obj['a1_2'].push(selected[i])
          }
        } else if (resultPosition[i].affordabilityScore == 'medium') {
          if (!class_obj['a2_2'].includes(selected[i])) {
            class_obj['a2_2'].push(selected[i])
          }
        } else {
          if (!class_obj['a3_2'].includes(selected[i])) {
            class_obj['a3_2'].push(selected[i])
          }
        }
      } else if (resultPosition[i].selectivityScore == 'reach') {
        if (resultPosition[i].affordabilityScore == 'low') {
          if (!class_obj['a1_3'].includes(selected[i])) {
            class_obj['a1_3'].push(selected[i])
          }
        } else if (resultPosition[i].affordabilityScore == 'medium') {
          if (!class_obj['a2_3'].includes(selected[i])) {
            class_obj['a2_3'].push(selected[i])
          }
        } else {
          if (!class_obj['a3_3'].includes(selected[i])) {
            class_obj['a3_3'].push(selected[i])
          }
        }
      }
    }
    setDumb(!dumb)
    // TODO: The updated college list needs to be send back to the backend
  }

  return (
    <div>
      <Search_college addRows={addRows} />
      <Table>
        <thead>
          <tr>
            <th>college list</th>
            <th>
              <Chip label="student selected colleges" color="success" />
            </th>
            <th>
              <Chip label="counselor selected colleges" color="primary" />
            </th>
          </tr>
          <br />
        </thead>
      </Table>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Safety</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Reach</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={'$'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                $
              </TableCell>
              <TableCell>
                {class_obj['a1_1'].map((university, idx) => (
                  <Chip
                    key={idx + '1.1'}
                    style={style_college}
                    label={university.instnm}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
              <TableCell>
                {class_obj['a1_2'].map((university, idx) => (
                  <Chip
                    key={idx + '1.2'}
                    style={style_college}
                    label={university.instnm}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
              <TableCell>
                {class_obj['a1_3'].map((university, idx) => (
                  <Chip
                    key={idx + '1.3'}
                    style={style_college}
                    label={university.instnm}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
            </TableRow>
            <TableRow
              key={'$$'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                $$
              </TableCell>
              <TableCell>
                {class_obj['a2_1'].map((university, idx) => (
                  <Chip
                    key={idx + '2.1'}
                    style={style_college}
                    label={university.instnm}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
              <TableCell>
                {class_obj['a2_2'].map((university, idx) => (
                  <Chip
                    key={idx + '2.2'}
                    style={style_college}
                    label={university.instnm}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
              <TableCell>
                {class_obj['a2_3'].map((university, idx) => (
                  <Chip
                    key={idx + '2.3'}
                    style={style_college}
                    label={university.instnm}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
            </TableRow>
            <TableRow
              key={'$$$'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                $$$
              </TableCell>
              <TableCell>
                {class_obj['a3_1'].map((university, idx) => (
                  <Chip
                    key={idx + '3.1'}
                    style={style_college}
                    label={university.instnm}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
              <TableCell>
                {class_obj['a3_2'].map((university, idx) => (
                  <Chip
                    key={idx + '3.2'}
                    style={style_college}
                    label={university.instnm}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
              <TableCell>
                {class_obj['a3_3'].map((university, idx) => (
                  <Chip
                    key={idx + '3.3'}
                    style={style_college}
                    label={university.instnm}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
    </div>
  )
}
