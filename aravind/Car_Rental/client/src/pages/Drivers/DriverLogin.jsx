import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';

function DriverLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/employee/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Save JWT and username to localStorage
      localStorage.setItem('employeeToken', data.token);
      localStorage.setItem('employeeUsername', data.employee.username);

      // Redirect to employee dashboard
      navigate('/employeedashboard');
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <>
      <PageHeader />

      <section className="loginpanel">
        <div className="header-panel">
          <h1>Car Rentals - Driver Login Page</h1>
          <p>Please LOGIN To Continue</p>
        </div>

        <div className="login-form-container">
          <h3>Login</h3>
          {error && <p className="login-error">{error}</p>}
          <form onSubmit={handleLogin}>
            <label htmlFor="uname">
              <span className="text-red-600">*</span>&nbsp;Username
            </label>
            <input
              type="text"
              name="uname"
              id="uname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="pwd">
              <span className="text-red-600">*</span>&nbsp;Password
            </label>
            <input
              type="password"
              name="pwd"
              id="pwd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          <p className="text-center">OR</p>
          <Link to="/driverregister" className="create-account-link">
            Create a new account
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default DriverLogin;