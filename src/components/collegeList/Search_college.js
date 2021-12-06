import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Search_autocomplete from './Search_autocomplete'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'instnm', headerName: 'College', width: 200 },
  { field: 'stabbr', headerName: 'State', width: 130 },
  { field: 'insturl', headerName: 'Website', width: 200 },
  {
    field: 'selectivity_char',
    headerName: 'Selectivity (General)',
    width: 220,
  },
  { field: 'afford_cat', headerName: 'affordability (General)', width: 220 },
]

// this addRows function is from Classification_table.js
export default function Search_college({ addRows }) {
  const [rows, setRows] = useState([])
  const [selected, setSelected] = useState([])
  const addToGrid = (row) => {
    if (!row) {
      alert("This college has not been added to our database yet...")
      return
    }
    for (let i = 0; i < rows.length; i++){
      if(rows[i].unitid == row.unitid) return 
    }
    row.id = rows.length + 1
    let temp = [...rows]
    temp.push(row)
    setRows([...temp])
  }
  const sync = () => {
    let temp = rows.filter((obj) => selected.includes(obj.id))
    let temp2 = rows.filter((obj) => !selected.includes(obj.id))
    // console.log('sync')
    // console.log(temp);
    addRows(temp)
    setRows([...temp2])
  }
  return (
    <div>
      <Search_autocomplete addToGrid={addToGrid} sync={sync} />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(itm) => {
            setSelected(itm)
          }}
        />
      </div>
      <br />
      <br />
      <br />
    </div>
  )
}
