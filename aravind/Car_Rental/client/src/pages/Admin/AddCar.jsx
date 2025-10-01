import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function AddCar() {
  const [carData, setCarData] = useState({
    carName: "",
    vehicleNumber: "",
    acFarePerKm: "",
    nonAcFarePerKm: "",
    acFarePerDay: "",
    nonAcFarePerDay: "",
    insuranceStatus: "", // 'expired' or 'notExpired'
    carImage: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setCarData({ ...carData, [name]: files[0] });
    } else {
      setCarData({ ...carData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(carData);
    alert("Car added successfully!");
    // Send carData to backend via axios/fetch here
  };

  return (
    <>
    <PageHeader/>
    <div className="add-car-container">
      <h2>Please provide your car details</h2>
      <form className="add-car-form" onSubmit={handleSubmit}>
        <label>Car Name:</label>
        <input
          type="text"
          name="carName"
          value={carData.carName}
          onChange={handleChange}
          placeholder="Enter car name"
          required
        />

        <label>Vehicle Number Plate:</label>
        <input
          type="text"
          name="vehicleNumber"
          value={carData.vehicleNumber}
          onChange={handleChange}
          placeholder="Enter vehicle number"
          required
        />

        <label>AC Fare per km (Rs):</label>
        <input
          type="number"
          name="acFarePerKm"
          value={carData.acFarePerKm}
          onChange={handleChange}
          placeholder="AC fare per km"
          required
        />

        <label>Non-AC Fare per km (Rs):</label>
        <input
          type="number"
          name="nonAcFarePerKm"
          value={carData.nonAcFarePerKm}
          onChange={handleChange}
          placeholder="Non-AC fare per km"
          required
        />

        <label>AC Fare per day (Rs):</label>
        <input
          type="number"
          name="acFarePerDay"
          value={carData.acFarePerDay}
          onChange={handleChange}
          placeholder="AC fare per day"
          required
        />

        <label>Non-AC Fare per day (Rs):</label>
        <input
          type="number"
          name="nonAcFarePerDay"
          value={carData.nonAcFarePerDay}
          onChange={handleChange}
          placeholder="Non-AC fare per day"
          required
        />

        <label>Car Image:</label>
        <input type="file" name="carImage" onChange={handleChange} required />

        <div className="radio-group">
            <div className="radio-item">
                <input type="radio" name="insuranceStatus" value="expired" checked={carData.insuranceStatus === "expired"} onChange={handleChange} required />
                <label>Insurance Expired</label>
            </div>
            <div className="radio-item">
                <input type="radio" name="insuranceStatus" value="notExpired" checked={carData.insuranceStatus === "notExpired"} onChange={handleChange} />
                <label>Insurance Not Expired</label>
            </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Car
        </button>
      </form>
    </div>

    <Footer/>
    </>
  );
}

export default AddCar;
