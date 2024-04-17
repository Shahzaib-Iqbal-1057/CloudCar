import React from 'react';
import { Helmet } from 'react-helmet';
import styles from '../styles/login.css'; 

function Login({ socket }) {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: ""
  });

  function changeLoginData(e) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Emit the login event with loginData
    socket.emit("login", loginData);

    document.cookie = `email=${loginData.email};path=/`;
    
    // Remove console.log before production
    console.log(loginData);
  }

  React.useEffect(() => {
    socket.on("login", (status) => {
      if (status === "successfull") {
        alert("login successfull");
        window.location.href = '/ownerhomepage';
      } else {
        alert("incorrect username or password");
      }
    });
    return () => {
      socket.off("login");
    };
  }, [socket]);

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
    <div className="login-container">
      <div className="login-form-container">
      <a href="/" className="login-title">CloudCar</a>
        <h2 className="login-subtitle">Log in</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={changeLoginData}
            placeholder="Email"
            className="login-input"
            required
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={changeLoginData}
            placeholder="Password"
            className="login-input"
            required
          />
          <div className="login-checkbox">
            <input type="checkbox" id="stay-logged-in" />
            <label htmlFor="stay-logged-in">Stay logged in</label>
          </div>
          <button type="submit" className="login-button">Login</button>
          <div className="login-links">
            <a href="/forgotpassword" className="login-link">Forgot my password</a>
            <a href="/signup" className="login-link">Don't have an account? Sign up</a>
          </div>
        </form>
      </div>
      </div>
</>
  );
}

export default Login;
