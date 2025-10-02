import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function UpdateDriver() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Optional, used if accessed directly via URL

  const driverFromState = location.state?.driver; // Driver object passed via ManageDrivers

  const [driverData, setDriverData] = useState({
    name: "",
    licenseNumber: "",
    contact: "",
    address: "",
    gender: "",
    licenseStatus: "notExpired",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Load driver data
  useEffect(() => {
    if (driverFromState) {
      // Use driver passed from ManageDrivers
      setDriverData(driverFromState);
      setLoading(false);
    } else if (id) {
      // Fetch driver from backend if accessed directly via URL
      const fetchDriver = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/drivers/${id}`);
          if (res.data.success) {
            setDriverData(res.data.driver);
          } else {
            alert("Driver not found");
            navigate("/managedrivers");
          }
        } catch (error) {
          console.error(error.response?.data || error.message);
          alert("Failed to fetch driver details");
          navigate("/managedrivers");
        } finally {
          setLoading(false);
        }
      };
      fetchDriver();
    } else {
      // No driver info or ID
      alert("No driver selected");
      navigate("/managedrivers");
    }
  }, [driverFromState, id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const driverId = driverFromState?._id || id;
      const res = await axios.put(`http://localhost:5000/api/drivers/${driverId}`, driverData);
      if (res.data.success) {
        alert("Driver updated successfully!");
        navigate("/managedrivers");
      } else {
        alert(res.data.message || "Failed to update driver");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Error updating driver");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading driver details...</p>;

  return (
    <>
      <PageHeader />
      <div className="update-driver-container">
        <h1 className="header">Update Driver Details</h1>
        <form className="update-driver-form" onSubmit={handleUpdate}>
          <label>Driver Name:</label>
          <input
            type="text"
            name="name"
            value={driverData.name}
            onChange={handleChange}
            required
          />

          <label>Driver License Number:</label>
          <input
            type="text"
            name="licenseNumber"
            value={driverData.licenseNumber}
            onChange={handleChange}
            required
          />

          <label>Contact:</label>
          <input
            type="tel"
            name="contact"
            value={driverData.contact}
            onChange={handleChange}
            required
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={driverData.address}
            onChange={handleChange}
            required
          />

          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={driverData.gender}
            onChange={handleChange}
            required
          />

          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="licenseStatus"
                value="expired"
                checked={driverData.licenseStatus === "expired"}
                onChange={handleChange}
              />
              License Expired
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="licenseStatus"
                value="notExpired"
                checked={driverData.licenseStatus === "notExpired"}
                onChange={handleChange}
              />
              License Not Expired
            </label>
          </div>

          <div className="form-buttons">
            <button type="submit" className="update-btn" disabled={updating}>
              {updating ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/managedrivers")}
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UpdateDriver;
