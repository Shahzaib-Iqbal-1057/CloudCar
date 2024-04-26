import React from "react";
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};



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

const CarDetails = ({ socket }) => {
  const [car, setCar] = React.useState([]);

  const location = useLocation();

  const [modal, showModal] = React.useState(false);
  const [text, setText] = React.useState("");
  // Extract pathname, search, and hash from the location object
  const { pathname } = location;

  //Extracting carMake from the URL path
  const plateNumber = pathname.split("/")[2];
  console.log("plate number : ",plateNumber);
  React.useEffect(() => {
    socket.emit("availablecars", getCookieValue("username"));
  }, []);

  React.useEffect(() => {
    socket.on("availablecars", (data) => {
      // If there's a search query, filter the cars based on the search query
      console.log("plate number : ", plateNumber);
      const selectedCar = data.find(
        (car) => car.plateNumber.toLowerCase() === plateNumber.toLowerCase()
      );
      setCar(selectedCar);
    });
    socket.on("requestCar", (data) => {
      if (data === "successfull") {
        setText("Request sent successfully");
        showModal(true);
      }
      else {
        setText("Request failed");
        showModal(true);
      }
    })
    return () => {
      socket.off("availablecars");
      socket.off("requestCar")
    };
  }, [socket, plateNumber]); // Add searchQuery to the dependency array



  function sendBookingRequest() {
    console.log("sending data : ", car, getCookieValue("email"));
    socket.emit("requestCar", {
      car: car,
      renter: getCookieValue("email"),
    });
  }




  return (
    <>
      {modal ? <Modal
        open={modal}
        onClose={()=>{showModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Message:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
        </Box>
      </Modal> : 
      null}
      <div className="flex flex-wrap  h-screen">
        <section className="relative mx-auto">
          {/* <!-- navbar --> */}
          <nav className="flex justify-between bg-teal-600 text-black w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <div className="text-3xl font-bold font-heading" href="/ownerhomepage">
                CloudCar
              </div>
              {/* <!-- Nav Links --> */}
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li>
                  <a className="hover:text-gray-200" href="/how-it-works">
                    How it Works
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-200" href="/locations">
                    Locations
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-200" href="/about-us">
                    About Us
                  </a>
                </li>
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
            <div className="dark-background absolute inset-0 bg-gradient-to-b from-gray-900 to-black">

              <div className="max-w-7xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div
                    className="bg-cover bg-center bg-no-repeat w-3/2 h-3/2 mr-5"
                    style={{
                      backgroundImage: `url(${car.images})`,
                    }}
                  ></div>
              
                  {/* Right Column */}
                  <div className="product-content text-teal-600">
                    <h2 className="product-title text-6xl pb-10 pt-10">
                      {car.make} {car.model}
                    </h2>

                    <div className="product-detail">
                      <h2 className=" text-2xl text-white underline font-semibold">About this Item:</h2>
                      
                      <p className="text-xl mt-10 mb-10">
                        {console.log(car.description)}
                        {car.description}
                      </p>
                      
                      <ul>
                        <li>
                        <span className="font-semibold underline">Owner:</span> <span className="ml-5">{car.owner}</span>
                        </li>
                        
                        <li>
                          <span className="font-semibold underline">Price:</span> <span className="ml-5">Rs.{car.price}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="purchase-info pt-10">
                      <button class="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={sendBookingRequest}>
                        Confirm Booking
                      </button>

                      <button class="px-4 py-2 ml-5 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Inquire More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="black-rectangle flex justify-center absolute w-1250 h-540 left-1/2 bg-black rounded-3xl" ></div> */}
      </div>
    </>
  );
};

export default CarDetails;
