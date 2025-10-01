import React, { useState } from "react";

function BookingCars({ selectedCar }) {
  const [formData, setFormData] = useState({
    carName: selectedCar?.name || "Octavia",
    numberPlate: selectedCar?.numberPlate || "TN12L2425",
    startDate: selectedCar?.startDate || "2024-03-15",
    endDate: selectedCar?.endDate || "2024-03-22",
    carType: "With AC",
    chargeType: "Per Day",
    driver: "Sakthi",
  });

  const drivers = [
    { name: "Sakthi", gender: "Male", contact: "7845298540" },
    { name: "Mydeen", gender: "Male", contact: "7744213908" },
    { name: "Darwin", gender: "Male", contact: "9427909864" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with real submit logic
    console.log("Booking Submitted:", formData);
    alert("Booking submitted (demo)");
  };

  return (
    <div className="booking-page">
      <h1 className="page-title">Car Booking</h1>

      <div className="booking-card">
        <form onSubmit={handleSubmit}>
          <div className="line">
            <span className="label">Selected Car:</span>
            <span className="value">{formData.carName}</span>
          </div>

          <div className="line">
            <span className="label">Number Plate:</span>
            <span className="value">{formData.numberPlate}</span>
          </div>

          <div className="line dates-line">
            <label className="small-label">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              disabled
            />
            <label className="small-label">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="line">
            <span className="label">Choose your car type:</span>
            <div className="inline-controls">
              <label className="radio-label">
                <input
                  type="radio"
                  name="carType"
                  value="With AC"
                  checked={formData.carType === "With AC"}
                  onChange={handleChange}
                />{" "}
                With AC
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="carType"
                  value="Without AC"
                  checked={formData.carType === "Without AC"}
                  onChange={handleChange}
                />{" "}
                With-Out AC
              </label>
            </div>
          </div>

          <div className="fare-block">
            <div className="fare-title">Fare:</div>
            <div className="fare-line">
              <strong>AC:</strong> Rs. 35/km and Rs. 7000/day
            </div>
            <div className="fare-line">
              <strong>NON-AC:</strong> Rs. 27/km and Rs. 6500/day
            </div>
          </div>

          <div className="line">
            <span className="label">Charge type:</span>
            <div className="inline-controls">
              <label className="radio-label">
                <input
                  type="radio"
                  name="chargeType"
                  value="Per KM"
                  checked={formData.chargeType === "Per KM"}
                  onChange={handleChange}
                />{" "}
                per KM
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="chargeType"
                  value="Per Day"
                  checked={formData.chargeType === "Per Day"}
                  onChange={handleChange}
                />{" "}
                per day
              </label>
            </div>
          </div>

          <div className="line">
            <label className="label">Select a driver:</label>
            <select
              name="driver"
              value={formData.driver}
              onChange={handleChange}
              className="driver-select"
            >
              {drivers.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="driver-list">
            {drivers.map((d) => (
              <div className="driver-item" key={d.name}>
                <div>
                  <span className="small-label">Driver Name:</span>{" "}
                  <span className="value">{d.name}</span>
                </div>
                <div>
                  <span className="small-label">Gender:</span> {d.gender}
                </div>
                <div>
                  <span className="small-label">Contact:</span>{" "}
                  <strong>{d.contact}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="actions">
            <button type="submit" className="rent-btn">
              RENT NOW
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingCars;
