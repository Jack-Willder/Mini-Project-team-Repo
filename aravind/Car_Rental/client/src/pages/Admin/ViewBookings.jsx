import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function ViewBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        if (res.data.success) setBookings(res.data.bookings);
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
      <div className="page-background">
        <div className="view-bookings-container">
          <h1 className="header">Bookings</h1>
          <div className="table-wrapper">
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewBookings;
