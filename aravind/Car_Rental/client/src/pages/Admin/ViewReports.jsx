import React, { useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function ViewReports() {
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!fromDate || !endDate) {
      alert("Please select both From Date and End Date");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/reports", {
        params: { fromDate, endDate },
      });

      if (res.data.success) {
        setBookings(res.data.bookings);
      } else {
        alert(res.data.message || "No records found");
        setBookings([]);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching report data");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFromDate("");
    setEndDate("");
    setBookings([]);
  };

  return (
    <>
      <PageHeader />
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
            <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
              {loading ? "Generating..." : "Generate Report"}
            </button>
            <button className="clear-btn" onClick={handleClear}>
              Clear Records
            </button>
          </div>

          {bookings.length > 0 && (
            <div className="table-wrapper" style={{ marginTop: "20px" }}>
              <table>
                <thead>
                  <tr>
                    <th>Car</th>
                    <th>Customer Number</th>
                    <th>Rent Start Date</th>
                    <th>Rent End Date</th>
                    <th>Distance</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.car}</td>
                      <td>{booking.customerNumber}</td>
                      <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                      <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                      <td>{booking.distance}</td>
                      <td>{booking.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {bookings.length === 0 && !loading && (
            <p style={{ marginTop: "20px", textAlign: "center" }}>No records to display</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewReports;
