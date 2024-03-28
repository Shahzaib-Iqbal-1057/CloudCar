import Car from './models/car.js';
import User from './models/user.js';
import Image from './models/image.js';
import Post from './models/formpost.js';
import Rental from './models/rental.js';
import Chat from './models/chat.js'; //imported the DB models here, will use the models to interact with the database
import bcrypt from 'bcrypt'; // for hashing the passwords
import verifyData from './helperFunctions.js';





const eventHanlder = (socket, io) => {


    socket.on("myEvent", (myData) => {
        console.log('Received myMessage:', myData);
        io.to(socket.id).emit("myEvent", myData);
    });

    socket.on("signup",async (data)=>{

        console.log("signup data recieved : ", data)
        const data_verification_response = await verifyData(data);
        if(data_verification_response === "username_already_exists"){
            io.to(socket.id).emit("signup", "username_already_exists")
            return;
        }

        if(data_verification_response === "weak_password"){
            io.to(socket.id).emit("signup", "weak_password")
            return;
        }

        if(data_verification_response === "invalid_phone_number_length"){
            io.to(socket.id).emit("signup", "invalid_phone_number_length")
            return;
        }
        if(data_verification_response === "invalid_phone_number_type"){
            io.to(socket.id).emit("signup", "invalid_phone_number_type")
            return;
        }
        if(data_verification_response === "invalid_email"){
            io.to(socket.id).emit("signup", "invalid_email")
            return;
        }

        if(data_verification_response !== "user_verified"){
            io.to(socket.id).emit("signup", "failed")
            return;
        }
        
        //signup logic here(will be using the database here)

        //Following is an example of how database will be accessed and used to store the data
        console.log("about to store user : ", data)
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const newUser = new User({
                email : data.email,
                password: hashedPassword, 
                phone: data.phone,
                address: data.address,
                role: "customer",
                displayName: data["display name"],
                //other data
            }); 
            const savedUser = await newUser.save(); 
            console.log('User signed up:', savedUser);
            io.to(socket.id).emit("signup", "successfull")
        }
        catch(error) {
            console.log("error signing up",error)
            io.to(socket.id).emit("signup", "failed")
        }
    })

    socket.on("login",async (data)=>{
        console.log("login data",data)
        //Login logic here(will be using the database here)

        try {
            const { email, password } = data;
            console.log("login data recieved : ", email, password)
            const existingUser = await User.findOne({ email: email });

            if (!existingUser) {
                console.log('User does not exist. Login failed.');
                io.to(socket.id).emit("login", "failed")
                
              } else {
                const passwordMatch = await bcrypt.compare(password, existingUser.password);
        
                if (passwordMatch) {
                    console.log('Store Login successful.');
                    io.to(socket.id).emit("login", "successfull")

                } else {
                  console.log('Incorrect password. Login failed.');
                  io.to(socket.id).emit("login", "failed")
                }
              }
        }
        catch(error) {
            console.log("error logging in",error)
        }
        
    })

    //more even hanlders here which will receive data from the client and respond depending upon the situation
    socket.on("carform",async (data)=>{
        console.log("car form data",data)
        //car form logic here(will be using the database here)

        //looking if car is already listed from number plate, if yes then update the car details
        const existingCar = await Car.findOne({ plateNumber: data["plate number"] });
        if(existingCar) {
            console.log("car already exists, updating car details")
            try {
                const updatedCar = await Car.findOneAndUpdate
                (
                    { plateNumber: data["plate number"] },
                    {
                        make: data.make,
                        model: data.model,
                        variant: data.year,
                        plateNumber: data["plate number"],
                        price: data["rental price"],
                        location: data["pickup location"],
                        startDate: data["availability from"],
                        endDate: data["availability till"],
                        owner: data.owner,
                        ownerDisplayName: data.ownerDisplayName,
                        images: data.images
                    }
                );
                }
            catch(error) {
                console.log("error updating car",error)
                io.to(socket.id).emit("carform", "failed")
            }
            return 
        }        

        try {
            const newCar = new Car({
                make: data.make,
                model: data.model,
                variant: data.year,
                plateNumber: data["plate number"],
                price: data["rental price"],
                location: data["pickup location"],
                startDate: data["availability from"],
                endDate: data["availability till"],
                owner: data.owner,
                ownerDisplayName: data.ownerDisplayName,
                images: data.images
                //other data
            }); 
            console.log("new car : ",newCar)
            const savedCar = await newCar.save(); 
            console.log('Car form submitted:', savedCar);
            io.to(socket.id).emit("carform", "successfull")
        }
        catch(error) {
            console.log("error submitting car form",error)
            io.to(socket.id).emit("carform", "failed")
        }
    
    })

    socket.on("availablecars",async (data)=>{
        try {
            const availableCars = await Car.find({}); 
            io.to(socket.id).emit("availablecars", availableCars)
        }
        catch(error) {
            console.log("error getting available cars",error)
        }
    })

    socket.on("get_display_name",async (data)=>{
        try {
            console.log("getting display name for user : ", data)
            const user = await User.findOne({ email: data });
            io.to(socket.id).emit("get_display_name", user.displayName)
            console.log("sending user display name : ", user.displayName)
        }
        catch(error) {
            console.log("error getting available cars",error)
        }
    })

    socket.on("listedcars",async (data)=>{
        try {
            const listedCars = await Car.find({owner: data}); 
            io.to(socket.id).emit("listedcars", listedCars)
        }
        catch(error) {
            console.log("error getting listed cars",error)
        }
    })
};
export default eventHanlder;


