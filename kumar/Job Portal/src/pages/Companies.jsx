import { Link } from "react-router-dom";
import React, { useState } from "react";

function Companies() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const companies = [
    {
      name: "Microsoft",
      description:
        "Microsoft is a technology company known for Windows, Office, and Azure.",
    },
    {
      name: "Apple",
      description:
        "Apple designs consumer electronics like the iPhone, Mac, and services like iCloud.",
    },
    {
      name: "Infosys",
      description:
        "Infosys is a global IT consulting and services company based in India.",
    },
    {
      name: "TCS",
      description:
        "Tata Consultancy Services (TCS) provides IT services, consulting, and business solutions.",
    },
    {
      name: "Zoho",
      description:
        "Zoho provides a suite of online productivity tools and SaaS applications.",
    },
  ];
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

      {/* COMPANY */}
      <section className="companies-section">
        <h3>Explore Companies</h3>
        <div className="companies-grid">
          {companies.map((company, idx) => (
            <div key={idx} className="company-card">
              <img
                src={`/img/company/${company.name.toLowerCase()}.jpg`}
                alt={company.name}
              />
              <h4>{company.name}</h4>
              <button
                className="about-btn"
                onClick={() => setSelectedCompany(company)}
              >
                About
              </button>
            </div>
          ))}
        </div>

        {/* Modal Page */}
        {selectedCompany && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <h3>{selectedCompany.name}</h3>
              <p>{selectedCompany.description}</p>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedCompany(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Jobzy | Designed By <Link to="/adminlogin" className="footer-link">RK</Link></p>
      </footer>
    </>
  );
}

export default Companies;
