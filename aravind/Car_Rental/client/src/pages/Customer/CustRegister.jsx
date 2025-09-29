import React from 'react'
import PageHeader from '../../components/PageHeader'
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

function CustRegister() {
  return (
    <>
      <PageHeader />

      <section className="loginpanel">
        <div className="header-panel">
          <h1>Car Rentals  -  Registration</h1>
          <p>Get Started By Creating Customer Account</p>
        </div>

        <div className="login-form-wrap">
          <div className="login-card">
            <div className="login-card-header">Create Account</div>

            <form className="login-card-body" onSubmit={(e)=>e.preventDefault()}>
              <label htmlFor="fname"><span className="required">*</span>Full Name:</label>
              <input type="text" id="fname" name="fname" placeholder="Your Full Name" />

              <label htmlFor="uname"><span className="required">*</span>Username:</label>
              <input type="text" id="uname" name="uname" placeholder="Your Username" />

              <label htmlFor="email"><span className="required">*</span>Email:</label>
              <input type="email" id="email" name="email" placeholder="Email" />

              <label htmlFor="phno"><span className="required">*</span>Phone:</label>
              <input type="tel" id="phno" name="phno" placeholder="Phone" />

              <label htmlFor="address"><span className="required">*</span>Address:</label>
              <input type="text" id="address" name="address" placeholder="Address" />

              <label htmlFor="pwd"><span className="required">*</span>Password:</label>
              <input type="password" id="pwd" name="pwd" placeholder="Password" />

              <div className="actions-row">
                <button type="submit" className="submit-btn">SUBMIT</button>
              </div>

              <p className="alt">
                or<br />
                Have an account? <Link to="/custlogin">Login</Link>.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default CustRegister