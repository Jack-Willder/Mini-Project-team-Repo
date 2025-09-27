import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Cars from './pages/Cars';
import CustLogin from './pages/Customer/custlogin';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';
import CustRegister from './pages/Customer/CustRegister';
import BoookingCars from './pages/Customer/BoookingCars';
import ViewBookings from './pages/Customer/MyBookings';
import DriverLogin from './pages/Drivers/DriverLogin';
import DriverRegister from './pages/Drivers/DriverRegister';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/driverlogin" element={<DriverLogin/>}/>
        <Route path="custlogin" element={<CustLogin/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/Admindashboard" element={<Dashboard />} />
        <Route path="/driverregister" element={<DriverRegister/>}/>
        <Route path="/custregister" element={<CustRegister/>}/>
        <Route path='/bookingcars' element={<BoookingCars/>}/>
        <Route path='/mybookings' element={<ViewBookings/>}/>
      </Routes>
    </>
  );
}

export default App;
