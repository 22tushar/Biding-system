import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import './Bidrequest.css'; // Import CSS for styling
import { getEmployeeBids } from '../redux/user/user.action';

const Bidrequest = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedRequests, setAcceptedRequests] = useState([]); // State to track accepted requests
  const [rejectedRequests, setRejectedRequests] = useState([]); // State to track rejected requests
  const dispatch = useDispatch();
  const { employeeBids, loadingEmployeeBids, errorEmployeeBids } = useSelector((store) => store.userReducer);
  const { loginUserDetail } = useSelector((store) => store.userReducer);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getEmployeeBids(loginUserDetail._id));
    setIsLoading(false);
  }, [dispatch]);

  const acceptRequest = (id) => {
    setAcceptedRequests([...acceptedRequests, id]); // Add the request id to acceptedRequests
    // Perform accept logic here
    console.log("Request accepted:", id);

  };

  const rejectRequest = (id) => {
    setRejectedRequests([...rejectedRequests, id]); // Add the request id to rejectedRequests
    // Perform reject logic here
    console.log("Request rejected:", id);
  };

  const isAccepted = (id) => acceptedRequests.includes(id); // Function to check if a request is accepted
  const isRejected = (id) => rejectedRequests.includes(id); // Function to check if a request is rejected

  return (
    <div className="requests-container">
      <h2>Bidding Requests</h2>
      <div className="requests-list">
        {employeeBids.map(request => (
          <div key={request._id} className="request-item">
            <p><h1>{request.userName}</h1> sent you a request</p>
            <p>Bid Amount <h1>{request.bidAmount}</h1></p>
            <div className="action-buttons">
              {!isAccepted(request._id) && !isRejected(request._id) && (
                <React.Fragment>
                  <button className='accept-button' onClick={() => acceptRequest(request._id)}>Accept</button>
                  <button className='reject-button' onClick={() => rejectRequest(request._id)}>Reject</button>
                </React.Fragment>
              )}
              {isAccepted(request._id) && <strong style={{ color: 'green' }}>Accepted, Congratulations!</strong>}
              {isRejected(request._id) && <strong style={{ color: 'red' }}>Rejected</strong>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bidrequest;
