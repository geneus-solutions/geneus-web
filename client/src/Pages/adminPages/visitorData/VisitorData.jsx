import React, { useState } from "react";
import {
  useDeleteVisitorDataMutation,
  useVisitorDataQuery,
} from "../../../features/visitorData/visitorDataApiSlice";
import { AiFillDelete } from "react-icons/ai";
import "./VisitorData.css"; // Import the external CSS file
import PopUp from "./PopUp";
import { toast } from "react-toastify";

const VisitorData = () => {
  const [date, setDate] = useState(""); // Holds input date
  const [selectedDate, setSelectedDate] = useState(""); // Stores the date when "Filter" is clicked
  const [showPopUp, setShowPopUp] = useState(false);
  // Fetch data only when selectedDate is available
  const { data: visitorData, isLoading } = useVisitorDataQuery(
    { date: selectedDate },
    { skip: !selectedDate } // Fetch only when selectedDate is not empty
  );

  const [deleteVisitorData] = useDeleteVisitorDataMutation();
  const handleDateChange = (event) => {
    setDate(event.target.value); // Update input date state
  };

  const handleFilterClick = () => {
    setSelectedDate(date); // Trigger API call when "Filter" is clicked
  };

  const handleYesClick = async () => {
    try {
        const res = await deleteVisitorData(
          { date: selectedDate },
          { skip: !selectedDate }
        ).unwrap();
        console.log(res);
        toast.success(res.message);
        setShowPopUp(!showPopUp);
    } catch (error) {
      console.log("this is serror", error);
    }
  };

  const handleNoClick = () => {
    setShowPopUp(!showPopUp);
  };

  return (
    <div className="visitor-container">
      <h2 className="visitor-title">Visitor Data</h2>

      {/* Date Input and Filter Button */}
      <div className="filter-container">
        <input type="date" value={date} onChange={handleDateChange} />
        <button
          className="filter-btn"
          onClick={handleFilterClick}
          disabled={!date}
        >
          Filter
        </button>
        <button
          className="delete-btn"
          disabled={!date || visitorData?.data?.length<=0}
          onClick={() => setShowPopUp(!showPopUp)}
        >
          <AiFillDelete style={{ fontSize: 22 }} />
        </button>
      </div>
      {showPopUp && (
        <PopUp handleYesClick={handleYesClick} handleNoClick={handleNoClick} />
      )}
      {/* Show message when no date is selected */}
      {!selectedDate ? (
        <p className="no-data">
          Please select a date and click "Filter" to fetch && "Delete" to delete the visitor data
        </p>
      ) : isLoading ? (
        <p>Please wait, fetching data...</p>
      ) : visitorData?.data?.length > 0 ? (
        <div className="visitor-table-container">
          <table className="visitor-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>IP Address</th>
                <th>City</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {visitorData?.data?.map((visitor, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{visitor.ip}</td>
                  <td>{visitor.city}</td>
                  <td>{visitor.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">
          No visitor data available for this date. Please select other date
        </p>
      )}
    </div>
  );
};

export default VisitorData;
