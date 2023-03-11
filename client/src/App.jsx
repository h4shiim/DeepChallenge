import React, { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client';
import Header from './components/Header/Navigations/Header/Header'
import Home from './components/Header/Navigations/Home/Home'
import Tracks from './components/Header/Navigations/Tracks/Tracks'
import Html from './components/Header/Navigations/Learnings/Html'
import Challenge from './components/Header/Navigations/Challenges/Challenge.jsx'
import RegisterForm from './components/Header/Navigations/Register/Register.jsx'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/html" element={<Html />} />
          <Route path="/challenges" element={<Challenge />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;