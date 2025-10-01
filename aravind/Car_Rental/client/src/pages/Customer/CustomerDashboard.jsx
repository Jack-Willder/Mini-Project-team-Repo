import React from "react";
import { Link, useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Customer";

  const bookings = [
    { id: 1, car: "Toyota Camry", date: "2025-10-10", status: "Confirmed" },
    { id: 2, car: "Honda City", date: "2025-10-15", status: "Pending" },
  ];

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");   // remove JWT
    localStorage.removeItem("username"); // remove username
    navigate("/custlogin");              // redirect to login page
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Car Rentals</h2>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/customer-dashboard">Dashboard</Link></li>
          <li><Link to="/mybookings">My Bookings</Link></li>
          {/* <li><Link to="">Profile</Link></li> */}
          {/* <li><Link to="">Payments</Link></li> */}
          <li>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
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
            <p>1</p>
          </div>
          <div className="card">
            <h3>Total Payments</h3>
            <p>$500</p>
          </div>
        </div>

        <div className="recent-bookings">
          <h2>Recent Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Car</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.car}</td>
                  <td>{b.date}</td>
                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default CustomerDashboard;
