import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function AddCar() {
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    carName: "",
    vehicleNumber: "",
    acFarePerKm: "",
    nonAcFarePerKm: "",
    acFarePerDay: "",
    nonAcFarePerDay: "",
    insuranceStatus: "",
    carImage: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setCarData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setCarData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("carName", carData.carName);
      formData.append("vehicleNumber", carData.vehicleNumber);
      formData.append("acFarePerKm", carData.acFarePerKm);
      formData.append("nonAcFarePerKm", carData.nonAcFarePerKm);
      formData.append("acFarePerDay", carData.acFarePerDay);
      formData.append("nonAcFarePerDay", carData.nonAcFarePerDay);
      formData.append("insuranceStatus", carData.insuranceStatus);
      formData.append("carImage", carData.carImage);

      // Make POST request to backend
      const res = await axios.post("http://localhost:5000/api/cars/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Car added successfully!");
        navigate("/managecars");
      } else {
        setError("Failed to add car.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <>
      <PageHeader />
      <div className="arv-addcar-pagewrap">
        <div className="arv-addcar-container">
          <h2 className="arv-title">Please provide your car details</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form className="arv-addcar-form" onSubmit={handleSubmit}>
            <label className="arv-field-label">Car Name:</label>
            <input
              className="arv-input"
              type="text"
              name="carName"
              value={carData.carName}
              onChange={handleChange}
              placeholder="Enter car name"
              required
            />

            <label className="arv-field-label">Vehicle Number Plate:</label>
            <input
              className="arv-input"
              type="text"
              name="vehicleNumber"
              value={carData.vehicleNumber}
              onChange={handleChange}
              placeholder="Enter vehicle number"
              required
            />

            <label className="arv-field-label">AC Fare per km (Rs):</label>
            <input
              className="arv-input"
              type="number"
              name="acFarePerKm"
              value={carData.acFarePerKm}
              onChange={handleChange}
              placeholder="AC fare per km"
              required
            />

            <label className="arv-field-label">Non-AC Fare per km (Rs):</label>
            <input
              className="arv-input"
              type="number"
              name="nonAcFarePerKm"
              value={carData.nonAcFarePerKm}
              onChange={handleChange}
              placeholder="Non-AC fare per km"
              required
            />

            <label className="arv-field-label">AC Fare per day (Rs):</label>
            <input
              className="arv-input"
              type="number"
              name="acFarePerDay"
              value={carData.acFarePerDay}
              onChange={handleChange}
              placeholder="AC fare per day"
              required
            />

            <label className="arv-field-label">Non-AC Fare per day (Rs):</label>
            <input
              className="arv-input"
              type="number"
              name="nonAcFarePerDay"
              value={carData.nonAcFarePerDay}
              onChange={handleChange}
              placeholder="Non-AC fare per day"
              required
            />

            <label className="arv-field-label">Car Image:</label>
            <input
              className="arv-file-input"
              type="file"
              name="carImage"
              accept="image/*"
              onChange={handleChange}
              required
            />

            <div className="arv-radio-group" role="radiogroup" aria-label="Insurance status">
              <label className="arv-radio-label">
                <input
                  type="radio"
                  name="insuranceStatus"
                  value="expired"
                  checked={carData.insuranceStatus === "expired"}
                  onChange={handleChange}
                  required
                />
                <span>Insurance Expired</span>
              </label>

              <label className="arv-radio-label">
                <input
                  type="radio"
                  name="insuranceStatus"
                  value="notExpired"
                  checked={carData.insuranceStatus === "notExpired"}
                  onChange={handleChange}
                />
                <span>Insurance Not Expired</span>
              </label>
            </div>

            <button type="submit" className="arv-submit-btn">
              Add Car
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddCar;