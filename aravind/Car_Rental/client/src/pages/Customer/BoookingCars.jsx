import React, { useState } from "react";
function BookingCars({ selectedCar }) {
  // Default values from props
  const [formData, setFormData] = useState({
    carName: selectedCar?.name || "",
    numberPlate: selectedCar?.numberPlate || "",
    startDate: selectedCar?.startDate || "",
    endDate: selectedCar?.endDate || "",
    carType: "",
    chargeType: "",
    driver: "",
    gender: "",
    contact: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Booking Submitted:", formData);

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(" Booking Successful!");
        setFormData({
          ...formData,
          carType: "",
          chargeType: "",
          driver: "",
          gender: "",
          contact: "",
        });
      } else {
        alert("Failed to book car");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Server error");
    }
  };

  return (
    <div className="booking-container">
      <h2 className="booking-title">Book Your Car</h2>

      <div className="booking-form">
        <form onSubmit={handleSubmit}>
          {/* Selected Car */}
          <div className="form-group">
            <label htmlFor="carName">Selected Car</label>
            <input
              type="text"
              name="carName"
              value={formData.carName}
              disabled
            />
          </div>

          {/* Number Plate */}
          <div className="form-group">
            <label htmlFor="numberPlate">Number Plate</label>
            <input
              type="text"
              name="numberPlate"
              value={formData.numberPlate}
              disabled
            />
          </div>

          {/* Dates */}
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              disabled
            />
          </div>

          {/* Car Type */}
          <div className="form-group">
            <label>Choose Car Type</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="carType"
                  value="With AC"
                  checked={formData.carType === "With AC"}
                  onChange={handleChange}
                />{" "}
                With AC
              </label>
              <label>
                <input
                  type="radio"
                  name="carType"
                  value="Without AC"
                  checked={formData.carType === "Without AC"}
                  onChange={handleChange}
                />{" "}
                Without AC
              </label>
            </div>
          </div>

          {/* Charge Type */}
          <div className="form-group">
            <label>Charge Type</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="chargeType"
                  value="Per KM"
                  checked={formData.chargeType === "Per KM"}
                  onChange={handleChange}
                />{" "}
                Per KM
              </label>
              <label>
                <input
                  type="radio"
                  name="chargeType"
                  value="Per Day"
                  checked={formData.chargeType === "Per Day"}
                  onChange={handleChange}
                />{" "}
                Per Day
              </label>
            </div>
          </div>

          {/* Driver */}
          <div className="form-group">
            <label htmlFor="driver">Select Driver</label>
            <select
              name="driver"
              value={formData.driver}
              onChange={handleChange}
            >
              <option value="">Choose Driver</option>
              <option value="Driver1">Driver 1</option>
              <option value="Driver2">Driver 2</option>
            </select>
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Enter Gender"
            />
          </div>

          {/* Contact */}
          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input
              type="number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter Contact Number"
            />
          </div>

          {/* Submit */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingCars;
