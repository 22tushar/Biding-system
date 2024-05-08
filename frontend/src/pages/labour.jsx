import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getlabours } from '../redux/user/user.action';
import './labour.css'; // Import CSS for styling

const Labour = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {labourers } = useSelector((store) => store.userReducer);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getlabours()); // Dispatch action to fetch labourers
    setIsLoading(false);
  }, [dispatch]);

  // Function to handle attendance marking
  const markAttendance = (labourerId, date, present) => {
    // Update attendance logic here
    console.log("Marking attendance:", labourerId, date, present);
  };

  // Function to handle payment marking
  const markPayment = (labourerId) => {
    // Update payment logic here
    console.log("Marking payment:", labourerId);
  };

  return (
    <div className="employer-dashboard">
      <div className="labourer-table-container">
        <h2>Labourers List</h2>
        <table className="labourer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Attendance</th>
              <th>Payment Done</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? ( // Display a loading message while fetching data
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              labourers.map(labourer => (
                <tr key={labourer._id}>
                  <td>{labourer.userName}</td> {/* Displaying userName */}
                  <td>{labourer.email}</td> {/* Displaying email */}
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => markAttendance(labourer._id, new Date().toISOString().split('T')[0], e.target.checked)}
                      checked={labourer.attendance && labourer.attendance.date === new Date().toISOString().split('T')[0]}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => markPayment(labourer._id)}
                      checked={labourer.paymentDone}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Labour;
