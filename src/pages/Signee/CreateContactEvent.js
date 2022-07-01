import React, { useState } from "react";
import {
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TextareaAutosize,
  Divider,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import Notification from "../../components/Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { addContactEventForSignee } from "../../store/action";

const useStyle = makeStyles((theme) => ({
  dialogWidth: { width: "100%" },
  radioGroup: {
    flexDirection: "row",
  },
}));

const CreateContactEvent = ({ open, handleClose, signee_id }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [eventMsg, seteventMsg] = useState(false);
  const { addCandidateEventSuccess, addCandidateEventError } = useSelector(
    (state) => state.signee
  );
  const [data, setData] = useState({
    comment: "",
    signee_id: signee_id,
  });
  const [formError, setError] = useState([]);

  const handleChange = (event) => {
    if (event.target.value) {
      setError([]);
    } else {
      setError("err_comment");
    }
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSubmitEvent = async (event) => {
    event.preventDefault();
    if (data.comment === "") {
      setError("err_comment");
    } else {
      dispatch(addContactEventForSignee(data));
      seteventMsg(true);
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
    setData({ ...data, comment: "" });
  };
  return (
    <>
      {eventMsg && addCandidateEventError?.message && (
        <Notification data={addCandidateEventError?.message} status="error" />
      )}
      {eventMsg && addCandidateEventSuccess?.message && (
        <Notification
          data={addCandidateEventSuccess?.message}
          status="success"
        />
      )}
      <Dialog
        open={open}
        onClose={closeModal}
        classes={{ paper: classes.dialogWidth }}
      >
        <form onSubmit={(event) => onSubmitEvent(event)}>
          <DialogTitle id="form-dialog-title">
            <div>Create Contact Event</div>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div>
              <TextareaAutosize
                margin="dense"
                variant="outlined"
                minRows={4}
                aria-label="Please Enter Comment"
                placeholder="Please Enter Comment"
                defaultValue=""
                name="comment"
                required={true}
                style={{ width: "100%" }}
                onChange={handleChange}
              />

              {/* <TextField
                autoFocus
                margin="dense"
                id="comment"
                label="Please Enter Comment"
                variant="outlined"
                name="comment"
                value={data.comment || ""}
                fullWidth
                error={formError.includes("err_comment") ? true : false}
                helperText={
                  formError.includes("err_comment")
                    ? "Please enter comment"
                    : false
                }
                onChange={handleChange}
              /> */}
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
  );
};

export default CreateContactEvent;
