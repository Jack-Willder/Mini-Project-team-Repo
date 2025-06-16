import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Footer from "./components/Footer";
import Home from "./components/Home";
import PageHeader from "./components/PageHeader";
import Cars from './pages/Cars';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginModal from './pages/Login'; // import modal component

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <PageHeader openLoginModal={() => setShowLoginModal(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {showLoginModal && (
        <LoginModal closeModal={() => setShowLoginModal(false)} />
      )}

      <Footer />
    </>
  );
}

export default App;
