import React from "react";
// import { Button } from "@material-tailwind/react";
// import type { ButtonProps } from "@material-tailwind/react";
import { io } from "socket.io-client";

const getCookieValue = (name) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
          return decodeURIComponent(cookieValue);
      }
  }
  return null;
};




const OwnerHomePage = ({ socket }) => {

  const [notifications, setNotifications] = React.useState(["No notifications!"]);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  socket = io('http://localhost:3001',{ transports: ["websocket"] });
  const notificationFinder = () => {
    if(dropdownVisible === false){
      setDropdownVisible(true);
      socket.emit("Notifications_owner", getCookieValue("email"))
    }
    else{
      setDropdownVisible(false);
    }
    
    
  }
  socket.on("notifications_owner",(data)=>{
    setNotifications(data);
  })

  
  
    

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleLogout = () => {
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login';
  };
  React.useEffect(() => {
    console.log("document cookie : ", document.cookie);
    console.log("cookie value : ", getCookieValue('email'));
    if (getCookieValue('email') === "" || getCookieValue('email') === null) {
        window.location.href = "/login";
    }
}, []);



  return (
    <>
      <div className="flex flex-wrap  h-screen">
        <section className="relative mx-auto">
          {/* <!-- navbar --> */}
          <nav className="flex justify-between bg-teal-600 text-black w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <a className="text-3xl font-bold font-heading" href="/ ">
                {/* <!-- <img className="h-9" src="logo.png" alt="logo"> --> */}
                CloudCar
              </a>
              {/* <!-- Nav Links --> */}
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li>
                  <a className="hover:text-gray-200" href="#">
                    How it Works
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-200" href="#">
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
              {/* <!-- Header Icons --> */}
              <div className="hidden xl:flex items-center space-x-3 items-center">
                {/* <a className="hover:text-gray-200" href="#" onClick={notificationFinder}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </a>
                <a
                  className="flex items-center hover:text-gray-200"
                  href="#"
                ></a> */}
                <a className="hover:text-gray-200" href="#" onClick={notificationFinder}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </a>
                {dropdownVisible && (
                <div className="absolute bg-white border border-gray-200 rounded-lg shadow-md z-10 w-100 top-35 left-60"> {/* Added w-64 for a width of 64px */}
                  {notifications.map((notification, index) => (
                    <div key={index} className="p-2">
                      <div>{notification.username}</div>
                      <div>{notification.message}</div>
                    </div>
                  ))}
                </div>
              )}
                {/* <!-- View-my-profile      --> */}
                {/* <a className="flex items-center hover:text-gray-200" href="#">
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
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a> */}
                <div className="relative inline-block text-left ml-auto">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="hover:text-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>

                  {/* Dropdown content */}
                  {isDropdownOpen && (
                    <div className="absolute top-0 right-0 mt-16 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                      <div className="py-1" role="none">
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>

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
        </section>

        <div className="dark-background relative w-screen h-screen bg-gradient-to-b from-gray-900 to-black"></div>
        {/* <div className="black-rectangle flex justify-center absolute w-1250 h-540 left-1/2 bg-black rounded-3xl" ></div> */}
      </div>
      {/* <div className="absolute w-1250 h-540 left-1/2 transform -translate-x-1/2 top-198 rounded-3xl" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/carimage.jpg)`, zIndex: 9999}}></div> */}
      <div
        className="absolute w-1250 h-540 left-1/2 transform -translate-x-1/2 top-198 rounded-3xl"
        style={{
          width: "90vw",
          height: "540px",
          top: "25.5%",
          backgroundImage: `url(${process.env.PUBLIC_URL}/original.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      
      <div
        className="Unlock-text absolute"
        style={{
          position: "absolute",
          width: "507px",
          height: "67px",
          left: "149px",
          top: "230px",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontWeight: 800,
          fontSize: "50px",
          lineHeight: "60px",
          color: "#FFFFFF",
        }}
      >
        Unlock the Potential of Your Idle Car!
      </div>
      <div
        className="Rent-it-out absolute"
        style={{
          position: "absolute",
          width: "442px",
          height: "47px",
          left: "149px",
          top: "358px",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontWeight: 800,
          fontSize: "35px",
          lineHeight: "35px",
          color: "#39A8A1",
        }}
      >
        Rent it out and earn from home, hassle-free.
      </div>

      <div
        className="list-a-car-button absolute"
        style={{
          position: "absolute",
          width: "300px",
          height: "47px",
          left: "149px",
          top: "68%",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontSize: "27px",
          lineHeight: "35px",
          
        }}
      >
        <button className="list-a-car rounded-full bg-teal-600 hover:bg-white text-black py-1 px-4" onClick={()=>{window.location.href="/newrenterform"}}>List a Car</button>
      </div>

      <div
        className="inbox-button absolute"
        style={{
          position: "absolute",
          width: "300px",
          height: "47px",
          left: "149px",
          top: "78%",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontSize: "27px",
          lineHeight: "35px",
          
        }}
      >
        <button className="inbox rounded-full bg-teal-600 hover:bg-white text-black py-1 px-4">Inbox</button>
      </div>

      <div
        className="view-bookings-button absolute"
        style={{
          position: "absolute",
          width: "300px",
          height: "47px",
          left: "149px",
          top: "88%",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontSize: "27px",
          lineHeight: "35px",
          
        }}
      >
        <button className="view-bookings rounded-full bg-teal-600 hover:bg-white text-black py-1 px-4" onClick={()=>{window.location.href='/renterhomepage'}}>Rent a car yourself!</button>
      </div>



    </>
  );
};

export default OwnerHomePage;

