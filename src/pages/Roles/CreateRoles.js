import React, { useState } from 'react'
import {
    makeStyles,
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Divider
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    dialogWidth: { width: "100%" },
    radioGroup: {
        flexDirection: "row"
    }
}))


const CreateRoles = ({ open, handleClose }) => {
    const classes = useStyle();
    const [data, setData] = useState({
        role: "",
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    return (
        <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialogWidth }}>
            <form>
                <DialogTitle id="form-dialog-title">
                    <div>Create Role</div>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="role"
                            label="Role Name"
                            variant="outlined"
                            name="role"
                            value={data.role}
                            onChange={handleChange}
                            fullWidth
                        />
                    </div>
                </DialogContent>
                <DialogActions className="pr-4 pb-2">
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CreateRoles
