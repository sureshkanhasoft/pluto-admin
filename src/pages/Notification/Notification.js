import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Paper,
  makeStyles,
  Typography,
} from "@material-ui/core";
import * as actions from "../../store/action";
import moment from "moment";
import Pagination from "@material-ui/lab/Pagination";
import { getNotification } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";

const useStyle = makeStyles(() => ({
  notificationBox: {
    cursor: "pointer",
    width: "100%",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
    position: "relative",
    overflow: "hidden",
    "&::after": {
      content: `""`,
      position: "absolute",
      left: 0,
      top: 0,
      width: 6,
      height: "100%",
      background: "#184a7b",
    },
  },
  menuHeading: {
    fontSize: 15,
  },
  menuDesc: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    "&.isRead": {
      fontWeight: "500",
      color: "#000",
    },
  },
}));

const Notification = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const [page, setPage] = React.useState(1);
  const { notificationList } = useSelector((state) => state.notificationList);

  useEffect(() => {
    getNotificationAction(page);
  }, []);

  useEffect(() => {
    dispatch(getNotification(1));
  }, []);

  const readNotification = (e, val) => {
    e.preventDefault();
    const requestData = {
      notification_id: val.id,
      is_read: true,
      signee_id: val.signee_id,
    };
    dispatch(actions.readNotification(requestData, page));
  };

  const getNotificationAction = (value) => {
    dispatch(actions.getNotification(value));
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    setTimeout(getNotificationAction(value), 2000);
  };
  return (
    <>
      <section className="pt-16 pb-32">
        <Container maxWidth="lg">
          <Box className="mb-36">
            {notificationList?.data && notificationList?.data.length > 0 ? (
              notificationList?.data.map((val, index) => {
                return (
                  <Paper
                    key={index}
                    elevation={3}
                    onClick={(e) => readNotification(e, val)}
                    className={classes.notificationBox}
                    style={{
                      background: val.is_read == 0 ? "#e7f2ff" : "white",
                    }}
                  >
                    <div>
                      <Typography
                        variant="body2"
                        className={`${classes.menuDesc} ${
                          val.is_read == 0 ? "isRead" : ""
                        }`}
                      >
                        {val.message}{" "}
                      </Typography>
                    </div>
                    <span>{moment(val.created_at).format("DD MMM")}</span>
                  </Paper>
                );
              })
            ) : (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "5%",
                  fontSize: "25px",
                }}
                className="pagination-container"
              >
                <Container>Sorry, Notification not available</Container>
              </div>
            )}
          </Box>
        </Container>
      </section>
      {notificationList?.data && notificationList?.data.length > 0 && (
        <div className="pagination-container">
          <Container>
            <div className="inner-pagination">
              <Pagination
                onChange={handleChangePage}
                page={page}
                count={notificationList?.last_page}
                boundaryCount={2}
                showFirstButton
                showLastButton
              />
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Notification;
