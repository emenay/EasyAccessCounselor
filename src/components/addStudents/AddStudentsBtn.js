import React from 'react';
import '../../css/components.css';

import Button from '@material-ui/core/Button';

function AddStudentsBtn(props) {
  return (
    <Button variant="contained" color="primary" onClick={() => props.viewAddStudent()}>
      Add Students
    </Button>
  )
}

export default AddStudentsBtn;