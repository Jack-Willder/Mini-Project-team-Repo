import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

function BookingCars() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCar = location.state?.selectedCar;

  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    carType: "With AC",
    chargeType: "Per Day",
    driver: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch drivers
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/drivers");
        const data = await res.json();
        const driverList = Array.isArray(data) ? data : data.drivers || [];
        setDrivers(driverList);
        if (driverList.length > 0) setFormData((p) => ({ ...p, driver: driverList[0].name }));
      } catch (err) {
        console.error("Error fetching drivers:", err);
      }
    };
    fetchDrivers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.startDate || !formData.endDate) {
      alert("Please select start and end dates");
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (end < start) {
      alert("End date cannot be before start date");
      return;
    }

    try {
      setLoading(true);
      const customerId = localStorage.getItem("customerId");
      if (!customerId) {
        alert("Please login first!");
        setLoading(false);
        return;
      }

      const bookingData = {
        car: selectedCar._id,
        customer: customerId,
        customerNumber: localStorage.getItem("username") || "Unknown",
        startDate: formData.startDate,
        endDate: formData.endDate,
        carType: formData.carType,
        chargeType: formData.chargeType,
        driver: formData.driver,
      };

      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("Car booked successfully!");
        navigate("/invoice", { state: { bookingDetails: data.booking } });
      } else {
        alert("Booking failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Booking error:", err);
      setLoading(false);
      alert("Something went wrong while booking.");
    }
  };

  return (
    <>
      <PageHeader />
      <div className="booking-page">
        <h1 className="page-title">Car Booking</h1>

        <div className="booking-card">
          <form onSubmit={handleSubmit}>
            <div className="line">
              <span className="label">Selected Car:</span>
              <span className="value">{selectedCar?.carName}</span>
            </div>

            <div className="line dates-line">
              <label className="small-label">Start Date:</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

              <label className="small-label">End Date:</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
            </div>

            <div className="line">
              <span className="label">Choose Car Type:</span>
              <label>
                <input type="radio" name="carType" value="With AC" checked={formData.carType === "With AC"} onChange={handleChange} /> With AC
              </label>
              <label>
                <input type="radio" name="carType" value="Without AC" checked={formData.carType === "Without AC"} onChange={handleChange} /> Without AC
              </label>
            </div>

            <div className="line">
              <span className="label">Charge Type:</span>
              <label>
                <input type="radio" name="chargeType" value="Per Day" checked={formData.chargeType === "Per Day"} onChange={handleChange} /> Per Day
              </label>
            </div>

            <div className="line">
              <label>Select Driver:</label>
              <select name="driver" value={formData.driver} onChange={handleChange}>
                {drivers.map((d) => (
                  <option key={d._id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="actions">
              <button type="submit" className="rent-btn" disabled={loading}>{loading ? "Booking..." : "RENT NOW"}</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookingCars;
