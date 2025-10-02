import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function ManageDrivers() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch drivers from backend
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/drivers");
        if (response.data.success) {
          setDrivers(response.data.drivers);
        } else {
          alert("Failed to fetch drivers");
        }
      } catch (error) {
        console.error("Error fetching drivers:", error.response?.data || error.message);
        alert("Failed to fetch drivers");
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  // Handle delete driver
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/drivers/${id}`);
        if (response.data.success) {
          alert("Driver deleted successfully");
          setDrivers(drivers.filter((d) => d._id !== id));
        } else {
          alert("Failed to delete driver");
        }
      } catch (error) {
        console.error("Error deleting driver:", error.response?.data || error.message);
        alert("Failed to delete driver");
      }
    }
  };

  // Handle update driver
  const handleUpdate = (driver) => {
    // Pass driver object via state to UpdateDriver page
    navigate(`/updatedriver`, { state: { driver } });
  };

  if (loading) return <p>Loading drivers...</p>;

  return (
    <>
      <PageHeader />
      <div className="page-background">
        <div className="manage-drivers-container">
          <h1 className="header">My Drivers</h1>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>License No</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Availability</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {drivers.length > 0 ? (
                  drivers.map((driver, index) => (
                    <tr key={driver._id}>
                      <td>{index + 1}</td>
                      <td>{driver.name}</td>
                      <td>{driver.gender}</td>
                      <td>{driver.licenseNumber}</td>
                      <td>{driver.contact}</td>
                      <td>{driver.address}</td>
                      <td>{driver.availability || "Available"}</td>
                      <td>
                        <div className="operation-buttons">
                          <button
                            className="update-btn"
                            onClick={() => handleUpdate(driver)}
                          >
                            Update
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(driver._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      No drivers found.
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

export default ManageDrivers;
