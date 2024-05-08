import { USER_DETAIL_REQUEST_SUCCESS, USER_LOGIN_REQUEST_SUCCESS, USER_LOGOUT_REQUEST_SUCCESS,GET_LABOURERS_REQUEST_SUCCESS } from "./user.action_type";

const initialState = {
  isAuth: false,
  isAllLoading: false,
  loginUserDetail: {},
  labourers: [], // Add a new field to store the list of labourers
};

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOGIN_REQUEST_SUCCESS:
            return {...state, isAuth:true}
        case USER_LOGOUT_REQUEST_SUCCESS:
            return {...state, isAuth:false, loginUserDetail:{}, labourers: []} // Clear the labourers array when logging out
        case USER_DETAIL_REQUEST_SUCCESS:
            return {...state, loginUserDetail:payload, isAuth:true}
        case GET_LABOURERS_REQUEST_SUCCESS: // Handle the action type for fetching labourers
            return {...state, labourers: payload} // Update the labourers array with fetched data
        default:
            return state;
    }
};
