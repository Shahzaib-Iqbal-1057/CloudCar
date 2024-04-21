import React from "react";
import { io } from "socket.io-client";
import { HiOutlineArrowCircleRight } from "react-icons/hi";

const getCookieValue = (name) => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName.trim() === name.trim()) {
      return cookieValue.trim();
    }
  }
  return null;
};

const RenterHomePage = ({ socket }) => {
  const [notifications, setNotifications] = React.useState(["No notifications!"]);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  socket = io('http://localhost:3001',{ transports: ["websocket"] });
  const notificationFinder = () => {
    if(dropdownVisible === false){
      setDropdownVisible(true);
      socket.emit("Notifications_renter", getCookieValue("email"))
    }
    else{
      setDropdownVisible(false);
    }
    
  }
  socket.on("notifications_renter",(data)=>{
    setNotifications(data);
  })

  React.useEffect(() => {
    if (getCookieValue("email") === "" || getCookieValue("email") === null) {
      window.location.href = "/login";
    }
  }, []);


  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleLogout = () => {
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login';
  };

  const [searchQuery, setSearchQuery] = React.useState("");

  // Function to handle search button click
  const handleSearchCars = (e) => {
    console.log("searchQuery jaa rahi hai");
    e.preventDefault();
    // Emit the search query to the backend
    socket.emit("handleSearchCars", searchQuery);
  };

  React.useEffect(() => {
    // Listen for search results from the backend
    socket.on("searchResultCars", ({ cars, redirectUrl, error }) => {
      if (error) {
        console.error("Error fetching search results:", error);
        // Handle error if needed
      } else if (cars && redirectUrl) {
        // Redirect to available cars page with search results
        window.location.href = `${redirectUrl}?searchQuery=${encodeURIComponent(
          searchQuery
        )}`;
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("searchResults");
    };
  }, [socket, searchQuery]);

  return (
    <>
      <div className="flex flex-wrap  h-screen">
        <section className="relative mx-auto">
          <nav className="flex justify-between bg-teal-600 text-black w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <a
                className="text-3xl font-bold font-heading"
                href="ownerhomepage"
              >
                CloudCar
              </a>
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
              <div className="hidden xl:flex items-center space-x-5 items-center">
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
                <a
                  className="flex items-center hover:text-gray-200"
                  href="#"
                ></a>
                {/* <!-- View-my-profile      --> */}
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
          backgroundImage: `url(${process.env.PUBLIC_URL}/renterhomepage.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* <div className="Unlock-text absolute text-white">Unlock the Potential of Your Idle Car!</div> */}
      <div
        className="Rent-cars-text absolute"
        style={{
          position: "absolute",
          width: "507px",
          height: "67px",
          left: "930px",
          top: "230px",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontWeight: 300,
          fontSize: "50px",
          lineHeight: "60px",
          color: "#FFFFFF",
          fontFamily: "Poppins"
        }}
      >
        Rent Cars Near You!
      </div>
      <div
        className="Convenient-hours absolute"
        style={{
          position: "absolute",
          width: "500px",
          height: "47px",
          left: "930px",
          top: "300px",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontWeight: 800,
          fontSize: "30px",
          lineHeight: "35px",
          color: "#39A8A1",
          fontFamily: "Poppins"
        }}
      >
        Convenient hours and daily rentals. Insurance included.
      </div>

      <div
        className="search-bar absolute"
        style={{
          position: "absolute",
          left: "930px",
          top: "400px",
          width: "30%",
        }}
      >
        <form class="max-w-md mx-auto" onSubmit={handleSearchCars}>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="renter-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by Location, Date, or Car Model"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              //onClick={(e) => {e.preventDefault(); window.location.href = "/availablecars"}}
              class="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-black dark:hover:bg-teal-600 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
          <button
                  type="submit"
                  className="mt-8 flex justify-center items-center gap-2 w-1/2 py-3 px-4 bg-teal-700 text-black text-md font-bold border border-black rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-teal-500 md:px-6"
                  title="Register"
                  onClick={() => {window.location.href = "/view-bookings";}}
                  >
                  <span>Your bookings</span>
                  <HiOutlineArrowCircleRight size={20} />
                </button>
        </form>
      </div>
    </>
  );
};

export default RenterHomePage;
