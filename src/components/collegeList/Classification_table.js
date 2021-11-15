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
  let rows = [{"name" : "UNC"}, {"name" : "Duke"}];

  return (
    <div>
      
        <Table>
            <thead>
                <tr>
                    <th>college list</th>
                    
                    <th><Chip label="student selected colleges" color="primary" /><Chip label="student selected colleges" color="success" /></th>
                </tr>
            </thead>
            
          </Table>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
    </div>
  );
}

