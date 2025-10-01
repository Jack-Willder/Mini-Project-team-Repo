import React from "react";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function ViewBookings() {
  // Example bookings data
  const bookings = [
    {
      id: 1,
      car: "Toyota Camry",
      customerNumber: "CUST001",
      startDate: "2025-10-10",
      endDate: "2025-10-12",
      distance: "150 km",
      totalAmount: "$300",
    },
    {
      id: 2,
      car: "Honda City",
      customerNumber: "CUST002",
      startDate: "2025-10-15",
      endDate: "2025-10-18",
      distance: "200 km",
      totalAmount: "$400",
    },
  ];

  return (
    <>
    <PageHeader/>
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
                <tr key={booking.id}>
                  <td>{booking.car}</td>
                  <td>{booking.customerNumber}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>{booking.distance}</td>
                  <td>{booking.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ViewBookings;
