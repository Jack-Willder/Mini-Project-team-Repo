import { Routes, Route } from 'react-router-dom';
import './App.css';


import Header from './components/Header'
import Footer from './components/Footer'
import Body from "./components/Body"


import contact from './pages/contact'
import products from './pages/products'
import about from './pages/about'
function App() 
{

  return (
    <>
      <Header/>
            <Routes>
        <Route
          path="/"
          element={
            <>
              <Body />
            </>
          }
        />
        <Route path="/about" element={<about />} />
        <Route path="/contact" element={<contact />} />
        <Route path="/products" element={<products />} />
       
      </Routes>
      <Footer />
    </>
  )
}

export default App
