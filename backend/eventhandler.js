import Car from './models/car.js';
import User from './models/user.js';
import Image from './models/image.js';
import Post from './models/formpost.js';
import Rental from './models/rental.js';
import Chat from './models/chat.js'; //imported the DB models here, will use the models to interact with the database
import bcrypt from 'bcrypt'; // for hashing the passwords






const eventHanlder = (socket, io) => {


    socket.on("myEvent", (myData) => {
        console.log('Received myMessage:', myData);
        io.to(socket.id).emit("myEvent", myData);
    });

    socket.on("signup",(data)=>{
        console.log("signup data",data)
        //signup logic here(will be using the database here)

        //Following is an example of how database will be accessed and used to store the data
        // const newUser = new User({
        //     username : data.username,
        //     password: hashedPassword, 
        //     //other data
        // }); 
        // const savedUser = await newUser.save(); 
    })

    socket.on("login",(data)=>{
        console.log("login data",data)
        //Login logic here(will be using the database here)

              


    })

    //more even hanlders here which will receive data from the client and respond depending upon the situation


};
export default eventHanlder;