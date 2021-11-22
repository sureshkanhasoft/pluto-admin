import React, { useState } from 'react';
import {
    makeStyles,
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Divider
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createSpecialities } from '../../store/action';
import Notification from '../../components/Notification/Notification';

const useStyle = makeStyles((theme) => ({
    dialogWidth: { width: "100%" },
    radioGroup: {
        flexDirection: "row"
    }
}))

const CreateSpeciality = ({ open, handleClose }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [specilaityNotify, setSpecilaityNotify] = useState(false)
    const { specialitySuccess, specialityError } = useSelector(state => state.specialities)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [data, setData] = useState({
        speciality_name: "",
    })
    const [formError, setError] = useState([])
    const handleChange = (event) => {
        if(event.target.value){
            setError([]);
        }else{
            setError('err_speciality_name');
        }
        setData({ ...data, [event.target.name]: event.target.value });
    };
    
    const specialitySubmit = (event) => {
        event.preventDefault();
        if(data.speciality_name === ""){
            setError('err_speciality_name');
        }else{
            setError([])
            dispatch(createSpecialities(data))
            setSpecilaityNotify(true)
            handleClose1();
        }
        // dispatch(createSpecialities(data))
        // setSpecilaityNotify(true)
        // handleClose();
        // reset();
    }

    const resetForm = () =>{
        setError([])
        setData({ ...data, speciality_name: '' });
    }

    const handleClose1 = () => {
        resetForm();
        handleClose();
    }

    return (
        <>
            {specilaityNotify && specialitySuccess?.message &&
                <Notification
                    data={specialitySuccess?.message}
                    status="success"
                />
            }

            {specilaityNotify && specialityError?.message &&
                <Notification
                    data={specialityError?.message}
                    status="error"
                />
            }
            <Dialog open={open} onClose={handleClose1} classes={{ paper: classes.dialogWidth }}>
                <form>
                    <DialogTitle id="form-dialog-title">
                        <div>Create Speciality</div>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="speciality_name"
                            label="Speciality"
                            variant="outlined"
                            name="speciality_name"
                            
                            
                            fullWidth
                            helperText={(formError.includes('err_speciality_name')) ? "Please enter speciality name" : false}
                            error={(formError.includes('err_speciality_name') ? true : false)}
                            // {...register('speciality_name', {
                            //     required: "Please enter speciality name",
                            // })}
                            value={data?.speciality_name || ""}
                            
                            onChange={(event) =>handleChange(event)}
                            required
                        />
                    </DialogContent>
                    <DialogActions className="pr-4 pb-2">
                        <Button onClick={handleClose1} color="primary">
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" type="submit" onClick={(event) => specialitySubmit(event)}>
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default CreateSpeciality
