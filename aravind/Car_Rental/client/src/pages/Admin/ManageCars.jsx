import React from "react";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

function ManageCars() {
  // Example car data
  const cars = [
    {
      id: 1,
      name: "Toyota Camry",
      numberPlate: "TN-01-AB-1234",
      acFarePerKm: 15,
      nonAcFarePerKm: 10,
      acFarePerDay: 1200,
      nonAcFarePerDay: 900,
      availability: "Available",
    },
    {
      id: 2,
      name: "Honda City",
      numberPlate: "TN-02-XY-5678",
      acFarePerKm: 12,
      nonAcFarePerKm: 8,
      acFarePerDay: 1000,
      nonAcFarePerDay: 750,
      availability: "Rented",
    },
  ];

  const handleUpdate = (id) => {
    console.log("Update car id:", id);
    // Add your update logic or navigation here
  };

  const handleDelete = (id) => {
    console.log("Delete car id:", id);
    // Add your delete logic here
  };

  return (
    <>
    <PageHeader/>
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
              <th>Availability</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={car.id}>
                <td>{index + 1}</td>
                <td>{car.name}</td>
                <td>{car.numberPlate}</td>
                <td>{car.acFarePerKm}</td>
                <td>{car.nonAcFarePerKm}</td>
                <td>{car.acFarePerDay}</td>
                <td>{car.nonAcFarePerDay}</td>
                <td>{car.availability}</td>
                <td>
                    <div className="operation-buttons">
                        <button
                        className="update-btn"
                        onClick={() => handleUpdate(car.id)}
                        >
                        Update
                        </button>
                        <button
                        className="delete-btn"
                        onClick={() => handleDelete(car.id)}
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
    <Footer/>
    </>
  );
}

export default ManageCars;
