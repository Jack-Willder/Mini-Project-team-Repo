import React from 'react'
import PageHeader from '../../components/PageHeader'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

function CustLogin() {
  return (
    <>
    <PageHeader/>

    <section className="loginpanel">
        <div className="header-panel bg-gray-400 p-5 text-center">
            <h1 className='text-6xl font-semibold text-white'>Car Rentals  -  Customer Panel</h1><br />
            <p className='text-white text-3xl'>Please LOGIN To Continue</p> 
        </div>
        <div className="login-form-container">
            <h3>Login</h3>
            <form>
                <label htmlFor="Uname"><span className='text-red-600'>*</span>&nbsp;Username</label>
                <input type="text" name="uname" id="uname" />
                <label htmlFor="pwd"><span className='text-red-600'>*</span>&nbsp;Password</label>
                <input type="password" name="pwd" id="pwd" />
                <button>Login</button>
            <br />
            <p>OR</p>
            <Link to="/custregister">Create a new account</Link>
            </form>
        </div>
    </section>

    <Footer/>
    </>
  )
}

export default CustLogin