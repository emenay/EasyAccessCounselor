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
const style_college = { marginTop: '5px', marginRight: '5px' }

export default function Classification_table() {
  const [p1_1, set1_1] = useState([])
  const [p1_2, set1_2] = useState([
    {
      college_name: 'University of North Carolina at Chapel hill',
      from: 'student',
    },
  ])
  const [p1_3, set1_3] = useState([
    {
      college_name: 'University of North Carolina at Chapel hill',
      from: 'student',
    },
  ])
  const [p2_1, set2_1] = useState([
    { college_name: 'Stanford University', from: 'student' },
  ])
  const [p2_2, set2_2] = useState([
    { college_name: 'Harvard University', from: 'student' },
  ])
  const [p2_3, set2_3] = useState([
    { college_name: 'NC State University', from: 'student' },
  ])
  const [p3_1, set3_1] = useState([
    { college_name: 'Duke University', from: 'student' },
  ])
  const [p3_2, set3_2] = useState([])
  const [p3_3, set3_3] = useState([])
  const addRows = (selected) => {
    selected.forEach((obj) => {
      obj.from = 'counselor'
    })
    let temp = [...p1_1]
    selected.forEach((col) => {
      if (!temp.includes(col)) {
        temp.push(col)
      }
    })
    set1_1([...temp])
  }

  return (
    <div>
      <Search_college addRows={addRows} />
      <Table>
        <thead>
          <tr>
            <th>college list</th>
            <th>
              <Chip label="student selected colleges" color="primary" />
            </th>
            <th>
              <Chip label="counselor selected colleges" color="success" />
            </th>
          </tr>
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
                {p1_1.map((university, idx) => (
                  <Chip
                    key={idx + '1.1'}
                    style={style_college}
                    label={university.college_name}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
              <TableCell>
                {p1_2.map((university, idx) => (
                  <Chip
                    key={idx + '1.2'}
                    style={style_college}
                    label={university.college_name}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
              <TableCell>
                {p1_3.map((university, idx) => (
                  <Chip
                    key={idx + '1.3'}
                    style={style_college}
                    label={university.college_name}
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
                {p2_1.map((university, idx) => (
                  <Chip
                    key={idx + '2.1'}
                    style={style_college}
                    label={university.college_name}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
              <TableCell>
                {p2_2.map((university, idx) => (
                  <Chip
                    key={idx + '2.2'}
                    style={style_college}
                    label={university.college_name}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
              <TableCell>
                {p2_3.map((university, idx) => (
                  <Chip
                    key={idx + '2.3'}
                    style={style_college}
                    label={university.college_name}
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
                {p3_1.map((university, idx) => (
                  <Chip
                    key={idx + '3.1'}
                    style={style_college}
                    label={university.college_name}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
              <TableCell>
                {p3_2.map((university, idx) => (
                  <Chip
                    key={idx + '3.2'}
                    style={style_college}
                    label={university.college_name}
                    color={
                      university.from == 'counselor' ? 'primary' : 'success'
                    }
                  />
                ))}
              </TableCell>
              <TableCell>
                {p3_3.map((university, idx) => (
                  <Chip
                    key={idx + '3.3'}
                    style={style_college}
                    label={university.college_name}
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
