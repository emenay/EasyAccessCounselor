import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };


export default function Classification_table() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        View college list
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Table>
            <thead>
                <tr>
                    <th>college list</th>
                    <th>student selected colleges</th>
                    <th>counselor selected colleges</th>
                </tr>
                <br/>
                <br/>
            </thead>
            
          </Table>
          <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>safety</th>
                    <th>target</th>
                    <th>reach</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>$</th>
                        <th>NC state</th>
                        <th>UNC</th>
                        <th>Duke</th>
                    </tr>
                    <tr>
                        <th>$$</th>
                        <th>NC state</th>
                        <th>UNC</th>
                        <th>Duke</th>
                    </tr>
                    <tr>
                        <th>$$$</th>
                        <th>NC state</th>
                        <th>UNC</th>
                        <th>Duke</th>
                    </tr>
                </tbody>
          </Table>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Save changes
          </Button> */}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

