import React, { useEffect, useState } from 'react';
import {
    makeStyles,
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Divider
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import apiConfigs from '../../config/config';
import { updateSpecialities } from '../../store/action';
import Notification from '../../components/Notification/Notification';

const useStyle = makeStyles((theme) => ({
    dialogWidth: { width: "100%" },
    radioGroup: {
        flexDirection: "row"
    }
}))

function UpdateSpeciality({ open, handleClose, id }) {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [specilaityNotify, setSpecilaityNotify] = useState(false)
    const { speUpdateSuccess, speUpdateErrors } = useSelector(state => state.specialities)
    const [data, setData] = useState({
        speciality_name: "",
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const specialitySubmit = (event) => {
        dispatch(updateSpecialities(data))
        setSpecilaityNotify(true)
    }

    useEffect(()=>{
        if(speUpdateSuccess?.message) {
            handleClose()
        }
    },[speUpdateSuccess])

    const getData = async (id) => {
        if (id > 0) {
            const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
            axios.get(`${apiConfigs.API_URL}api/organization/get-speciality/${id}`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${loggedInUser}`
                }
            }).then(response => {
                setData(response.data.data)
            }).catch(error => {
                console.log("error.message", error.message);
            });
        }
    }
    useEffect(() => {
        setData("")
        getData(id);
    }, [id]);

    return (
        <>
            {specilaityNotify && speUpdateSuccess?.message &&
                <Notification
                    data={speUpdateSuccess?.message}
                    status="success"
                />
            }

            {/* {specilaityNotify && speUpdateErrors?.message &&
                <Notification
                    data={speUpdateErrors?.message}
                    status="error"
                />
            } */}
            <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialogWidth }}>
                <form>
                    <DialogTitle id="form-dialog-title">
                        <div>Update Speciality</div>
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
                            value={data.speciality_name ? data.speciality_name : ""}
                            fullWidth
                            error={speUpdateErrors?.message ? true : false}
                            helperText={speUpdateErrors?.message ? speUpdateErrors?.message : ""}
                            onChange={handleChange}
                            required
                        />
                    </DialogContent>
                    <DialogActions className="pr-4 pb-2">
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" onClick={specialitySubmit} formNoValidate >
                            Update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default UpdateSpeciality
