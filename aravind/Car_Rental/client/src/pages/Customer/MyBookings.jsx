import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const customerId = localStorage.getItem("customerId");
        if (!customerId) return;

        const res = await axios.get("http://localhost:5000/api/bookings");
        if (res.data.success) {
          // Filter bookings for the logged-in customer
          const customerBookings = res.data.bookings.filter(
            (b) => b.customer._id === customerId
          );
          setBookings(customerBookings);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <PageHeader />
      <div style={{ backgroundColor: "#f0f0f0", padding: "40px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <h1 style={{ color: "#333", textAlign: "center",fontSize:"50px" ,fontWeight:"bold"}}>Your Bookings</h1>
          <p style={{ textAlign: "center", color: "#666",fontSize:"25px" , marginBottom: "30px" }}>Hope you enjoyed our service</p>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#eee", textAlign: "left" }}>
                  <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>Car</th>
                  <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>Start Date</th>
                  <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>End Date</th>
                  <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>Fare per Day</th>
                  <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>Number of Days</th>
                  <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((b) => {
                    const start = new Date(b.startDate);
                    const end = new Date(b.endDate);
                    const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
                    const farePerDay = b.carType === "With AC" ? b.car.acFarePerDay : b.car.nonAcFarePerDay;

                    return (
                      <tr key={b._id}>
                        <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>{b.car.carName}</td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>{start.toLocaleDateString()}</td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>{end.toLocaleDateString()}</td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>{farePerDay}</td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>{numberOfDays}</td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>{b.totalAmount}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyBookings;
