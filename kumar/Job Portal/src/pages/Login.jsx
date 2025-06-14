import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
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

      {/* Login Page */}
      <div class="loginform">
        <h2>Welcome To Login Page</h2>
        <form>
          <label for="email"><b>Email: </b></label><br />
          <input type="email" id="email" name="email" required /><br />
          <label for="password"><b>Password: </b></label><br />
          <input type="password" id="password" name="password" required /><br />
          <input type="checkbox" name="showpwd" id="showpwd" />&nbsp;Show Password<br/>
          <button type="submit">Login</button>
        </form>
        <p class="registerlink">Don't have an account? <a href="register.html">Register here</a></p>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Jobzy | Designed By <Link to="/adminlogin" className="footer-link">RK</Link></p>
      </footer>
    </>
  )
}

export default Login