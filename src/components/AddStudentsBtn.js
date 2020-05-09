import React from 'react';
import '../css/components.css';

import Button from '@material-ui/core/Button';

function temp() {
  alert('The "Add Students" button will eventually do something other than give this alert.');
}

function AddStudents() {
  return (
    <Button variant="contained" color="primary" onClick={() => temp()}>
      Add Students
    </Button>
  )
}

export default AddStudents;