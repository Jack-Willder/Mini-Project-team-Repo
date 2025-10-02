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
      <div style={{ minHeight: "80vh", padding: "40px 20px", backgroundColor: "#f0f0f0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <h1 style={{ textAlign: "center", fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>Reports</h1>
          <p style={{ textAlign: "center", color: "#666", fontSize: "18px", marginBottom: "30px" }}>View bookings between selected dates</p>

          <div style={{ display: "flex", gap: "20px", marginBottom: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <div>
              <label>From Date:</label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ marginLeft: "10px" }}/>
            </div>
            <div>
              <label>End Date:</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ marginLeft: "10px" }}/>
            </div>
            <br />
            <div>
              <button onClick={handleGenerate} disabled={loading} style={{ marginRight: "10px", padding: "8px 16px", backgroundColor: "#059669", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                {loading ? "Generating..." : "Generate Report"}
              </button>
              <button onClick={handleClear} style={{ padding: "8px 16px", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                Clear Records
              </button>
            </div>
          </div>

          {bookings.length > 0 ? (
            <div style={{ overflowX: "auto", marginTop: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#eee" }}>
                    <th style={{ padding: "12px", border: "1px solid #ccc" }}>Car</th>
                    <th style={{ padding: "12px", border: "1px solid #ccc" }}>Customer Name</th>
                    <th style={{ padding: "12px", border: "1px solid #ccc" }}>Start Date</th>
                    <th style={{ padding: "12px", border: "1px solid #ccc" }}>End Date</th>
                    <th style={{ padding: "12px", border: "1px solid #ccc" }}>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      <td style={{ padding: "12px", border: "1px solid #ccc" }}>{b.car?.carName}</td>
                      <td style={{ padding: "12px", border: "1px solid #ccc" }}>{b.customer?.fullName}</td>
                      <td style={{ padding: "12px", border: "1px solid #ccc" }}>{new Date(b.startDate).toLocaleDateString()}</td>
                      <td style={{ padding: "12px", border: "1px solid #ccc" }}>{new Date(b.endDate).toLocaleDateString()}</td>
                      <td style={{ padding: "12px", border: "1px solid #ccc" }}>{b.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && <p style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>No records to display</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewReports;
