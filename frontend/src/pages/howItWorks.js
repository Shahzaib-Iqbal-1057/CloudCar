import React from 'react';

function Header() {


  const getCookieValue = (name) => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if(cookieName.trim() === name.trim()) {
        return cookieValue.trim();
      }
    }
    return null;
    };


  function handleClick() {
    
    if(getCookieValue("email") === null) {
      window.location.href = "/ "
    }
    else{
      window.location.href = "/ownerhomepage "
    }
  }

  return (
    <>
      {/* Section 1 */}
      <nav className="flex justify-between bg-teal-600 text-black w-screen">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <div className="text-3xl font-bold font-heading cursor-pointer" onClick={handleClick}>
            {" "}
            CloudCar{" "}
          </div>
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
            <a className="hover:gray-200" href="login">
              <svg
                className="w-6 h-6 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8L16 12M16 12L12 16M16 12H3M3.33782 7C5.06687 4.01099 8.29859 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.29859 22 5.06687 19.989 3.33782 17"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a className="flex items-center hover:text-gray-200" href="#"></a>

            {/* <!-- Sign Up   --> */}
            <a
              className="flex items-center hover:text-gray-700 transition-colors"
              href="signup"
            >
              <svg
                fill="#000000"
                className="h-6 w-6 hover:text-gray-200"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 612 612"
              >
                <path
                  d="M269.272,310.198c86.177-0.005,117.184-86.291,125.301-157.169C404.572,65.715,363.282,0,269.272,0
                        C175.274,0,133.963,65.71,143.97,153.029C152.095,223.907,183.093,310.204,269.272,310.198z"
                />
                <path
                  d="M457.707,346.115c2.773,0,5.528,0.083,8.264,0.235c-4.101-5.85-8.848-11.01-14.403-15.158
                        c-16.559-12.359-38.005-16.414-56.964-23.864c-9.229-3.625-17.493-7.226-25.251-11.326
                        c-26.184,28.715-60.329,43.736-100.091,43.74c-39.749,0-73.891-15.021-100.072-43.74c-7.758,4.101-16.024,7.701-25.251,11.326
                        c-18.959,7.451-40.404,11.505-56.964,23.864c-28.638,21.375-36.039,69.46-41.854,102.26c-4.799,27.076-8.023,54.707-8.964,82.209
                        c-0.729,21.303,9.789,24.29,27.611,30.721c22.315,8.048,45.356,14.023,68.552,18.921c44.797,9.46,90.973,16.729,136.95,17.054
                        c22.278-0.159,44.601-1.956,66.792-4.833c-16.431-23.807-26.068-52.645-26.068-83.695
                        C309.995,412.378,376.258,346.115,457.707,346.115z"
                />
                <path
                  d="M457.707,375.658c-65.262,0-118.171,52.909-118.171,118.171S392.444,612,457.707,612s118.172-52.909,118.172-118.171
                        C575.878,428.566,522.969,375.658,457.707,375.658z M509.407,514.103h-31.425v31.424c0,11.198-9.077,20.276-20.274,20.276
                        c-11.198,0-20.276-9.078-20.276-20.276v-31.424h-31.424c-11.198,0-20.276-9.077-20.276-20.276
                        c0-11.198,9.077-20.276,20.276-20.276h31.424v-31.424c0-11.198,9.078-20.276,20.276-20.276c11.198,0,20.274,9.078,20.274,20.276
                        v31.424h31.425c11.198,0,20.276,9.078,20.276,20.276C529.682,505.027,520.606,514.103,509.407,514.103z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

function Main() {
  return (
    // <main className="bg-gradient-to-b from-gray-900 via-gray-700 to-black mt-0 w-full flex flex-col items-center">
    //   <div className="max-w-4xl mx-4 mt-10">
    <main className="bg-gradient-to-b from-gray-900 via-gray-700 to-black mt-0 w-full flex flex-col items-center pb-16">
      <div className="max-w-4xl mx-4 mt-10">
        <h2 id="how-it-works" className="text-xl font-bold text-white border-b border-white pb-1">How It Works</h2>
        <p className="mt-4 text-white text-md">If you are here to earn money just upload the car details you want to rent and wait for someone to request your car. Provide the keys and it's done. If you are here to rent a car just choose the dates and select a car and it's done. You can see step wise details too!</p>
        
        <h2 id="advantages" className="mt-8 text-xl font-bold text-white border-b border-white pb-1">Renter</h2>
        
        <div className="flex flex-col sm:flex-row sm:-m-4">
          
          <div className="sm:w-1/3 mt-4">
            <div className="h-full border-b-4 border-teal-500 bg-teal-600 flex flex-col items-center p-8 rounded-lg text-center sm:m-4 sm:p-3">
              <div className="bg-gray-200 rounded-full text-indigo-700 w-16 h-16 p-2">
        
                <svg style={{ fill: "black" }} className="h-12 w-12 color-orange" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="online-shopping">
                  <path d="M9.802 16.806a.5.5 0 0 1-.5.5H7.117v.71a.615.615 0 0 0 .614.615h.613a.5.5 0 0 1 0 1h-.613a1.616 1.616 0 0 1-1.614-1.614V3.974A1.616 1.616 0 0 1 7.73 2.36h7.423a1.616 1.616 0 0 1 1.614 1.614v9.93a.5.5 0 0 1-1 0v-9.93a.615.615 0 0 0-.614-.614h-3.211v.179a.5.5 0 0 1-1 0v-.18H7.73a.615.615 0 0 0-.614.615v12.332h2.185a.5.5 0 0 1 .5.5Zm7.72-1.19-2.65-.412v-2.849a1.445 1.445 0 0 0-2.891 0v3.127l-1.466 2.223a2.743 2.743 0 0 0-.184 2.677l.94 1.973a.5.5 0 0 0 .902-.43l-.94-1.973a1.74 1.74 0 0 1 .116-1.696l.632-.958v1.353a.5.5 0 0 0 1 0v-6.296a.445.445 0 0 1 .89 0v3.278c0 .015.008.028.009.042a.485.485 0 0 0 .025.123.475.475 0 0 0 .032.069.43.43 0 0 0 .124.15.476.476 0 0 0 .081.054.483.483 0 0 0 .097.036.465.465 0 0 0 .052.019l3.076.479a.62.62 0 0 1 .515.66l-.379 4.836a.499.499 0 0 0 .46.538.535.535 0 0 0 .04.001.5.5 0 0 0 .496-.46l.38-4.838a1.624 1.624 0 0 0-1.357-1.725ZM9.756 9.01l-.414 3.707 1.139.063a.5.5 0 0 1 0 1H9.399a1.057 1.057 0 0 1-1.053-1.16l.358-3.656a1.055 1.055 0 0 1 1.052-.954h.462v-.56a1.313 1.313 0 1 1 2.627 0v.56h.285a1.053 1.053 0 0 1 1.047.948l.041.425a.5.5 0 0 1-.45.545.407.407 0 0 1-.049.002.5.5 0 0 1-.497-.452l-.04-.42-1.741-.048Zm1.462-1h.627v-.56a.313.313 0 1 0-.627 0Z" data-name="Online Shopping"></path>
                </svg>                
              
              </div>
                
              <div className="font-bold mt-4">Open the website</div>
              <div className="mt-4 text-gray-600 text-sm tracking-wide">Land onto the CloudCar website and login. If you are a new user you can register easily.</div>
            </div>
          </div>

          <div className="sm:w-1/3 mt-4">
            <div className="h-full border-b-4 border-teal-500 bg-teal-600 flex flex-col items-center p-8 rounded-lg text-center sm:m-4 sm:p-3">
              <div className="bg-gray-200 rounded-full text-indigo-700 w-16 h-16 p-2">
                
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 48 48" id="search">
                <path d="M46.599 40.236L36.054 29.691C37.89 26.718 39 23.25 39 19.5 39 8.73 30.27 0 19.5 0S0 8.73 0 19.5 8.73 39 19.5 39c3.75 0 7.218-1.11 10.188-2.943l10.548 10.545a4.501 4.501 0 0 0 6.363-6.366zM19.5 33C12.045 33 6 26.955 6 19.5S12.045 6 19.5 6 33 12.045 33 19.5 26.955 33 19.5 33z"></path>
              </svg>
                
              </div>
              
              <div className="font-bold mt-4">Search for the Car</div>
              <div className="mt-4 text-gray-600 text-sm tracking-wide">Search to choose a car among many of the listed cars.</div>
            </div>
          </div>

          <div className="sm:w-1/3 mt-4">
            <div className="h-full border-b-4 border-teal-500 bg-teal-600 flex flex-col items-center p-8 rounded-lg text-center sm:m-4 sm:p-3">
              <div className="bg-gray-200 rounded-full text-indigo-700 w-16 h-16 p-2">
                
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" id="done">
                <path fill="none" d="M0 0h24v24H0V0z"></path><path d="M20.47 5.63c.39.39.39 1.01 0 1.4L9.13 18.37c-.39.39-1.01.39-1.4 0l-4.2-4.2c-.39-.39-.39-1.01 0-1.4.39-.39 1.01-.39 1.4 0l3.5 3.5L19.07 5.63c.39-.39 1.01-.39 1.4 0zm-2.11-2.12l-9.93 9.93-2.79-2.79c-.78-.78-2.05-.78-2.83 0l-1.4 1.4c-.78.78-.78 2.05 0 2.83l5.6 5.6c.78.78 2.05.78 2.83 0L22.59 7.74c.78-.78.78-2.05 0-2.83l-1.4-1.4c-.79-.78-2.05-.78-2.83 0z"></path>
              </svg>  
                
              </div>
              <div className="font-bold mt-4">Book the Car</div>
              <div className="mt-4 text-gray-600 text-sm tracking-wide">Once chosen, book the car by entering some details for specific dates.</div>
            </div>
          </div>

        </div>


        <h2 id="advantages" className="mt-10 text-xl font-bold text-white border-b border-white pt-4 pb-1">Owner</h2>
        
        <div className="flex flex-col sm:flex-row sm:-m-4">
        
          <div className="sm:w-1/3 mt-4">
            <div className="h-full border-b-4 border-teal-500 bg-teal-600 flex flex-col items-center p-8 rounded-lg text-center sm:m-4 sm:p-3">
              <div className="bg-gray-200 rounded-full text-indigo-700 w-16 h-16 p-2">
            
                <svg style={{ fill: "black" }} className="h-12 w-12 color-orange" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="online-shopping">
                  <path d="M9.802 16.806a.5.5 0 0 1-.5.5H7.117v.71a.615.615 0 0 0 .614.615h.613a.5.5 0 0 1 0 1h-.613a1.616 1.616 0 0 1-1.614-1.614V3.974A1.616 1.616 0 0 1 7.73 2.36h7.423a1.616 1.616 0 0 1 1.614 1.614v9.93a.5.5 0 0 1-1 0v-9.93a.615.615 0 0 0-.614-.614h-3.211v.179a.5.5 0 0 1-1 0v-.18H7.73a.615.615 0 0 0-.614.615v12.332h2.185a.5.5 0 0 1 .5.5Zm7.72-1.19-2.65-.412v-2.849a1.445 1.445 0 0 0-2.891 0v3.127l-1.466 2.223a2.743 2.743 0 0 0-.184 2.677l.94 1.973a.5.5 0 0 0 .902-.43l-.94-1.973a1.74 1.74 0 0 1 .116-1.696l.632-.958v1.353a.5.5 0 0 0 1 0v-6.296a.445.445 0 0 1 .89 0v3.278c0 .015.008.028.009.042a.485.485 0 0 0 .025.123.475.475 0 0 0 .032.069.43.43 0 0 0 .124.15.476.476 0 0 0 .081.054.483.483 0 0 0 .097.036.465.465 0 0 0 .052.019l3.076.479a.62.62 0 0 1 .515.66l-.379 4.836a.499.499 0 0 0 .46.538.535.535 0 0 0 .04.001.5.5 0 0 0 .496-.46l.38-4.838a1.624 1.624 0 0 0-1.357-1.725ZM9.756 9.01l-.414 3.707 1.139.063a.5.5 0 0 1 0 1H9.399a1.057 1.057 0 0 1-1.053-1.16l.358-3.656a1.055 1.055 0 0 1 1.052-.954h.462v-.56a1.313 1.313 0 1 1 2.627 0v.56h.285a1.053 1.053 0 0 1 1.047.948l.041.425a.5.5 0 0 1-.45.545.407.407 0 0 1-.049.002.5.5 0 0 1-.497-.452l-.04-.42-1.741-.048Zm1.462-1h.627v-.56a.313.313 0 1 0-.627 0Z" data-name="Online Shopping"></path>
                </svg>
              
              </div>
              
              <div className="font-bold mt-4">Open Website</div>
              <div className="mt-4 text-gray-600 text-sm tracking-wide">Land onto the CloudCar website and login. If you are a new user you can register easily.</div>
            </div>
          </div>
        
        
          <div className="sm:w-1/3 mt-4">
            <div className="h-full border-b-4 border-teal-500 bg-teal-600 flex flex-col items-center p-8 rounded-lg text-center sm:m-4 sm:p-3">
              <div className="bg-gray-200 rounded-full text-indigo-700 w-16 h-16 p-2">
                
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="upload">
                <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 22.05V11A4 4 0 0 1 7 7H25a4 4 0 0 1 4 4V22.05M26 28.9s-10.67 2.27-9.6-14.76"></path><line x1="11.07" x2="16.4" y1="20.95" y2="13" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="21.73" x2="16.4" y1="20.95" y2="13" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line>
              </svg>
                
              </div>
              
              <div className="font-bold mt-4">Upload Details</div>
              <div className="mt-4 text-gray-600 text-sm tracking-wide">Upload the details of the car along with its pictures to make it available for rent.</div>
            </div>
          </div>


          <div className="sm:w-1/3 mt-4">
            <div className="h-full border-b-4 border-teal-500 bg-teal-600 flex flex-col items-center p-8 rounded-lg text-center sm:m-4 sm:p-3">
              <div className="bg-gray-200 rounded-full text-indigo-700 w-16 h-16 p-2">
                
              <svg height="45" width="45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="money">
                <path d="M16 17c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"></path><path d="M16.4 13.2h-.8a2.613 2.613 0 0 1-2.493-1.864 1 1 0 1 1 1.918-.565c.075.253.312.43.575.43h.8a.6.6 0 0 0 0-1.201h-.8C14.166 10 13 8.833 13 7.4s1.166-2.6 2.6-2.6h.8c1.121 0 2.111.714 2.466 1.778a1 1 0 1 1-1.897.633.598.598 0 0 0-.569-.411h-.8a.6.6 0 0 0 0 1.2h.8c1.434 0 2.6 1.167 2.6 2.6s-1.166 2.6-2.6 2.6z"></path><path d="M16 6c-.271 0-.521-.11-.71-.29-.04-.05-.09-.1-.12-.16a.556.556 0 0 1-.09-.17.672.672 0 0 1-.061-.18C15.01 5.13 15 5.07 15 5c0-.26.109-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.45.29.71 0 .07-.01.13-.021.2a.606.606 0 0 1-.06.18.578.578 0 0 1-.09.17c-.04.06-.08.11-.12.16-.189.18-.449.29-.709.29zm0 8c-.271 0-.521-.11-.71-.29-.04-.05-.09-.1-.12-.16a.556.556 0 0 1-.09-.17.672.672 0 0 1-.061-.18c-.009-.07-.019-.13-.019-.2 0-.26.109-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.45.29.71 0 .07-.01.13-.021.2a.606.606 0 0 1-.06.18.578.578 0 0 1-.09.17c-.04.06-.08.11-.12.16-.189.18-.449.29-.709.29zm2 17H2a1 1 0 0 1-1-1v-9c0-.265.105-.52.293-.707C1.527 20.058 3.653 18 6 18c1.944 0 4.452 1.469 5.295 2H16a3.004 3.004 0 0 1 2.955 3.519l7.891-3.288a2.995 2.995 0 0 1 2.818.273A2.993 2.993 0 0 1 31 23a1 1 0 0 1-.496.864l-12 7A1.003 1.003 0 0 1 18 31zM3 29h14.729l11.14-6.498a1.01 1.01 0 0 0-.314-.334.984.984 0 0 0-.939-.091l-9.23 3.846A1.007 1.007 0 0 1 18 26h-8a1 1 0 1 1 0-2h6a1.001 1.001 0 0 0 0-2h-5c-.197 0-.391-.059-.555-.167C9.68 21.323 7.387 20 6 20c-1.09 0-2.347.88-3 1.439V29z"></path>
              </svg>
                
                </div>
              <div className="font-bold mt-4">Earn</div>
              <div className="mt-4 text-gray-600 text-sm tracking-wide">Once booked by a renter, the renter will pay you for the car.</div>
            </div>
          </div>
        </div>

        <h2 id="form" className="mt-8 text-xl font-bold text-white border-b border-white pt-4 pb-1">Ask Us</h2>
        <form className="mt-4">
          <div className="flex flex-col sm:flex-row">
            <input type="text" placeholder="Your Name" className="w-full sm:w-1/2 px-3 py-2 border border-gray-400 rounded-lg mb-2 sm:mr-2" />
            <input type="email" placeholder="Your Email" className="w-full sm:w-1/2 px-3 py-2 border border-gray-400 rounded-lg mb-2 sm:ml-2" />
          </div>
          <textarea placeholder="Message" className="w-full px-3 py-2 border border-gray-400 rounded-lg mb-2" rows="4"></textarea>
          {/* <button type="submit" className="w-full bg-teal-600 text-indigo-100 py-2 px-4 font-bold rounded-full text-base hover:bg-teal-500 transition duration-500">ASK</button> */}
          <div className="flex justify-center items-center ">
            <button type="submit" className="w-1/3 bg-teal-600 text-indigo-100 py-2 px-4 font-bold rounded-full text-base hover:bg-teal-500 transition duration-500">
              ASK
            </button>
          </div>

        </form>


      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="py-6 bg-teal-600 text-center text-indigo-200">
      <p>&copy; 2023 Tailwind CSS Course. All rights reserved.</p>
    </footer>
  );
}

function HowItWorks() {
  return (
    <div>
      <Header />
      <Main />
      {/* <Footer /> */}
    </div>
  );
}

export default HowItWorks;
