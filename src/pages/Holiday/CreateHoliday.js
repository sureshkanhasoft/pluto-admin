import React, { useState } from "react";
import {
  makeStyles,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Divider,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import Notification from "../../components/Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { createHoliday } from "../../store/action";
import UtilService from "../../helper/service";

const useStyle = makeStyles((theme) => ({
  dialogWidth: { width: "100%" },
  radioGroup: {
    flexDirection: "row",
  },
}));

const CreateHoliday = ({ open, handleClose }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [roleMsg, setRoleMsg] = useState(false);
  const { holidayErrors, holidaySuccess } = useSelector((state) => state.holiday);
  const [data, setData] = useState({
    holiday_date: "",
    holiday_title: "",
  });
  const disPastDate = UtilService.disabledPastDate();

  const [formError, setError] = useState([]);
  const handleChange = (event) => {
    if (event.target.value) {
      setError([]);
    } else {
      setError("err_holiday_date");
    }
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSubmitRoles = async (event) => {
    event.preventDefault();
    if (data.holiday_date === "") {
      setError("err_holiday_date");
    } else if (data.holiday_title === "") {
      setError("err_holiday_title");
    } else {
      dispatch(createHoliday(data));
      setRoleMsg(true);
      handleClose();
      setData("");
    }
  };
  const closeModal = () => {
    resetForm();
    setData("");
    handleClose();
  };

  const resetForm = () => {
    setError([]);
    setData({ ...data, holiday_date: "" });
  };
  return (
    <>
      {roleMsg && holidayErrors?.message && (
        <Notification data={holidayErrors?.message} status="error" />
      )}
      {roleMsg && holidaySuccess?.message && (
        <Notification data={holidaySuccess?.message} status="success" />
      )}
      <Dialog
        open={open}
        onClose={closeModal}
        classes={{ paper: classes.dialogWidth }}
      >
        <form onSubmit={(event) => onSubmitRoles(event)}>
          <DialogTitle id="form-dialog-title">
            <div>Create Holiday</div>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="holiday_date"
                type="date"
                label="Holiday date"
                variant="outlined"
                name="holiday_date"
                fullWidth
                required
                value={data.holiday_date || ""}
                error={formError.includes("err_holiday_date") ? true : false}
                inputProps={{
                    min: disPastDate,
                  }}
                helperText={
                  formError.includes("err_holiday_date")
                    ? "Please enter Holiday date"
                    : false
                }
                onChange={handleChange}
              />
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  margin="dense"
                  id="holiday_title"
                  type="text"
                  label="Holiday title"
                  variant="outlined"
                  name="holiday_title"
                  fullWidth
                  required
                  value={data.holiday_title || ""}
                  error={formError.includes("err_holiday_title") ? true : false}
                  helperText={
                    formError.includes("err_holiday_title")
                      ? "Please enter title"
                      : false
                  }
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
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
  );
};

export default CreateHoliday;
