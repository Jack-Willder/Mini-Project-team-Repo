import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const storedUsername = localStorage.getItem("adminUsername");

    if (!token) {
      navigate("/adminlogin");
    } else {
      setUsername(storedUsername || "Admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    navigate("/adminlogin");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <h2>Welcome, {username}!</h2>
          <p>Here is the summary of your admin activities.</p>
        </header>

        {/* Navigation */}
        <nav className="dashboard-nav">
          <ul>
            <li><Link to="#">Home</Link></li>
            <li><Link to="#">Charts</Link></li>
            <li><Link to="#">Contact Us</Link></li>
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Manage Cars</Link></li>
            <li><Link to="#">Feedbacks</Link></li>
          </ul>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </nav>

        {/* Main Dashboard */}
        <main className="dashboard-main">
          {/* Cards */}
          <div className="cards-container">
            <div className="card">
              <h3>Total Users</h3>
              <p>150</p>
            </div>
            <div className="card">
              <h3>Total Cars</h3>
              <p>320</p>
            </div>
            <div className="card">
              <h3>Feedbacks</h3>
              <p>45</p>
            </div>
            <div className="card">
              <h3>Revenue</h3>
              <p>$12,450</p>
            </div>
          </div>

          {/* Recent Activities */}
          <section className="recent-activity">
            <h3>Recent Activities</h3>
            <ul>
              <li>User John Doe registered a new account.</li>
              <li>Car "Tesla Model 3" was added by Admin.</li>
              <li>Feedback received from user Jane Smith.</li>
              <li>Revenue report updated for September.</li>
            </ul>
          </section>

          {/* Notifications */}
          <section className="notifications">
            <h3>Notifications</h3>
            <ul>
              <li>System maintenance scheduled for 28th Sep.</li>
              <li>New feedback needs your review.</li>
              <li>Weekly report is ready to download.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;