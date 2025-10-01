import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function ViewReports() {
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerate = () => {
    console.log("Generating report from", fromDate, "to", endDate);
    // Add your report generation logic here
  };

  const handleClear = () => {
    setFromDate("");
    setEndDate("");
    console.log("Records cleared");
  };

  return (
    <>
    <PageHeader/>
    <div className="page-background">
      <div className="view-reports-container">
        <h1 className="header">Reports</h1>

        <div className="form-group">
          <label>From Date:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button className="generate-btn" onClick={handleGenerate}>
            Generate Report
          </button>
          <button className="clear-btn" onClick={handleClear}>
            Clear Records
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    
    </>
  );
}

export default ViewReports;
