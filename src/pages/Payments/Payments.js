import React, { useEffect, useState } from "react";
import { createPayment } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  Typography,
  Card,
  Icon,
  makeStyles,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Notification from "../../components/Notification/Notification";
import history from "../../utils/HistoryUtils";
import UtilService from "../../helper/service";
import moment from "moment";

const useStyle = makeStyles({
  paymentCard: {
    width: "30%",
    maxWidth: 480,
    padding: "36px 24px 24px",
    boxShadow: "none",
    display: "inline-grid",
    marginLeft: "10px",
  },
  paypalForm: {
    width: "30%",
    maxWidth: 480,
    padding: "36px 24px 24px",
    boxShadow: "none",
    display: "inline-grid",
    marginLeft: "10px",
  },
  activePlan: {
    border: "2px double #2b68a4",
    borderRadius: "4px",
  },

  middleText: {
    color: "#2b68a4",
    fontSize: 13,
  },

  descText: {
    marginBottom: 20,
    textAlign: "center",
  },
  pinkColor: {
    color: "pink",
  },
  grayColor: {
    color: "gray",
  },
});

const Payments = () => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [planPrice, setPlanPrice] = useState(0);
  const [planName, setPlanName] = useState("");
  const [payer, setPayer] = useState();
  const clientId =
    "AVeZX42v6hTHDwQoPQHmLjId9Ycn4uWqENcsC_ppnRFITpAjzlBHtbLTz01t6nE1rF1MSsscg_rVOANo";
  const [paymentNotify, setPaymentNotify] = useState(false);
  const [paymentErrorMsg, setPaymentErrorMsg] = useState("");
  const { createPaymentSuccess, createPaymentError, loading } = useSelector(
    (state) => state.paymentReducer
  );
  const loginUserInfo = JSON.parse(
    window.localStorage.getItem("loginUserInfo")
  );

  const dispatch = useDispatch();
  const [data, setData] = useState({
    subscription_name: "",
    payment_status: "",
    subscription_price: "",
    paypal_response: null,
  });

  const classes = useStyle();
  const purchasePlan = (planPrice, planName) => {
    console.log(loginUserInfo.subscription_name, "   subscription_name");
    console.log(planName, "  planName");
    console.log(loginUserInfo.is_plan_expire, "  loginUserInfo.is_plan_expire");
    // return;
    setPaymentErrorMsg("");

    if (loginUserInfo.is_plan_expire === false) {
      if (loginUserInfo.subscription_name === planName) {
        setPaymentErrorMsg(
          `Sorry, you can not purchase ${planName} plan again.`
        );
      } else if (
        loginUserInfo.subscription_name === "12MONTH" &&
        (planName === "6MONTH" || planName === "FREE")
      ) {
        setPaymentErrorMsg(
          `Sorry, you can not downgrade your plan with ${planName}.`
        );
      } else if (
        loginUserInfo.subscription_name === "6MONTH" &&
        planName === "FREE"
      ) {
        setPaymentErrorMsg(
          `Sorry, you can not downgrade your plan with ${planName}.`
        );
      } else if (loginUserInfo.subscription_name === planName) {
        setPaymentErrorMsg(`Sorry, you can not purchase same plan again.`);
      } else if (
        (loginUserInfo.subscription_name === "FREE" &&
        (planName === "6MONTH" || planName === "12MONTH")) || 
        (loginUserInfo.subscription_name === "6MONTH" && planName === "12MONTH"))
      {
        setPlanPrice(planPrice);
        setPlanName(planName);
        data.payment_status = "";
        data.subscription_name = planName;
        data.subscription_price = planPrice;
        data.payment_status = "Success";
        setShow(true);
      }
    } else {
      setPlanPrice(planPrice);
      setPlanName(planName);
      data.payment_status = "";
      data.subscription_name = planName;
      data.subscription_price = planPrice;
      if (planName !== "FREE") {
        setShow(true);
      } else {
        data.payment_status = "Success";
        submitForm();
      }
    }
  };

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          // authorize , order , sale
          {
            description: "test",
            amount: {
              currency_code: "USD",
              intent: "sale",
              // intent: "authorize",
              cancel_return: "http://localhost:2000/admin/Payment",
              notify_url: "http://localhost:2000/admin/Payment",
              value: planPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (datas, actions) => {
    return actions.order.capture().then(function (details) {
      data.paypal_response = details;
      data.payment_status = "Success";
      setPayer(details);
      setSuccess(true);
      setShow(true);
      submitForm();
    });
  };

  const submitForm = async (e) => {
    console.log(data, " Form submited");
    dispatch(createPayment(data));
    setPaymentNotify(true);
  };

  //capture likely error
  const onError = (datas, actions) => {
    data.paypal_response = [datas, actions];
    data.payment_status = "Failed";
    setErrorMessage("An Error occured with your payment ");
    submitForm();
  }; 

  useEffect(() => {
    setPayer();
    setPlanPrice(0);
    setPlanName("");
    setShow(false);
    setSuccess(false);
    console.log(JSON.parse(window.localStorage.getItem('loginUserInfo')) , " loginUserInfologinUserInfo")
  }, []);
  return (
    <>
      <div>
        {loading ? (
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          ""
        )}
        {paymentErrorMsg.length > 0 && (
          <Notification
            key={Date.now() + paymentErrorMsg}
            data={paymentErrorMsg}
            status="error"
          />
        )}
        {paymentNotify && createPaymentSuccess?.message && (
          <Notification data={createPaymentSuccess?.message} status="success" />
        )}
        {paymentNotify && createPaymentError?.message && (
          <Notification data={createPaymentError?.message} status="error" />
        )}
        {!show ? (
          <div>
            <Card
              className={[
                classes.paymentCard,
                loginUserInfo.subscription_name === "FREE"
                  ? classes.activePlan
                  : "",
              ]}
            >
              <p style={{ textAlign: "center" }}>
                <Icon style={{ fontSize: "40px" }}>people</Icon>
              </p>
              <Typography className={classes.descText}>
                1 Month free plan
              </Typography>
              <Typography className={classes.descText}>
                <b align="center">$0</b>
                <p className={classes.middleText}>
                  <sub className={[classes.grayColor]} align="center">
                    Monthly
                  </sub>
                </p>
              </Typography>
              <Typography className={classes.descText}>
                Fill free to create User, trust, booking shift or use other
                functionality.
              </Typography>
              <Typography className={classes.descText}>
                <p
                  onClick={() => purchasePlan(0, "FREE")}
                  className={classes.pinkColor}
                  align="center"
                >
                  PURCHASE {">"}{" "}
                </p>
              </Typography>
            </Card>

            <Card
              className={[
                classes.paymentCard,
                loginUserInfo.subscription_name === "6MONTH"
                  ? classes.activePlan
                  : "",
              ]}
            >
              <p style={{ textAlign: "center" }}>
                <Icon style={{ fontSize: "40px" }}>people</Icon>
              </p>
              <Typography className={classes.descText}>6 Month plan</Typography>
              <Typography className={classes.descText}>
                <b align="center">$55</b>
                <p className={classes.middleText}>
                  <sub className={[classes.grayColor]} align="center">
                    Monthly
                  </sub>
                </p>
              </Typography>
              <Typography className={classes.descText}>
                Fill free to create User, trust, booking shift or use other
                functionality.
              </Typography>
              <Typography className={classes.descText}>
                <p
                  onClick={() => purchasePlan(55, "6MONTH")}
                  className={classes.pinkColor}
                  align="center"
                >
                  PURCHASE {">"}{" "}
                </p>
              </Typography>
            </Card>
            <Card
              className={[
                classes.paymentCard,
                loginUserInfo.subscription_name === "12MONTH"
                  ? classes.activePlan
                  : "",
              ]}
            >
              <p style={{ textAlign: "center" }}>
                <Icon style={{ fontSize: "40px" }}>people</Icon>
              </p>
              <Typography className={classes.descText}>
                12 Months plan
              </Typography>
              <Typography className={classes.descText}>
                <b align="center">$100</b>
                <p className={classes.middleText}>
                  <sub className={[classes.grayColor]} align="center">
                    Monthly
                  </sub>
                </p>
              </Typography>
              <Typography className={classes.descText}>
                Fill free to create User, trust, booking shift or use other
                functionality.
              </Typography>
              <Typography className={classes.descText}>
                <p
                  onClick={() => purchasePlan(100, "12MONTH")}
                  className={classes.pinkColor}
                  align="center"
                >
                  PURCHASE {">"}{" "}
                </p>
              </Typography>
            </Card>
          </div>
        ) : (
          <div className={[classes.paypalForm]}>
            <PayPalScriptProvider
              options={{
                "client-id": clientId,
              }}
            >
              {/* <div> */}
              {/* {show ? ( */}
              <PayPalButtons
                style={{
                  layout: "vertical",
                  shape: "rect",
                  size: "responsive",
                }}
                // style={{ layout: "horizontal",shape:"rect",size:"responsive" }}
                createOrder={createOrder}
                onApprove={onApprove}
              />
              {/* // ) : null} */}
              {/* </div> */}
            </PayPalScriptProvider>
          </div>
        )}
      </div>
    </>
  );
};

export default Payments;