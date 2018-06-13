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


// Action Creators


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
    RestClient.post("verify_dob",requestObject).then((result) => {
      console.log('result ******* ',result)
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
};

/**
* Reducer
*/
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case LOG_IN_SUCCESS:
        //   return { ...state, userDetails: action.data };

        default:
          return state;
    }
}
