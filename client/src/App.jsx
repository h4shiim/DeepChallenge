import React from 'react'
import Header from './components/Header/Navigations/Header/Header'
import Home from './components/Header/Navigations/Home/Home'
import Tracks from './components/Header/Navigations/Tracks/Tracks'
import Html from './components/Header/Navigations/Learnings/Html'
import Challenges from './components/Header/Navigations/Challenges/Challenges.jsx'
import Register from './components/Header/Navigations/Register/Register.jsx'
import Footer from './components/Footer/Footer'
import Login from './components/Header/Navigations/Register/Login.jsx';
import Profile from './components/Header/Navigations/Register/Profile.jsx';
import ChooseTrack from './components/Header/Navigations/Tracks/ChooseTrack.jsx';
import Payment from './components/Payments/Payment.jsx';
import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from './components/Header/Navigations/Contact/ContactUs'

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/html" element={<Html />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/choosetrack" element={<ChooseTrack />} />
          <Route
            render={({ location }) => {
              if (location.pathname === '/tracks') {
                return null;
              }

              return <Footer />;
            }}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
