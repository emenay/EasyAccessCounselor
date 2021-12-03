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


async function getColleges() {
  let base_url = "https://api.data.gov/ed/collegescorecard/v1/"
  let dataset = "schools.json?"
  let filter_params = "latest.student.size__range=25000.."
  let fields = "&fields=" + 
              "id," +
              "school.name," + 
              "latest.admissions.sat_scores"
  let options = "&per_page=100&page=0"
  let api_key = "&api_key=gD3AnaoQAAcJLYBrWHmNGzFePeGyggA04s25m2xq"        

  let request_url = base_url + dataset + filter_params +
              "&fields=" + "," + fields + options + api_key

  console.log(request_url)
  let result = await fetch(request_url).then(function(response) {
    return response.json();
  });
  console.log(result)
  return result;
}

async function sortSchools(schools) {
  // for(i in schools) {
  //   print(i)
  // }
}



export default function Classification_table(inpts) {
  let schools = [
    {
      college_name: 'University of North Carolina at Chapel hill',
      from: 'student',
      selectivity: 'target',
      cost: "medium",
    },  
    {
      college_name: 'Stanford University',
      from: 'counselor',
      selectivity: 'reach',
      cost: "high",
    },  
    {
      college_name: 'Harvard University',
      from: 'counselor',
      selectivity: 'reach',
      cost: "high",
    }, 
    {
      college_name: 'NC State University',
      from: 'student',
      selectivity: 'safety',
      cost: "low",
    },
    {
      college_name: 'Duke University',
      from: 'student',
      selectivity: 'safety',
      cost: "high",
    },      
  ]

  let array1_1 = [];
  let array1_2 = [];
  let array1_3 = [];
  let array2_1 = [];
  let array2_2 = [];
  let array2_3 = [];
  let array3_1 = [];
  let array3_2 = [];
  let array3_3 = [];

  for(let i = 0; i < schools.length; i++){
    if (schools[i].selectivity == 'safety'){
      if (schools[i].cost == 'low'){
        array1_1.push(schools[i]);
      }
      else if (schools[i].cost == 'medium'){
        array1_2.push(schools[i]);
      }
      else if (schools[i].cost == 'high'){
        array1_3.push(schools[i]);
      }
    }
    else if (schools[i].selectivity == 'target'){
      if (schools[i].cost == 'low'){
        array2_1.push(schools[i]);
      }
      else if (schools[i].cost == 'medium'){
        array2_2.push(schools[i]);
      }
      else if (schools[i].cost == 'high'){
        array2_3.push(schools[i]);
      }
    }
    else if (schools[i].selectivity == 'reach'){
      if (schools[i].cost == 'low'){
        array3_1.push(schools[i]);
      }
      else if (schools[i].cost == 'medium'){
        array3_2.push(schools[i]);
      }
      else if (schools[i].cost == 'high'){
        array3_3.push(schools[i]);
      }
    }
  }

  const [p1_1, set1_1] = useState(array1_1)
  const [p1_2, set1_2] = useState(array1_2)
  const [p1_3, set1_3] = useState(array1_3)
  const [p2_1, set2_1] = useState(array2_1)
  const [p2_2, set2_2] = useState(array2_2)
  const [p2_3, set2_3] = useState(array2_3)
  const [p3_1, set3_1] = useState(array3_1)
  const [p3_2, set3_2] = useState(array3_2)
  const [p3_3, set3_3] = useState(array3_3)


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

  console.log(getColleges())

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
