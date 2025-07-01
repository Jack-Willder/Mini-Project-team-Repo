import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("adminUsername");
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/adminlogin");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    navigate("/adminlogin");
  };

  return (
    <div className="min-h-screen bg-gray-500 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Welcome, {username}!</h2>
        <p className="mb-6">This is your admin dashboard.</p>

      <section className="upperpanel bg-amber-100">
        <ul className="links flex gap-13 p-5">
          <Link className="hover:text-emerald-500">Home</Link>
          <Link className="hover:text-emerald-500">Charts</Link>
          <Link className="hover:text-emerald-500">Contact Us</Link>
          <Link className="hover:text-emerald-500">About Us</Link>
          <Link className="hover:text-emerald-500">Manage Cars</Link>
          <Link className="hover:text-emerald-500">Feedbacks</Link>
          
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </ul>
      </section>
      <section className="mainpanel">

      </section>
      </div>
    </div>
  );
}

export default AdminDashboard;