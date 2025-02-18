import React from "react";
import { useVisitorDataQuery } from "../../../features/visitorData/visitorDataApiSlice";
import "./VisitorData.css"; // Import the external CSS file

const VisitorData = () => {
  const { data: visitorData, isLoading, error } = useVisitorDataQuery();

  if (isLoading) return <p className="loading">Loading visitor data...</p>;
  if (error) return <p className="error">Error fetching visitor data</p>;

  return (
    <div className="visitor-container">
      <h2 className="visitor-title">Visitor Data</h2>
      {visitorData?.data?.length > 0 ? (
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
                  <td>{index+1}</td>
                  <td>{visitor.ip}</td>
                  <td>{visitor.city}</td>
                  <td>{visitor.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">No visitor data available</p>
      )}
    </div>
  );
};

export default VisitorData;
