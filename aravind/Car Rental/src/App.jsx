import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from "./components/Footer";
import Home from "./components/Home";
import PageHeader from "./components/PageHeader";
import Cars from './pages/Cars';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <PageHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
