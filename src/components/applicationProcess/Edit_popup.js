import React, {useState} from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 267,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function Edit_popup({obj, refresh}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const cur_obj = {}
    const handle = ()=>{
        for (const [key, value] of Object.entries(cur_obj)) {
            obj[key] = value
        }
        handleClose()
        refresh()
    }
    return (
        <>
            <Button size="small" variant="outlined" color="error" onClick={handleOpen} >Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit fields <Button style={{marginLeft: '20px'}} variant="outlined" size="small" onClick={handle}>Confirm</Button>
                    </Typography>
                    
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {Object.keys(obj).map(key=><TextField onChange={(e)=>{cur_obj[key] = e.target.value}} id="filled-basic" label={key.replaceAll("_", " ")} variant="filled" defaultValue={obj[key]}/>)}
                    </Typography>
                </Box>
                    
                    
            </Modal>
        </>        
    )
}
