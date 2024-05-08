import {
    USER_DETAIL_REQUEST_SUCCESS,
    USER_LOGIN_REQUEST_SUCCESS,
    USER_LOGOUT_REQUEST_SUCCESS,
    GET_LABOURERS_REQUEST_SUCCESS,
    GET_EMPLOYEE_BIDS_REQUEST,
    GET_EMPLOYEE_BIDS_SUCCESS,
    GET_EMPLOYEE_BIDS_FAIL,
    GET_EMPLOYEE_BIDS_ERROR,
  } from "./user.action_type";
  
  const initialState = {
    isAuth: false,
    isAllLoading: false,
    loginUserDetail: {},
    labourers: [],
    bids: [],
    employeeBids: [],
    loadingEmployeeBids: false,
    errorEmployeeBids: null,
  };
  
  export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case USER_LOGIN_REQUEST_SUCCESS:
        return { ...state, isAuth: true };
      case USER_LOGOUT_REQUEST_SUCCESS:
        return { ...state, isAuth: false, loginUserDetail: {}, labourers: [], bids: [], employeeBids: [] };
      case USER_DETAIL_REQUEST_SUCCESS:
        return { ...state, loginUserDetail: payload, isAuth: true };
      case GET_LABOURERS_REQUEST_SUCCESS:
        return { ...state, labourers: payload };
      case GET_EMPLOYEE_BIDS_REQUEST:
        return { ...state, loadingEmployeeBids: true, errorEmployeeBids: null };
      case GET_EMPLOYEE_BIDS_SUCCESS:
        return { ...state, employeeBids: payload, loadingEmployeeBids: false };
      case GET_EMPLOYEE_BIDS_FAIL:
        return { ...state, loadingEmployeeBids: false, errorEmployeeBids: payload };
      case GET_EMPLOYEE_BIDS_ERROR:
        return { ...state, loadingEmployeeBids: false, errorEmployeeBids: payload };
      default:
        return state;
    }
  };
  