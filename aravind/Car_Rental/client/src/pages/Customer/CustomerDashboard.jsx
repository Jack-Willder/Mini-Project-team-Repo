import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Customer";
  const token = localStorage.getItem("token");

  const [bookings, setBookings] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [upcomingRentals, setUpcomingRentals] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const data = await res.json();

        // Filter bookings for this customer
        const customerId = localStorage.getItem("customerId");
        const myBookings = (data.bookings || []).filter(b => b.customer._id === customerId);
        setBookings(myBookings);

        // Total payments
        const total = myBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
        setTotalPayments(total);

        // Upcoming rentals
        const today = new Date();
        const upcoming = myBookings.filter(b => new Date(b.startDate) > today && b.status === "pending").length;
        setUpcomingRentals(upcoming);

      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboardData();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/custlogin");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header"><h2>Car Rentals</h2></div>
        <ul className="sidebar-menu">
          <li><Link to="/customer-dashboard">Dashboard</Link></li>
          <li><Link to="/cars">Cars</Link></li>
          <li><Link to="/mybookings">My Bookings</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          {/* <li><Link to="/returncar">Return Cars</Link></li> */}
          <li><button onClick={handleLogout} style={{background: "none", border: "none", color: "#fff", cursor: "pointer"}}>Logout</button></li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, {username}</h1>
          <p>Here’s a summary of your account</p>
        </header>

        <div className="cards">
          <div className="card">
            <h3>Total Bookings</h3>
            <p>{bookings.length}</p>
          </div>
          <div className="card">
            <h3>Upcoming Rentals</h3>
            <p>{upcomingRentals}</p>
          </div>
          <div className="card">
            <h3>Total Payments</h3>
            <p>${totalPayments}</p>
          </div>
        </div>

        <div className="recent-bookings">
          <h2>Recent Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Car</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? bookings.map((b,index) => (
                <tr key={b._id}>
                  <td>{index+1}</td>
                  <td>{b.car?.carName}</td>
                  <td>{new Date(b.startDate).toLocaleDateString()}</td>
                  <td>{new Date(b.endDate).toLocaleDateString()}</td>
                  <td>{b.status}</td>
                </tr>
              )) : <tr><td colSpan="5">No bookings found</td></tr>}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default CustomerDashboard;
