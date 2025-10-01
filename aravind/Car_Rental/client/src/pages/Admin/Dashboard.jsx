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
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-layout">
        
        {/* Sidebar Navigation */}
        <aside className="admin-dashboard-sidebar">
          <h2 className="admin-sidebar-title">Admin Panel</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/addcars">Add Cars</Link></li>
            <li><Link to="/managecars">Manage Cars</Link></li>
            <li><Link to="/updatecars">Update Cars</Link></li>
            <li><Link to="/adddriver">Add Drivers</Link></li>
            <li><Link to="/managedrivers">Manage Drivers</Link></li>
            <li><Link to="/updatedriver">Update Drivers</Link></li>
            <li><Link to="/viewbookings">View Bookings</Link></li>
            <li><Link to="/viewreports">View Reports</Link></li>
            <li><Link to="/viewfeedback">View Feedbacks</Link></li>
          </ul>
          <button onClick={handleLogout} className="admin-logout-button">
            Logout
          </button>
        </aside>

        {/* Main Dashboard Content */}
        <div className="admin-dashboard-container">
          <header className="admin-dashboard-header">
            <h2>Welcome, {username}!</h2>
            <p>Here is the summary of your admin activities.</p>
          </header>

          <main className="admin-dashboard-main">
            {/* Cards */}
            <div className="admin-cards-container">
              <div className="admin-card">
                <h3>Total Users</h3>
                <p>150</p>
              </div>
              <div className="admin-card">
                <h3>Total Cars</h3>
                <p>320</p>
              </div>
              <div className="admin-card">
                <h3>Feedbacks</h3>
                <p>45</p>
              </div>
              <div className="admin-card">
                <h3>Revenue</h3>
                <p>$12,450</p>
              </div>
            </div>

            {/* Recent Activities */}
            <section className="admin-recent-activity">
              <h3>Recent Activities</h3>
              <ul>
                <li>User John Doe registered a new account.</li>
                <li>Car "Tesla Model 3" was added by Admin.</li>
                <li>Feedback received from user Jane Smith.</li>
                <li>Revenue report updated for September.</li>
              </ul>
            </section>

            {/* Notifications */}
            <section className="admin-notifications">
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
    </div>
  );
}

export default AdminDashboard;