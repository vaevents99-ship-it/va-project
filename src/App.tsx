// src/App.tsx

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import { Catalog } from './pages/Catalog';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;