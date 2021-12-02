import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
export default function Show_hide_modal({ checked, list, handle }) {
  const label = { inputProps: { 'aria-label': 'Switch demo' } }
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [this_checked, setChecked] = useState([...checked])
  const toggle = (idx) => {
    return (e) => {
      let temp = [...this_checked]
      temp[idx] = e.target.checked
      setChecked([...temp])
    }
  }
  return (
    <div>
      <Button
        variant="outlined"
        color="success"
        size="small"
        onClick={handleOpen}>
        show/hide
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Table>
            <tbody>
              <tr id="modal-modal-title" variant="h6" component="h2">
                <th>Check fields to hide</th>
                <th>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      handleClose()
                      handle(this_checked)
                    }}>
                    Confirm
                  </Button>
                </th>
              </tr>
              {list.map((field, idx) => (
                <tr key={'type' + idx}>
                  <th>{field}</th>
                  <th>
                    <Switch
                      {...label}
                      onChange={toggle(idx)}
                      checked={this_checked[idx]}
                    />
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Modal>
    </div>
  )
}
