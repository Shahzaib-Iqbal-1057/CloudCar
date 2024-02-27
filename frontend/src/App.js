import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {io} from "socket.io-client"
import Homepage from "./pages/hompage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import LandingPage from "./pages/landingpage";
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
          <Route path="/homepage" element={<Homepage socket = {socket}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
