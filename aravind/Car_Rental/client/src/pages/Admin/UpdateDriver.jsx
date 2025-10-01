import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function UpdateDriver() {
  const navigate = useNavigate();

  // Example initial driver data
  const [driverData, setDriverData] = useState({
    name: "John Doe",
    licenseNumber: "DL-1234567890",
    phone: "9876543210",
    address: "123, Main Street, City",
    gender: "Male",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverData({ ...driverData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Driver Data:", driverData);
    // Add API call to update driver
  };

  const handleGoBack = () => {
    navigate(-1); // go back to previous page
  };

  return (
    <>
    <PageHeader/>
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

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={driverData.phone}
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

        <div className="form-buttons">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="back-btn" onClick={handleGoBack}>Go Back</button>
        </div>
      </form>
    </div>
    <Footer/>
    
    </>
  );
}

export default UpdateDriver;
