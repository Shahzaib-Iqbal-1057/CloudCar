import React from "react";

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


const ViewBookingsPage = ({socket}) => {
  const [bookings, setBookings] = React.useState([]);

  React.useEffect(() => {
    if (getCookieValue("email") === "" || getCookieValue("email") === null) {
        window.location.href = "/login";
    }
    

    socket.emit("viewBookings", { loggedInUser: getCookieValue("email") }); // Replace "username" with the actual logged-in user
    console.log("socket event sent")
    return () => {
      socket.off("ViewBookingsPage");
    };
  }, []);

  
  
  
  React.useEffect(()=> {
    socket.on("bookingsData", (data) => {
        console.log("data recieved from backend : ", data)
        setBookings(data.bookings);
    });  
    
    socket.on("bookingError", (error) => {
        console.error("Error fetching bookings:", error);
        // Handle error display or logging
      });

  },[socket])







  const ProductObject = (props) =>{

  const handleCardClick = (plateNumber) => {
    // Construct the URL for the product details page
    const productUrl = `/cardetails/${plateNumber}`; // Assuming product ID is used for the URL
    // Navigate to the product details page
    // window.location.href = productUrl;
    console.log("new constructed product url", productUrl);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

      {bookings.map((booking) => (
        <div
          key={booking.rentalId}
          className="h-48 relative rounded-md shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-110 cursor-pointer"
          onClick={() => handleCardClick(booking.car)}
        >
          {/* right half of the product card */}
          <div
            className="bg-cover bg-center bg-no-repeat w-1/2 h-full absolute right-0"
            style={{ backgroundImage: `url(${booking.ownerImages[0]})` }}
          ></div>

          {/* left half of the product cards */}
          <div className="h-48 relative rounded-md shadow-md overflow-hidden bg-teal-600 transform transition-transform duration-300 hover:scale-100">
            <div
              className="bg-cover bg-center bg-no-repeat w-1/2 h-full absolute right-0"
              style={{ backgroundImage: `url(${booking.renterImages[0]})` }}
            ></div>
            <div className="absolute inset-0 w-1/2 p-4 text-black flex flex-col justify-between rounded-md">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  <span className="font-semibold underline">Car</span>:{" "}
                  <span className="text-gray-300">{booking.car}</span>
                </h3>
                <div className="flex flex-col mt-10">
                  <span className="text-black">
                    <span className="font-semibold underline">Model</span>:{" "}
                    <span className="text-gray-300">{booking.model}</span>
                  </span>
                  <span className="text-black">
                    <span className="font-semibold underline">Owner</span>:{" "}
                    <span className="text-gray-300">{booking.owner}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

return (
    <>
      <div className="flex flex-wrap  h-screen">
        <section className="relative mx-auto">
          {/* <!-- navbar --> */}
          <nav className="flex justify-between bg-teal-600 text-black w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <a className="text-3xl font-bold font-heading" href="#">
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
                  <a className="hover:text-gray-200" href="#">
                    About Us
                  </a>
                </li>
                {/* <li><a className="hover:text-gray-200" href="#">Contact Us</a></li> */}
              </ul>
              {/* <!-- Header Icons --> */}
              <div className="hidden xl:flex items-center space-x-5 items-center">
                <a className="hover:text-gray-200" href="#">
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
                ></a>
                {/* <!-- View-my-profile      --> */}
                <a className="flex items-center hover:text-gray-200" href="#">
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
          
          <div className="relative w-screen h-screen">
          
            <div className="dark-background absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center">
            <h1 className="px-5 py-5 text-4xl font-bold text-teal-600">My Bookings</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-7 mt-5 mb-5 relative z-10">
                {bookings.map((product) => (
                  <a href={`/cardetails/${product.plateNumber}`} key={product.id}><ProductObject product={product}/></a>
                  
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* <div className="black-rectangle flex justify-center absolute w-1250 h-540 left-1/2 bg-black rounded-3xl" ></div> */}
      </div>
    </>
  );

};

export default ViewBookingsPage;
