import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function AddDriver() {
  const [driverData, setDriverData] = useState({
    name: "",
    licenseNumber: "",
    contact: "",
    address: "",
    gender: "",
    licenseStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverData({ ...driverData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Driver Data:", driverData);
    // Add API call to save driver
  };

  return (
    <>
    <PageHeader/>
    <div className="add-driver-container">
      <h1 className="header">Enter Driver Details</h1>
      <form className="driver-form" onSubmit={handleSubmit}>
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
                required
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

        <button type="submit" className="add-driver-btn">Add Driver</button>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default AddDriver;
