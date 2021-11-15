import React, {useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'college_name', headerName: 'College', width: 130 },
  { field: 'state', headerName: 'State', width: 130 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'percent', headerName: '% need met', width: 130 },
  { field: 'to_add', headerName: 'to add', width: 130 }
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
];

const rows = [
  {id: 1, college_name: "UNC", state: "NC", type: "public", percent: 100, to_add: true},
  {id: 2, college_name: "Stanford", state: "CA", type: "private", percent: 60, to_add: true},
];

export default function Search_college() {
  return (
      <div>

            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
            </div>
            <br/><br/><br/>
      </div>
    
  );
}