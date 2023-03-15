import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <h3>About Us</h3>
            <p>
            Deep Challenge is a modern online learning platform that aims to revolutionize the way people learn programming. Our mission is to make programming education accessible to everyone, no matter their age or background. We provide high-quality, interactive courses and challenges that are designed to engage and challenge learners of all levels. Join us today and start your journey towards becoming a skilled programmer!.{" "}
            </p>
          </div>
          <div className="col-md-6 col-lg-4 quick">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/register">Sign up</a>
              </li>
              <li>
                <a href="/login">Sign in</a>
              </li>
              <li>
                <a href="/challenges">Challenges</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-4">
            {/* <h3>Contact Us</h3>
            <ul>
              <li>
                <i className="fa fa-map-marker"></i> 123 Main St, New York, NY
              </li>
              <li>
                <i className="fa fa-phone"></i> +1 (555) 555-5555
              </li>
              <li>
                <i className="fa fa-envelope"></i>{" "}
                <a href="mailto:info@example.com">deepchallenge@dc.com</a>
              </li>
            </ul> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <hr />
            <p className="text-center">
              &copy; {new Date().getFullYear()} My Website. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
