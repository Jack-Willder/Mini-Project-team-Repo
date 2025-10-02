import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

function Home() {
  const [cars, setCars] = useState([]);

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

  return (
    <>
      <PageHeader />
      <section className="home text-center mt-5">
        <section className="banner"></section>
        <h1 className="text-center text-6xl text-green-800 mt-10 mb-5">
          <b>Find The Best</b> Car For You
        </h1>
        <p className="text-cyan-700 font-bold mt-6">
          Drive your dream car with comfort, style, and trust – explore our collection today.
        </p>

        <section className="p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.isArray(cars) && cars.length > 0 ? (
              cars.slice(0, 3).map((car) => (
                <div
                  key={car._id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <img
                    className="mb-2 h-48 w-full object-cover rounded"
                    src={`http://localhost:5000/uploads/cars/${car.carImage}`}
                    alt={car.carName}
                  />
                  <h4 className="text-lg font-medium mb-2">
                    {car.brand} - {car.carName}
                  </h4>
                  <p className="text-gray-600">
                    AC Fare: Rs. {car.acFarePerKm}/km & Rs. {car.acFarePerDay}/day
                  </p>
                  <p className="text-gray-600">
                    Non-AC Fare: Rs. {car.nonAcFarePerKm}/km & Rs. {car.nonAcFarePerDay}/day
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No cars available right now.</p>
            )}
          </div>

          {/* More Cars button */}
          <div className="mt-6">
            <Link to="/cars">
              <button className="text-white bg-blue-500 p-3 rounded hover:bg-blue-600 transition">
                More Cars
              </button>
            </Link>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default Home;
