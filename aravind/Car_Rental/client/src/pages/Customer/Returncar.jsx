import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function ReturnCar() {
  // Example booked cars data
  const bookedCars = [
    { id: 1, car: "Toyota Camry", startDate: "2025-10-01", endDate: "2025-10-05", fare: 5000 },
    { id: 2, car: "Honda City", startDate: "2025-10-10", endDate: "2025-10-12", fare: 3000 },
  ];

  return (
    <>
    <PageHeader/>
    <div className="return-car-container">
      <div className="return-header">
        <h1>Return Your Cars Here</h1>
        <p>Hope You Enjoyed our service</p>
      </div>

      <div className="return-table">
        <table>
          <thead>
            <tr>
              <th>Car</th>
              <th>Rent Start Date</th>
              <th>Rent End Date</th>
              <th>Fare (Rs)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookedCars.map((car) => (
              <tr key={car.id}>
                <td>{car.car}</td>
                <td>{car.startDate}</td>
                <td>{car.endDate}</td>
                <td>{car.fare}</td>
                <td>
                  <Link to={`/return/${car.id}`} className="return-link">
                    Return
                  </Link>
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

export default ReturnCar;
