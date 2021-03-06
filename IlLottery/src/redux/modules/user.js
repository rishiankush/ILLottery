'use strict';
import {
  Platform,
} from 'react-native';
import _ from "lodash";
import { startLoading, stopLoading, showToast, hideToast } from './app';
import { goBack, reset } from './nav';
import RestClient from '../../utilities/RestClient';
import { ToastActionsCreators } from 'react-native-redux-toast';


// Actions
export const GET_NEXT_LOTTERY_TIME = "GET_NEXT_LOTTERY_TIME";
export const GO_TO_TYPE_FORM = "GO_TO_TYPE_FORM";

// Action Creators
export const GET_NEXT_LOTTERY = (data) => ({  type: GET_NEXT_LOTTERY_TIME, data});
export const NAVIGATE_TO_TYPE_FORM = () => ({  type: GO_TO_TYPE_FORM });

//perform API's

/* Verify DOB API */

export const verifyDob = (data) => {
  let requestObject = {
    device_token:'test',
    device_type:'ios',
    //date_of_birth:
  }

  return dispatch => {
    dispatch(startLoading());
    RestClient.post("v1/verify_dob",requestObject).then((result) => {
      console.log('result ******* ',result)
    }).catch(error => {
      console.log("error=> " ,error)
      dispatch(stopLoading());
    });
  }
};

/* Get Next Lottery */
export const getNextLottery = () => {

  return dispatch => {
    //dispatch(startLoading());
    RestClient.get("events/v1/next_lottery_time").then((result) => {
		//dispatch(stopLoading());
      	console.log('result ******* ',result)
      	dispatch(GET_NEXT_LOTTERY())
    }).catch(error => {
      console.log("error=> " ,error)
      //dispatch(stopLoading());
    });
  }

};

/* Sign up user API */

export const signup = (data) => {
  let requestObject = {
    email:data.email,
    password:data.password,
    device_type: 'android',
    device_token: 'd8bbb56f-fac3-40f5-974b-d8628b02cf6e',
    tac_consent:true
  }
  let device_token = 'd8bbb56f-fac3-40f5-974b-d8628b02cf6e';
  return dispatch => {
    dispatch(startLoading());
    RestClient.post("users/register",requestObject,device_token).then((result) => {
      dispatch(stopLoading());
      console.log('result ******* ',result)
      dispatch(NAVIGATE_TO_TYPE_FORM())
    }).catch(error => {
      console.log("error=> " ,error)
      dispatch(stopLoading());
    });
  }
};

/**
* Initial state
*/
const initialState = {
  userDetails : null,
  deviceToken : "test",
  next_lottery_time : ''
};

/**
* Reducer
*/
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case LOG_IN_SUCCESS:
        //   return { ...state, userDetails: action.data };

        case GET_NEXT_LOTTERY_TIME:
        	return { ...state, next_lottery_time: action.data };

        default:
          return state;
    }
}
