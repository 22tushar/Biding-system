import axios from "axios";
import {
  USER_DETAIL_REQUEST,
  USER_DETAIL_REQUEST_SUCCESS,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_LOGOUT_REQUEST_SUCCESS,
  GET_LABOURERS_REQUEST_SUCCESS,
} from "./user.action_type";
import Cookies from "js-cookie";

export const onUserLoginAction = (userObj,navigate,notifyError,notifySuccess,setIsLoading) => async (dispatch) => {
  // console.log(userObj);
  try {
    const  {data}  = await axios.post(
      "http://localhost:8080/users/login",
      userObj
    );
    // console.log(data)
    if (data.message == "User not registered" || data.message=='Entered wrong details' || data.message == "Internal Error") {
      notifyError(data.message)
      setIsLoading(false)
      return;
    }
    setIsLoading(false)
    notifySuccess(data.message)
    Cookies.set('auction_token',data.token)
    dispatch({ type: USER_LOGIN_REQUEST_SUCCESS })
    navigate('/')
  } catch (error) {
    setIsLoading(false)
    notifyError('server not responding')
    console.log(error);
  }
};

export const onUserLogoutAction = () => (dispatch) => {
  Cookies.remove('auction_token');
  dispatch({type:USER_LOGOUT_REQUEST_SUCCESS})
}

export const onUserSignupAction = (userObj,navigate,notifyError,notifySuccess,setIsLoading) => async (dispatch) => {
  // console.log(userObj);
  try {
    const  {data}  = await axios.post(
      "http://localhost:8080/users/signup",
      userObj
    );
    // console.log(data)
    if (data.message == "User already registered" || data.message == "Internal Error") {
      notifyError(data.message)
      setIsLoading(false)
      return;
    }
    notifySuccess(data.message)
    Cookies.set('auction_token', data.token)
    setIsLoading(false)
    dispatch({ type: USER_LOGIN_REQUEST_SUCCESS })
    navigate('/')
  } catch (error) {
    setIsLoading(false)
    notifyError('server not responding')
    console.log(error);
  }
};

export const getUserDetailAction = () => async (dispatch) => {
  const userToken = Cookies.get("auction_token");
  if (!userToken) {
    return
  }
  dispatch({ type: USER_DETAIL_REQUEST });
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  try {
    const response = await axios.get("http://localhost:8080/users/login_user", {
      headers: headers,
    });
    // console.log(response);
    dispatch({ type: USER_DETAIL_REQUEST_SUCCESS, payload: response.data.user });
  
    
    // const blogResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/blogs?user=${userID}`)
    // console.log(response);
  } catch (error) {}
};



export const getlabours = () => async (dispatch) => {
  const userToken = Cookies.get("auction_token");
  if (!userToken) {
    return;
  }
  dispatch({ type: USER_DETAIL_REQUEST });
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  try {
    const response = await axios.get("http://localhost:8080/users/getlabours", {
      headers: headers,
    });
    dispatch({ type: GET_LABOURERS_REQUEST_SUCCESS, payload: response.data }); // Send the entire response data
  } catch (error) {
    console.error('Error fetching labourers:', error);
  }
};