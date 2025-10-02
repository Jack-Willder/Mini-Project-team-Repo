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
import CustomerDashboard from './pages/Customer/CustomerDashboard';
import AddCar from './pages/Admin/AddCar';
// import ReturnCar from './pages/Customer/Returncar';
import Invoice from './pages/Customer/Invoice';
import ManageCars from './pages/Admin/ManageCars';
import UpdateCar from './pages/Admin/UpdateCars';
import AddDriver from './pages/Admin/AddDriver';
import ManageDrivers from './pages/Admin/ManageDriver';
import UpdateDriver from './pages/Admin/UpdateDriver';
import ViewBookings from './pages/Admin/ViewBookings';
import ViewReports from './pages/Admin/ViewReports';
import MyBookings from './pages/Customer/MyBookings';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="custlogin" element={<CustLogin/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/Admindashboard" element={<Dashboard />} />
        <Route path="/custregister" element={<CustRegister/>}/>
        <Route path='/bookingcars' element={<BoookingCars/>}/>
        <Route path='/customer-dashboard' element={<CustomerDashboard/>}/>
        <Route path='/addcars' element={<AddCar/>}/>
        {/* <Route path='/returncar' element={<ReturnCar/>}/> */}
        <Route path='/invoice' element={<Invoice/>}/>
        <Route path='/managecars' element={<ManageCars/>}/>
        <Route path='/updatecars' element={<UpdateCar/>}/>
        <Route path='/adddriver' element={<AddDriver/>}/>
        <Route path='/managedrivers' element={<ManageDrivers/>}/>
        <Route path='/updatedriver' element={<UpdateDriver/>}/>
        <Route path='/viewbookings' element={<ViewBookings/>}/>
        <Route path='/viewreports' element={<ViewReports/>}/>
        <Route path='mybookings' element={<MyBookings/>}/>
      </Routes>
    </>
  );
}

export default App;
