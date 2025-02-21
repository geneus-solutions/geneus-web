import React, { useState } from "react";
import { useVisitorDataQuery } from "../../../features/visitorData/visitorDataApiSlice";
import "./VisitorData.css"; // Import the external CSS file

const VisitorData = () => {
  const [date, setDate] = useState(""); // Holds input date
  const [selectedDate, setSelectedDate] = useState(""); // Stores the date when "Filter" is clicked

  // Fetch data only when selectedDate is available
  const { data: visitorData, isLoading } = useVisitorDataQuery(
    { date: selectedDate },
    { skip: !selectedDate } // Fetch only when selectedDate is not empty
  );

  const handleDateChange = (event) => {
    setDate(event.target.value); // Update input date state
  };

  const handleFilterClick = () => {
      setSelectedDate(date); // Trigger API call when "Filter" is clicked
  };

  return (
    <div className="visitor-container">
      <h2 className="visitor-title">Visitor Data</h2>

      {/* Date Input and Filter Button */}
      <div className="filter-container">
        <input type="date" value={date} onChange={handleDateChange} />
        <button className="filter-btn" onClick={handleFilterClick} disabled={!date}>
          Filter
        </button>
      </div>

      {/* Show message when no date is selected */}
      {!selectedDate ? (
        <p className="no-data">Please select a date and click "Filter" to fetch visitor data</p>
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
        <p className="no-data">No visitor data available for this date. Please select other date</p>
      )}
    </div>
  );
};

export default VisitorData;
