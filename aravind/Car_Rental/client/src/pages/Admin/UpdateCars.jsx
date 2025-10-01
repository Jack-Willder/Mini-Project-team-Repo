import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function UpdateCar() {
  const navigate = useNavigate();
  const location = useLocation();
  const carFromState = location.state?.car;

  const [carData, setCarData] = useState({
    carName: "",
    vehicleNumber: "",
    acFarePerKm: "",
    nonAcFarePerKm: "",
    acFarePerDay: "",
    nonAcFarePerDay: "",
  });

  useEffect(() => {
    if (carFromState) {
      setCarData({ ...carFromState });
    } else {
      navigate("/managecars");
    }
  }, [carFromState, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/cars/${carData._id}`, carData);
      alert("Car updated successfully!");
      navigate("/managecars");
    } catch (err) {
      console.error(err);
      alert("Error updating car");
    }
  };

  return (<>
  <PageHeader/>
    <div className="update-car-container">
      <h1 className="header">Update Car Details</h1>

      <form className="update-car-form" onSubmit={handleSubmit}>
        <label>Car Name:</label>
        <input
          type="text"
          name="carName"
          value={carData.carName}
          onChange={handleChange}
          required
        />

        <label>Car Number Plate:</label>
        <input
          type="text"
          name="vehicleNumber"
          value={carData.vehicleNumber}
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
          <button type="button" className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default UpdateCar;
