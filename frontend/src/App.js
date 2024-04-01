import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {io} from "socket.io-client"
import Login from "./pages/login";
import Signup from "./pages/signup";
import LandingPage from "./pages/landingpage";
import SignupRenter from './pages/signuprenter';
import OwnerHomePage from './pages/ownerhomepage.js';
import RenterHomepage from './pages/renterhomepage';
import RenterForm from './pages/renterform';
import AvailableCars from './pages/availableCars';
import ListedCars from './pages/listedCars.js';
import HowItWorks from './pages/howItWorks.js';
import Locations from './pages/locations.js';
import AboutUs from './pages/aboutUs.js';
import NewRenterForm from './pages/newrenterform.js';
import ProductFormPage from './pages/ownerform.js';
const socket = io('http://localhost:3001',{ transports: ["websocket"] });


function App() {

  React.useEffect(()=>{
    socket.connect()
  },[])
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage socket = {socket}/>} /> {/*This is our default landing page, user will be redirected to a different page if they are not logged in*/}
          <Route path="/login" element={<Login socket = {socket}/>} />
          <Route path="/signup" element={<Signup socket = {socket}/>} />
          <Route path="/signuprenter" element={<SignupRenter socket = {socket}/>} />
          <Route path="/renterhomepage" element={<RenterHomepage socket = {socket}/>} />
          <Route path="/ownerhomepage" element={<OwnerHomePage socket = {socket}/>} />
          <Route path='/renterform' element = {<RenterForm socket = {socket}/>}/>
          <Route path='/availablecars' element = {<AvailableCars socket = {socket}/>}/>
          <Route path='/listedcars' element = {<ListedCars socket = {socket}/>}/>
          <Route path='/how-it-works' element = {<HowItWorks />}/>
          <Route path='/locations' element = {<Locations />}/>
          <Route path='/about-us' element = {<AboutUs />}/>
          <Route path='/newrenterform' element = {<NewRenterForm socket={socket}/>}/>
          <Route path = '/productform' element = {<ProductFormPage socket = {socket}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
