import express from 'express';
const app = express();
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import eventHanlder from './eventhandler.js';
import dotenv from 'dotenv';
dotenv.config();


app.use(cors())
const server = http.createServer(app)
const io = new Server(
    server,{cors:{
        origin:"https://vercel.com/umer-jamils-projects/cloud-car-38j4",
        methods: ["GET", "POST"]
    },
})

//connecting to mongoDB
mongoose.connect(process.env.MONG_URI)
 .then(()=>{ console.log("Connected to the database")} )
 .catch((error)=>{
    console.log(error)
})


server.listen(3001, ()=>{
    console.log("SERVER IS LISTENING ON PORT 3001")
})


io.on("connection",(socket)=>{
    console.log("Socket connected", socket.id)
    
    eventHanlder(socket,io)

})

