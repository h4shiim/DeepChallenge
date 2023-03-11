import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <h1 className="homeTitle">Welcome to Web Development Interactive Learning</h1>
      <p className="homeDescription">
        Our website is designed to help you learn web development in an interactive and engaging way. 
        With a focus on hands-on coding exercises, you'll be able to put your knowledge into practice 
        and build real projects.
      </p>
      <h2 className="homeSubtitle">What You'll Learn</h2>
      <ul className="homeList">
        <li>HTML, CSS, and JavaScript basics</li>
        <li>Responsive design and layout</li>
        <li>React and other front-end frameworks</li>
        <li>Backend development with Node.js and Express</li>
        <li>Database management with MongoDB</li>
      </ul>
      <p className="homeDescription">
        Whether you're a beginner just starting out, or an experienced developer looking to expand your skills,
        our comprehensive curriculum has you covered. Our interactive lessons and projects are designed to 
        challenge you and keep you engaged as you progress through the course material.
      </p>
      <h2 className="homeSubtitle">Get Started Today</h2>
      <p className="homeDescription">
        Sign up now and start learning web development with us. With new lessons and projects added regularly, 
        you'll never run out of new things to learn and build. Join the thousands of students who have already 
        transformed their careers and built the websites of their dreams.
      </p>
      <Link to="/register">
      <button className="homeButton">Sign Up</button>
      </Link>
    </div>
  );
};

export default Home;
