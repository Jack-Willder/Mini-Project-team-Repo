import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./Pages/Jobs";
import Companies from "./Pages/Companies";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AdminLogin from "./pages/admin/AdminLogin";
import JobseekerLogin from "./Pages/JobSeeker/JobseekerLogin";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path="/JobSeeker/login" element={<JobseekerLogin/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}
