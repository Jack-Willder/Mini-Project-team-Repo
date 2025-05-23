import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

import Contact from './pages/Contact';
import Products from './pages/Products';
import About from './pages/about'; // Capitalized for consistency

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
