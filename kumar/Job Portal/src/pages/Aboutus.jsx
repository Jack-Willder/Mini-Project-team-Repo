import { Link } from "react-router-dom";

function AboutUs() {
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

      {/* ABOUT US */}
      <div className="about-container">
        <h1 className="main-title">About Our Job Portal</h1>
        <p className="paragraph">
          Welcome to <span className="font-semibold">Jobzy</span>, your trusted platform for finding the perfect job and recruiting top talent.
        </p>
        <p className="paragraph mb-large">
          Our mission is to bridge the gap between job seekers and employers by providing an easy-to-use, reliable, and fast online job portal.
        </p>

        <h2 className="section-title">What We Offer</h2>
        <ul className="features-list">
          <li>Thousands of job listings across various industries.</li>
          <li>User-friendly job search with advanced filters.</li>
          <li>Easy application process with resume upload and tracking.</li>
          <li>Employer dashboard for posting jobs and managing applications.</li>
          <li>Career advice and resources to help you grow professionally.</li>
        </ul>

        <h2 className="section-title">Contact Us</h2>
        <p>
          Have questions? Reach out at <span className="contact-email">support@jobzy.com</span>
        </p>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Jobzy | Designed By <Link to="/adminlogin" className="footer-link">RK</Link></p>
      </footer>
    </>
  );
}

export default AboutUs;
