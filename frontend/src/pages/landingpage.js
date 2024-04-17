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
      <nav className="flex justify-between bg-teal-600 text-black w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <a className="text-3xl font-bold font-heading" href="/"> CloudCar </a>
              {/* <!-- Nav Links --> */}
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li>
                  <a className="hover:text-gray-200" href="how-it-works">
                    How it Works
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-200" href="locations">
                    Locations
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-200" href="about-us">
                    About Us
                  </a>
                </li>
                {/* <li><a className="hover:text-gray-200" href="#">Contact Us</a></li> */}
              </ul>

              {/* <!-- Log In --> */}
              <div className="hidden xl:flex items-center space-x-3 items-center">
                <a className="hover:text-gray-200" href="login">
              
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8L16 12M16 12L12 16M16 12H3M3.33782 7C5.06687 4.01099 8.29859 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.29859 22 5.06687 19.989 3.33782 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                </a>
                <a
                  className="flex items-center hover:text-gray-200"
                  href="#"
                ></a>
                
                
                {/* <!-- Sign Up   --> */}
                <a className="flex items-center hover:text-gray-200" href="signup">
                  <svg fill="#000000" className="h-6 w-6 hover:text-gray-200" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  
                    viewBox="0 0 612 612">
                      <path d="M269.272,310.198c86.177-0.005,117.184-86.291,125.301-157.169C404.572,65.715,363.282,0,269.272,0
                        C175.274,0,133.963,65.71,143.97,153.029C152.095,223.907,183.093,310.204,269.272,310.198z"/>
                      <path d="M457.707,346.115c2.773,0,5.528,0.083,8.264,0.235c-4.101-5.85-8.848-11.01-14.403-15.158
                        c-16.559-12.359-38.005-16.414-56.964-23.864c-9.229-3.625-17.493-7.226-25.251-11.326
                        c-26.184,28.715-60.329,43.736-100.091,43.74c-39.749,0-73.891-15.021-100.072-43.74c-7.758,4.101-16.024,7.701-25.251,11.326
                        c-18.959,7.451-40.404,11.505-56.964,23.864c-28.638,21.375-36.039,69.46-41.854,102.26c-4.799,27.076-8.023,54.707-8.964,82.209
                        c-0.729,21.303,9.789,24.29,27.611,30.721c22.315,8.048,45.356,14.023,68.552,18.921c44.797,9.46,90.973,16.729,136.95,17.054
                        c22.278-0.159,44.601-1.956,66.792-4.833c-16.431-23.807-26.068-52.645-26.068-83.695
                        C309.995,412.378,376.258,346.115,457.707,346.115z"/>
                      <path d="M457.707,375.658c-65.262,0-118.171,52.909-118.171,118.171S392.444,612,457.707,612s118.172-52.909,118.172-118.171
                        C575.878,428.566,522.969,375.658,457.707,375.658z M509.407,514.103h-31.425v31.424c0,11.198-9.077,20.276-20.274,20.276
                        c-11.198,0-20.276-9.078-20.276-20.276v-31.424h-31.424c-11.198,0-20.276-9.077-20.276-20.276
                        c0-11.198,9.077-20.276,20.276-20.276h31.424v-31.424c0-11.198,9.078-20.276,20.276-20.276c11.198,0,20.274,9.078,20.274,20.276
                        v31.424h31.425c11.198,0,20.276,9.078,20.276,20.276C529.682,505.027,520.606,514.103,509.407,514.103z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* <!-- Responsive navbar --> */}
            
             <a className="xl:hidden flex mr-6 items-center" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </a>
            <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </a> 
          </nav>
      
      {/* <nav className='navbar'>
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
      </nav> */}

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
