import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Assuming backend returns populated car and customer objects
      setBookings(res.data.bookings || []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const storedUsername = localStorage.getItem("adminUsername");

    if (!token) {
      navigate("/adminlogin");
    } else {
      setUsername(storedUsername || "Admin");
      fetchBookings();
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
        {/* Sidebar */}
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
          <button onClick={handleLogout} className="admin-logout-button">Logout</button>
        </aside>

        {/* Main Content */}
        <div className="admin-dashboard-container">
          <header className="admin-dashboard-header">
            <h2>Welcome, {username}!</h2>
            <p>Here is the list of all bookings.</p>
          </header>

          <main className="admin-dashboard-main">
            {loading ? (
              <p>Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <p>No bookings available</p>
            ) : (
              
              <div className="table-wrapper">
                <h1 className="text-center text-5xl font-bold mb-5">All Bookings</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Car Name</th>
                      <th>Vehicle Number</th>
                      <th>Customer Name</th>
                      <th>Customer Number</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b._id}>
                        <td>{b.car?.carName || "N/A"}</td>
                        <td>{b.car?.vehicleNumber || "N/A"}</td>
                        <td>{b.customer?.fullName || "N/A"}</td>
                        <td>{b.customerNumber}</td>
                        <td>{new Date(b.startDate).toLocaleDateString()}</td>
                        <td>{new Date(b.endDate).toLocaleDateString()}</td>
                        <td>${b.totalAmount}</td>
                        <td>{b.status}</td>
                        <td>{b.paymentStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
