import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    makeStyles
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    dialogWidth: {
        width: "100%",
        maxWidth: 500
    },
    radioGroup: {
        flexDirection: "row"
    }
}))

const AlertDialog = ({ open, close, title, description, buttonName, id, response }) => {
    const classes = useStyle();

    const deleteResponse = () => {
        response(id);
        close()
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            classes={{ paper: classes.dialogWidth }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent className="mb-4">
                <DialogContentText>
                    {description}
                </DialogContentText>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={close} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={deleteResponse} color="secondary" autoFocus>
                    {buttonName}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog
