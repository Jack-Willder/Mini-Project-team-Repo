import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

function Cars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cars");
        const data = await res.json();
        if (Array.isArray(data)) setCars(data);
        else if (Array.isArray(data.cars)) setCars(data.cars);
        else setCars([]);
      } catch (err) {
        console.error(err);
        setCars([]);
      }
    };

    fetchCars();
  }, []);

  const handleBook = (car) => {
    // Navigate to BookingCars page and pass car via state
    navigate("/bookingcars", { state: { selectedCar: car } });
  };

  return (
    <>
      <PageHeader />
      <section className="cars-page p-10">
        <h1 className="text-4xl font-bold text-center mb-8">All Cars</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.isArray(cars) && cars.length > 0 ? (
            cars.map((car) => (
              <div key={car._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <img
                  className="mb-2 h-48 w-full object-cover rounded"
                  src={`http://localhost:5000/uploads/cars/${car.carImage}`}
                  alt={car.carName}
                />
                <h4 className="text-lg font-medium mb-2">
                  {car.brand} - {car.carName}
                </h4>
                <p className="text-gray-600 mb-1">{car.description}</p>
                <p className="text-gray-600 mb-1">
                  AC Fare: Rs. {car.acFarePerKm}/km & Rs. {car.acFarePerDay}/day
                </p>
                <p className="text-gray-600 mb-1">
                  Non-AC Fare: Rs. {car.nonAcFarePerKm}/km & Rs. {car.nonAcFarePerDay}/day
                </p>
                <button
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  onClick={() => handleBook(car)}
                >
                  Book
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No cars available right now.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cars;
