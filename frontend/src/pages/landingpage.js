import React from 'react';
import styles from '../styles/landingpage.css'; 
import { Helmet } from 'react-helmet';

const LandingPage = () => {

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleSignup = () => {
    window.location.href = "/signup";
  };

  // ... other handlers

  return (
    <>
      <Helmet>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <nav className='navbar'>
        <div className='logo'>CloudCar</div>
        <div className='navLinks'>
          <a href="how-it-works">How it works</a>
          <a href="locations">Locations</a>
          <a href="about-us">About Us</a>
        </div>
        <div className='authLinks'>
          <button onClick={handleLogin} className='loginBtn'>Log in</button>
          <button onClick={handleSignup} className='signupBtn'>Sign up</button>
        </div>
      </nav>
      <div className='hero'>
        <h1>
          <span className="highlighted-text">Rent</span> Cars Near You
        </h1>
        <p>
          Convenient <span className="highlighted-text">hourly</span> and <span className="highlighted-text">daily</span> rentals. Insurance included.
        </p>
      </div>
    </>
  );
}

export default LandingPage;
