import React, { useState } from 'react'
import {
    makeStyles,
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Divider
} from '@material-ui/core';
import { useForm } from "react-hook-form";
import Notification from '../../components/Notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { createRoles } from '../../store/action';

const useStyle = makeStyles((theme) => ({
    dialogWidth: { width: "100%" },
    radioGroup: {
        flexDirection: "row"
    }
}))


const CreateRoles = ({ open, handleClose }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [roleMsg, setRoleMsg] = useState(false)
    const { roleErrors, roleSuccess } = useSelector(state => state.roles)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [data, setData] = useState({
        role_name: "",
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onSubmitRoles = async datas => {
        dispatch(createRoles(datas))
        setRoleMsg(true)
        handleClose();
        reset();
    };
    const closeModal = () => {
        handleClose();
    }
    return (
        <>
            {roleMsg && roleErrors?.message &&
                <Notification
                    data= {roleErrors?.message}
                    status="error"
                />
            }
            {roleMsg && roleSuccess?.message &&
                <Notification
                    data={roleSuccess?.message}
                    status="success"
                />
            }
            <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialogWidth }}>
                <form onSubmit={handleSubmit(onSubmitRoles)}>
                    <DialogTitle id="form-dialog-title">
                        <div>Create Role</div>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="role_name"
                                label="Role Name"
                                variant="outlined"
                                name="role_name"
                                value={data.role_name}
                                fullWidth
                                {...register("role_name", {
                                    required: "Please enter role name",
                                })}
                                error={(errors.role_name ? true : false)}
                                onChange={handleChange}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions className="pr-4 pb-2">
                        <Button onClick={closeModal} color="primary">
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" type="submit">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}

export default CreateRoles
