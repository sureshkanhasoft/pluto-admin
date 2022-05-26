import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Divider,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import Config from "../../../src/config/config";
import { useDispatch, useSelector } from "react-redux";
import { updatePlan } from "../../store/action";
import Notification from "../../components/Notification/Notification";

const useStyle = makeStyles((theme) => ({
  dialogWidth: { width: "100%" },
  radioGroup: {
    flexDirection: "row",
  },
}));

const UpdatePlan = ({ openUpdate, handleClose, id }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [updateMsg, setUpdateMsg] = useState(false);
  const { updatePlanSuccess, updatePlanError } = useSelector(
    (state) => state.planReducer
  );
  const [data, setData] = useState({
    title: "",
    name: "",
    description: "",
    price: "",
    user_id: id,
  });

  const getData = async (id) => {
    if (id > 0) {
      const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, "");
      axios
        .get(`${Config.API_URL}api/superadmin/get-plan/${id}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${loggedInUser}`,
          },
        })
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.log("error.message", error.message);
        });
    }
  };
  useEffect(() => {
    setData("");
    getData(id);
  }, [id]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitPlan = () => {
    dispatch(updatePlan(data));
    setUpdateMsg(true);
  };

  useEffect(() => {
    if (updateMsg && updatePlanSuccess?.message) {
      handleClose("update");
    }
  }, [updatePlanSuccess]);

  return (
    <>
      {/* {updateMsg && updatePlanError?.message &&
            
            <Notification
                data={updatePlanError?.message}
                status="error"
            />
        } */}
      {updateMsg && updatePlanSuccess?.message && (
        <Notification data={updatePlanSuccess?.message} status="success" />
      )}
      <Dialog
        open={openUpdate}
        onClose={(e) => handleClose("cancel")}
        classes={{ paper: classes.dialogWidth }}
      >
        <form>
          <DialogTitle id="form-dialog-title">
            <div>Update Plan</div>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="title"
                variant="outlined"
                name="title"
                value={data.title ? data.title : ""}
                onChange={handleChange}
                fullWidth
                required
                helperText={updatePlanError?.message?.title}
                error={!!updatePlanError?.message?.title}
              />
            </div>
            <div>
              <TextField
                margin="dense"
                id="price"
                label="Price"
                variant="outlined"
                name="price"
                required
                value={data.price ? data.price : "0"}
                onChange={handleChange}
                fullWidth
                helperText={updatePlanError.message?.price}
                error={!!updatePlanError.message?.price}
              />
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  margin="dense"
                  id="description"
                  label="description"
                  variant="outlined"
                  name="description"
                  value={data.description ? data.description : ""}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="pr-4 pb-2">
            <Button onClick={(e) => handleClose("cancel")} color="primary">
              Cancel
            </Button>
            <Button
              onClick={submitPlan}
              color="secondary"
              variant="contained"
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UpdatePlan;
