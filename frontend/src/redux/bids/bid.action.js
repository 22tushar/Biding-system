import axios from "axios";

export const GET_ALL_BIDS_SUCCESS = 'GET_ALL_BIDS_SUCCESS'
 

export const getAllBidsAction = (id) => async (dispatch) => {
  console.log(id)
    try {
      const response = await axios.get(
        'http://localhost:8080/bids/all/$'+`${id}`
      );
      console.log( 'res', response);
      dispatch({type:GET_ALL_BIDS_SUCCESS,payload:{allBids:response.data}})
    } catch (error) {
      console.log(error);
    }
  };