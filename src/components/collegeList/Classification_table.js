import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Classification_table() {

  function createData(name, school1, school2, school3, selector) {
    return { name, school1, school2, school3, selector};
  }
  
  const rows = [
    createData('$', "UNC-Chapel Hill", "", "Duke University", "student"),
    createData('$$', "Gilford College", "", "", "professor"),
    createData('$$$', "", "Virginia Tech", "Harvard University", "professor")
  ];

  return (
    <div>
        <Table>
            <thead>
                <tr>
                    <th>college list</th>
                    
                    <th><Chip label="student selected colleges" color="primary" /><Chip label="professor selected colleges" color="success" /></th>
                </tr>
            </thead>
            
          </Table>
          <br/>
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
        {rows.map((row) => (
          <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right"><Chip label={row.school1} color= {row.selector == "professor" ? "primary" : "success"} /></TableCell>
            <TableCell align="right"><Chip label={row.school2} color= {row.selector == "professor" ? "primary" : "success"} /></TableCell>
            <TableCell align="right"><Chip label={row.school3} color= {row.selector == "professor" ? "primary" : "success"} /></TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <br/>
    </div>
  );
}

