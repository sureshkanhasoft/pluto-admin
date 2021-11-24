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
    // const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [data, setData] = useState({
        role_name: "",
    })
    const [formError, setError] = useState([])

    const handleChange = (event) => {
        if(event.target.value){
            setError([]);
        }else{
            setError('err_role_name');
        }
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onSubmitRoles = async (event) => {
        event.preventDefault();
        if(data.role_name === ""){
            setError('err_role_name');
        }else{
            dispatch(createRoles(data))
            setRoleMsg(true)
            handleClose();
            setData("")
        }
       

    };
    const closeModal = () => {
        resetForm()
        setData("")
        handleClose();
    }

    const resetForm = () =>{
        setError([])
        setData({ ...data, role_name: '' });
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
            <Dialog open={open} onClose={closeModal} classes={{ paper: classes.dialogWidth }}>
                <form onSubmit={(event) => onSubmitRoles(event)}>
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
                                value={data.role_name || ""}
                                fullWidth
                                // {...register("role_name", {
                                //     required: "Please enter role name",
                                // })}
                                // error={(errors.role_name ? true : false)}
                                error={(formError.includes('err_role_name') ? true : false)}
                                helperText={(formError.includes('err_role_name')) ? "Please enter role name" : false}
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
