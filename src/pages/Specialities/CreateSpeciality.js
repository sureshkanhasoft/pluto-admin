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

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const specialitySubmit = async (data) => {
        dispatch(createSpecialities(data))
        setSpecilaityNotify(true)
        handleClose();
        reset();
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
            <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialogWidth }}>
                <form onSubmit={handleSubmit(specialitySubmit)}>
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
                            // value={data.speciality_name}

                            fullWidth
                            {...register('speciality_name', {
                                required: "Please enter speciality name",
                            })}
                            helperText={errors.speciality_name ? "Please enter speciality name" : false}
                            error={(errors.speciality_name ? true : false)}
                            onChange={handleChange}
                            required
                        />
                    </DialogContent>
                    <DialogActions className="pr-4 pb-2">
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" type="submit" formNoValidate>
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default CreateSpeciality
