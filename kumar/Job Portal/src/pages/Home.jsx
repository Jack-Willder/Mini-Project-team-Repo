import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";

function Home() {
  const jobCategories = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Data Scientist',
    'Project Manager',
    'DevOps Engineer',
    'Mobile App Developer',
    'AI/ML Engineer',
    'QA Tester',
  ];

  const [index, setIndex] = useState(0);
  const visibleCount = 2;

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (index < jobCategories.length - visibleCount) setIndex(index + 1);
  };

  return (
    <>
      {/* HEADER */}
      <div className="page-header">
        <nav className="navbar">
          <h1 className="logo">Job<span className="logo-accent">Zy</span></h1>
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/jobs" className="nav-link">Jobs</Link></li>
            <li><Link to="/companies" className="nav-link">Companies</Link></li>
            <li><Link to="/about" className="nav-link">About Us</Link></li>
            <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
            <Link to="/login"><button className="login-button">Login</button></Link>
          </ul>
        </nav>
      </div>

      {/* SEARCH */}
      <div className="search-bar">
        <p className="tagline">📄 No.1 Job Hunt Website</p>
        <h2 className="main-heading">Search Apply & Get Your <span className="highlight">Dream Job</span></h2>
        <p className="description">Explore thousands of job listings and connect with top companies.</p>
        <div className="search-input">
          <input type="text" placeholder="Find Your Dream Job" className="input-field" />
          <button className="search-button"><FaMagnifyingGlass /></button>
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="categories-section">
        <h3 className="categories-title">Categories</h3>
        <p className="categories-subtitle">Explore our extensive job market.</p>
        <div className="categories-slider">
          <button onClick={handlePrev} className="slider-arrow"><FiArrowLeft /></button>
          <div className="slider-container">
            <div className="slider-track" style={{ '--translate-x': `-${index * 200}px` }}>
              {jobCategories.map((category, idx) => (
                <button key={idx} className="category-button">{category}</button>
              ))}
            </div>
          </div>
          <button onClick={handleNext} className="slider-arrow"><FiArrowRight /></button>
        </div>
      </section>

      {/* TOP COMPANIES */}
      <section className="top-companies">
        <h2 className="section-title">Top Companies</h2>
        <marquee behavior="scroll" direction="left">
          <div className="company-logos">
            <img src="img/company/zoho.jpg" alt="Zoho" />
            <img src="img/company/apple.jpg" alt="Apple" />
            <img src="img/company/tcs.jpg" alt="TCS" />
            <img src="img/company/Microsoft.jpg" alt="Microsoft" />
            <img src="img/company/infosys.jpg" alt="Infosys" />
          </div>
        </marquee>
      </section>

      {/* LATEST JOBS */}
      <section className="latest-jobs">
        <h3 className="section-title"><span className="highlight">Latest & Top </span>Job Openings</h3>
        <div className="job-list">Jobs Display Pannanum minimum 3 to 4</div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Jobzy | Designed By <Link to="/adminlogin" className="footer-link">RK</Link></p>
      </footer>
    </>
  );
}

export default Home;