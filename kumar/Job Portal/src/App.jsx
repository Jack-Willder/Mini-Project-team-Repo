import { Routes, Route } from 'react-router-dom';
import './App.css';

import PageHeader from './components/PageHeader';
import Home from './components/Home';
import Footer from './components/Footer';

import AboutCompany from './pages/AboutCompany';
import AboutUs from './pages/AboutUs';
import Companies from './pages/Companies';
import Contact from './pages/Contact';
import Jobs from './pages/Jobs';

import AdminLogin from './pages/Admin/AdminLogin';
import PostingJobs from './pages/JobSeeker/PostingJobs';
import Dashboard from './pages/Admin/Dashboard';

function App() {
  return (
    <div className="font-sans text-gray-800">
      <PageHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/about/:name" element={<AboutCompany />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/postingjobs" element={<PostingJobs />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
