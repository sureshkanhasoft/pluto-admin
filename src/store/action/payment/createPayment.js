import axios from "axios";
import { apiClient } from "../../../config/apiClient";
import apiConfigs from "../../../config/config";
import history from "../../../utils/HistoryUtils";
import {
  CREATE_PAYMENT_ERROR,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
} from "../actiontypes";
import { notificationFail, notificationSuccess } from "../notificationMsg";

// -------------------------------

export const createPayment = (data) => {
  const userToken = localStorage.getItem("token").replace(/['"]+/g, "");
  
  return async (dispatch) => {
    dispatch(createPaymentRequest());
    await axios
      .post(
        `${apiConfigs.API_URL}api/organization/purchase-subscription`,
        data,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + userToken,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        if (data && data.status === true) {
          dispatch(createPaymentSuccess(response.data));
          const loginUserInfo = JSON.parse(window.localStorage.getItem('loginUserInfo'));
          loginUserInfo.is_plan_expire = false;
          loginUserInfo.subscription_name = data.data.subscription_name;
          loginUserInfo.subscription_purchase_date = data.data.subscription_purchase_date;
          loginUserInfo.subscription_expire_date = data.data.subscription_expire_date;
          localStorage.setItem('loginUserInfo', JSON.stringify(loginUserInfo));
          console.log(loginUserInfo, " loginUserInfologinUserInfologinUserInfo")
          setTimeout(() => {
            window.location.reload()
            history.push('./admin/bookings')
          }, 4000);
        } else {
          dispatch(createPaymentError(data));
        }
      })
      .catch((error) => {
        dispatch(createPaymentError(error));
      });
  };
};

const createPaymentRequest = () => {
  return {
    type: CREATE_PAYMENT_REQUEST,
  };
};

const createPaymentSuccess = (data) => {
  return {
    type: CREATE_PAYMENT_SUCCESS,
    payload: data,
  };
};

const createPaymentError = (error) => {
  return {
    type: CREATE_PAYMENT_ERROR,
    payload: error,
  };
};

// -------------------------------
