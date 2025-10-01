import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function ManageCars() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars");
      if (res.data.success) setCars(res.data.cars);
    } catch (err) {
      console.error(err);
      alert("Error fetching cars");
    }
  };

  const handleUpdate = (car) => {
    navigate("/updatecars", { state: { car } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      alert("Car deleted successfully!");
      fetchCars(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Error deleting car");
    }
  };

  return (
    <>
      <PageHeader />
      <div className="manage-cars-container">
        <h1 className="header">My Cars</h1>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Number Plate</th>
                <th>AC Fare (/km)</th>
                <th>Non AC Fare (/km)</th>
                <th>AC Fare (/day)</th>
                <th>Non AC Fare (/day)</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={car._id}>
                  <td>{index + 1}</td>
                  <td>{car.carName}</td>
                  <td>{car.vehicleNumber}</td>
                  <td>{car.acFarePerKm}</td>
                  <td>{car.nonAcFarePerKm}</td>
                  <td>{car.acFarePerDay}</td>
                  <td>{car.nonAcFarePerDay}</td>
                  <td>
                    <div className="operation-buttons">
                      <button
                        className="update-btn"
                        onClick={() => handleUpdate(car)}
                      >
                        Update
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(car._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ManageCars;
