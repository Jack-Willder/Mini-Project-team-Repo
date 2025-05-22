import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/PageHeader';
import Home from './components/Home';
import JobPost from './components/JobPost';
import Footer from './components/Footer';

import Jobs from './pages/Jobs';
import Companies from './pages/Companies';
import Contact from './pages/Contact';
import PostingJobs from './pages/JobSeeker/PostingJobs';
import AboutCompany from './pages/AboutCompany';

import Adminlogin from './pages/admin/Adminlogin';

function App() {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <JobPost />
            </>
          }
        />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/about/:name" element={<AboutCompany />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/PostingJobs" element={<PostingJobs />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;