import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseTrack.css';
import "../Home/backgroundVideo"
import BackgroundVideo from '../Home/backgroundVideo';

const ProgrammingTracks = () => {
  return (
    <div className="programming-tracks-container">
      <BackgroundVideo />
      <h1 className="programming-tracks-header">Choose your programming track</h1>
      <Link to="/tracks" className="programming-track-link">
        <div className="programming-track">
          <div className="programming-track-content">
            <h2 className="programming-track-title">Web development</h2>
            <p className="programming-track-description">Learn to build websites and web applications.</p>
          </div>
          <div className="programming-track-status">
            <span className="programming-track-available">Available</span>
          </div>
        </div>
      </Link>
      <div className="programming-track">
        <div className="programming-track-content">
          <h2 className="programming-track-title">Game development</h2>
          <p className="programming-track-description">Learn to build games for different platforms.</p>
        </div>
        <div className="programming-track-status">
          <span className="programming-track-coming-soon">Coming soon</span>
        </div>
      </div>
      <div className="programming-track">
        <div className="programming-track-content">
          <h2 className="programming-track-title">Mobile app development</h2>
          <p className="programming-track-description">Learn to build apps for iOS and Android.</p>
        </div>
        <div className="programming-track-status">
          <span className="programming-track-coming-soon">Coming soon</span>
        </div>
      </div>
      <div className="programming-track">
        <div className="programming-track-content">
          <h2 className="programming-track-title">Fundamentals</h2>
          <p className="programming-track-description">Learn the basics of programming.</p>
        </div>
        <div className="programming-track-status">
          <span className="programming-track-coming-soon">Coming soon</span>
        </div>
      </div>
    </div>
  );
};

export default ProgrammingTracks;
