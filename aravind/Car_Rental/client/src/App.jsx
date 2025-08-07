import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Cars from './pages/Cars';
import EmpLogin from './pages/Employee/emplogin';
import CustLogin from './pages/Customer/custlogin';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';
import EmpRegister from './pages/Employee/EmpRegister';
import CustRegister from './pages/Customer/CustRegister';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/emplogin" element={<EmpLogin/>}/>
        <Route path="custlogin" element={<CustLogin/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/empregister" element={<EmpRegister/>}/>
        <Route path="/custregister" element={<CustRegister/>}/>
      </Routes>
    </>
  );
}

export default App;
