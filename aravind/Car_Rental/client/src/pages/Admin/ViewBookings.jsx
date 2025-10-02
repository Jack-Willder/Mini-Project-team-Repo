import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // To track which booking is updating

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      if (res.data.success) setBookings(res.data.bookings);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch bookings");
    }
  };

  const handleStatusChange = async (bookingId, field, newValue) => {
    try {
      setLoadingId(bookingId);
      const res = await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
        [field]: newValue,
      });

      if (res.data.success) {
        // Update the booking in local state
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? res.data.booking : b))
        );
      } else {
        alert("Failed to update booking");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating booking");
    } finally {
      setLoadingId(null);
    }
  };

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
                  <th>Car Type</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.car?.carName || "N/A"}</td>
                      <td>{booking.customerNumber || booking.customer?.userName}</td>
                      <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                      <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                      <td>{booking.carType}</td>
                      <td>${booking.totalAmount}</td>
                      <td>
                        <select
                          value={booking.status}
                          disabled={loadingId === booking._id}
                          onChange={(e) =>
                            handleStatusChange(booking._id, "status", e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={booking.paymentStatus}
                          disabled={loadingId === booking._id}
                          onChange={(e) =>
                            handleStatusChange(booking._id, "paymentStatus", e.target.value)
                          }
                        >
                          <option value="unpaid">Unpaid</option>
                          <option value="paid">Paid</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No bookings found</td>
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

export default ViewBookings;
