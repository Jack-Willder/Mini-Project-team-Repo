import React from 'react'
import PageHeader from '../../components/PageHeader'
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

function EmpRegister() {
  return (
    <>
    <PageHeader/>

    <section className="loginpanel">
        <div className="header-panel bg-gray-400 p-5 text-center">
            <h1 className='text-6xl font-semibold text-white'>Car Rentals  -  Registration</h1><br />
            <p className='text-white text-3xl'>Get Started By Creating Employee Account</p> 
        </div>
        <div className="login-form-container">
            <h3>Create Account</h3>
            <form>
                <label htmlFor="Fullname"><span className='text-red-600'>*</span>&nbsp;Full Name</label>
                <input type="text" name="fname" id="fname" />
                <label htmlFor="username"><span className='text-red-600'>*</span>&nbsp;Username</label>
                <input type="text" name="uname" id="uname" />
                <label htmlFor="email"><span className='text-red-600'>*</span>&nbsp;Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="phno"><span className='text-red-600'>*</span>&nbsp;Phone</label>
                <input type="number" name="phno" id="phno" />
                <label htmlFor="address"><span className='text-red-600'>*</span>&nbsp;Address</label>
                <input type="text" name="address" id="address" />
                <label htmlFor="pwd"><span className='text-red-600'>*</span>&nbsp;Password</label>
                <input type="password" name="pwd" id="pwd" />
                <button>Register</button>
            <br />
            <p>OR</p>
            <Link to="/custregister">Have An Account? Login</Link>
            </form>
        </div>
    </section>

    <Footer/>
    </>
  )
}

export default EmpRegister