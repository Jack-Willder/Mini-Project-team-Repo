import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateCar() {
  const navigate = useNavigate();

  // Example initial car data
  const [carData, setCarData] = useState({
    name: "Toyota Camry",
    numberPlate: "TN-01-AB-1234",
    acFarePerKm: 15,
    nonAcFarePerKm: 10,
    acFarePerDay: 1200,
    nonAcFarePerDay: 900,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated car data:", carData);
    // Add API call for update here
  };

  const handleGoBack = () => {
    navigate(-1); // go back to previous page
  };

  return (
    <div className="update-car-container">
      <h1 className="header">Update Car Details</h1>

      <form className="update-car-form" onSubmit={handleSubmit}>
        <label>Car Name:</label>
        <input
          type="text"
          name="name"
          value={carData.name}
          onChange={handleChange}
          required
        />

        <label>Car Number Plate:</label>
        <input
          type="text"
          name="numberPlate"
          value={carData.numberPlate}
          onChange={handleChange}
          required
        />

        <label>AC Fare (/km):</label>
        <input
          type="number"
          name="acFarePerKm"
          value={carData.acFarePerKm}
          onChange={handleChange}
          required
        />

        <label>Non-AC Fare (/km):</label>
        <input
          type="number"
          name="nonAcFarePerKm"
          value={carData.nonAcFarePerKm}
          onChange={handleChange}
          required
        />

        <label>AC Fare (/day):</label>
        <input
          type="number"
          name="acFarePerDay"
          value={carData.acFarePerDay}
          onChange={handleChange}
          required
        />

        <label>Non-AC Fare (/day):</label>
        <input
          type="number"
          name="nonAcFarePerDay"
          value={carData.nonAcFarePerDay}
          onChange={handleChange}
          required
        />

        <div className="form-buttons">
          <button type="submit" className="update-btn">Update Car</button>
          <button type="button" className="back-btn" onClick={handleGoBack}>Go Back</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCar;
