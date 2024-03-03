import React from 'react';
import styles from '../styles/landingpage.css'; // rename the CSS file to use .module.css

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
      <nav className='navbar'>
        <div className='logo'>CloudCar</div>
        <div className='navLinks'>
          <a href="#how-it-works">How it works</a>
          <a href="#locations">Locations</a>
          <a href="#about-us">About Us</a>
        </div>
        <div className='authLinks'>
          <button onClick={handleLogin}>Log in</button>
          <button onClick={handleSignup} className={styles.signupBtn}>Sign up</button>
        </div>
      </nav>
      <div className='hero'>
        <h1>Rent Cars Near You</h1>
        <p>Convenient hourly and daily rentals. Insurance included.</p>
      </div>
    </>
  );
}

export default LandingPage;
