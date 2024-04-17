import Car from './models/car.js';
import User from './models/user.js';
import Image from './models/image.js';
import Post from './models/formpost.js';
import Posts from './models/posts.js'
import Rental from './models/rental.js';
import Likes from './models/likes.js'
import Chat from './models/chat.js'; //imported the DB models here, will use the models to interact with the database
import bcrypt from 'bcrypt'; // for hashing the passwords
import verifyData from './helperFunctions.js';



let loginArray = []
let loggedIn = "Anonymous"
let emailToSocketId = {}; //mapping email to socket id, will be used to send messages to the correct user


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
            loginArray.push(email)
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
                    emailToSocketId[email] = socket.id;

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
                        images: data.images,
                        price: data["rental price"],
                        description: data.description
                    }
                );
                console.log('Car form updated:', updatedCar);
                io.to(socket.id).emit("carform", "successfull")
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
                images: data.images,
                price: data["rental price"],
                description: data.description
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
            console.log("getting available cars : ", data)
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

    socket.on("handleSearchCars", async (searchQuery) => {
        try {
            
            const searchResultCars = await Car.find({ make: searchQuery }); // Adjust the query to match the make field
        
            // Send the search results and redirection URL back to the frontend
            io.to(socket.id).emit("searchResultCars", { cars: searchResultCars, redirectUrl: "/availablecars" });
        } catch (error) {
            console.log("error getting search result cars", error);
            io.to(socket.id).emit("searchResultCars", { error: "Failed to fetch search results" });
        }
    });


    //handling event in which a request for car will be recieved, this request will be forwarded to the owner of the car
    socket.on("requestCar",async (data)=>{
        console.log("request car data",data)
        //request car logic here(will be using the database here)
        //creating custom rental id by extracting the rental ids of existing rentals and adding 1 to the max id
        const existingRentals = await Rental.find({});
        let maxRentalId = 0;
        existingRentals.forEach(rental => {
            if(parseInt(rental.rentalId) > maxRentalId){
                maxRentalId = parseInt(rental.rentalId);
            }
        });
        maxRentalId++;

        try {
            const car = await Car.findOne({ plateNumber: data.car.plateNumber });
            const newRental = new Rental({
                rentalId: maxRentalId.toString(),
                status: "pending",
                car: car.plateNumber,
                owner: car.owner,
                renter: data.renter,
                startDate: car.startDate,
                endDate: car.endDate,
                ownerImages: car.images,
                amount: car.price
                //other data
            }); 
            const savedRental = await newRental.save(); 
            console.log('Rental request submitted:', savedRental);
            io.to(socket.id).emit("requestCar", "successfull")
        }
        catch(error) {
            console.log("error submitting rental request",error)
            io.to(socket.id).emit("requestCar", "failed")
        }
    })


    socket.on("viewCarRequests",async (plateNumber)=>{
        console.log("view car requests data",plateNumber)
        //view car requests logic here(will be using the database here)
        //extracting car


        try {
            const carRequests = await Rental.find({car: plateNumber});
            console.log("car requests",carRequests)
            //filtering out identical requests
            let uniqueCarRequests = [];
            let uniqueRentalIds = [];
            carRequests.forEach(rental => {
                if(!uniqueRentalIds.includes(rental.rentalId)){
                    uniqueRentalIds.push(rental.rentalId);
                    uniqueCarRequests.push(rental);
                }
            }
            ); 
            console.log("unique car requests",uniqueCarRequests)
            io.to(socket.id).emit("viewCarRequests", uniqueCarRequests)
        }
        catch(error) {
            console.log("error getting car requests",error)
        }
    })

    //handling event in which a request will be accepted, making the reservation
    socket.on("acceptRequest",async (data)=>{
        console.log("accept request data",data)
        //accept request logic here(will be using the database here)
        try {
            const updatedRental = await Rental.findOneAndUpdate
            (
                { rentalId: data.rentalId},
                {
                    status: "reserved"
                }
            );
            console.log('Rental request accepted:', updatedRental);
            io.to(socket.id).emit("acceptRequest", "successfull")
        }
        catch(error) {
            console.log("error accepting rental request",error)
            io.to(socket.id).emit("acceptRequest", "failed")
        }

        //deleting the car from available cars
        try {
            const deletedCar = await Car.findOneAndDelete
            (
                { plateNumber: data.car }
            );
            console.log('Car deleted from avaiable cars:', deletedCar);
        }
        catch(error) {
            console.log("error deleting car",error)
        }
    })



    

    socket.on("viewBookings", async (data) => {
        try {
            const { email } = data; // Assuming you're sending the logged-in user info from the frontend
    
            // Fetch rentals where status is 'reserved' and renter is the logged-in user
            const bookings = await Rental.find({ status: 'reserved', renter: email });
    
            // Send the bookings data to the frontend
            socket.emit("bookingsData", { bookings: bookings, redirectUrl: "/view-bookings" });
            
        } catch (error) {
            // Handle errors
            console.error("Error fetching bookings:", error);
            // Send error message to frontend if needed
            socket.emit("bookingError", { error: "Failed to fetch bookings" });
        }
    });




    //event in which a message will be sent from one user to the other
    socket.on("sendMessage",async (data)=>{
        //code here
        console.log("sending message from ", data.sender, " to ", data.receiver)
        console.log("message : ", data.message)
        //sending the message to the receiver
        io.to(emailToSocketId[data.receiver]).emit("receiveMessage", data.message)

        try {
            let chat;
            const existingChat = await Chat.findOne({ user1: data.sender, user2: data.receiver });
            if(existingChat){
                chat = existingChat;
            }
            else {
                const newChat = new Chat({
                    chatId: data.sender + data.receiver,
                    user1: data.sender,
                    user2: data.receiver,
                    messages: []
                }); 
                chat = await newChat.save(); 
            }
            chat.messages.push({sender: data.sender, message: data.message});
            const savedChat = await chat.save();
            console.log('Message saved:', savedChat);
        }
        catch(error) {
            console.log("error saving message",error)
        }
    })

    //event in which user has just logged in and needs to get all the messages from the database if there are any
    socket.on("getMessages",async (data)=>{
        //code here
        console.log("getting messages for ", data.user)
        //getting the messages from the database
        try {
            const chats = await Chat.find({ $or: [ { user1: data.user }, { user2: data.user } ] });
            console.log("chats",chats)
            let messages = [];
            chats.forEach(chat => {
                chat.messages.forEach(message => {
                    messages.push({sender: message.sender, message: message.message})
                });
            });
            console.log("messages",messages)
            io.to(socket.id).emit("getMessages", messages)
        }
        catch(error) {
            console.log("error getting messages",error)
        }
    })


     socket.on("posts", async (data) => {
        if(!data){
            return
        }
        try {
            let numPosts = 0
            try {
                numPosts = await Posts.countDocuments({});
            } catch (err) {
                console.error('Error counting documents:', err);
            }
            if(loginArray.length != 0){
                loggedIn = loginArray[loginArray.length - 1]
                const user = await User.findOne({ email: loggedIn });
                if (user) {
                    loggedIn = user.displayName;
                } else {
                    loggedIn = "Anonymous"
                }
            }
            else{
                loggedIn = "Anonymous"
            }
            const newPost = new Posts({
                postId: numPosts,
                userName: loggedIn,
                messageContent: data,
                dateTime: new Date(),
                likes: 0,
                replies: [],
            });

            const savedPost = await newPost.save();
            io.to(socket.id).emit("posts", "success");
        } catch (error) {
            console.log("error submitting post", error);
            io.to(socket.id).emit("posts", "failed");
        } 
        console.log(data)
    });

    socket.on("posts2", async (data, postID) => {
        if(!data){
            return;
        }
        try {
            let numPosts = 0
            try {
                numPosts = await Posts.countDocuments({});
            } catch (err) {
                console.error('Error counting documents:', err);
            }

            if(loginArray.length != 0){
                loggedIn = loginArray[loginArray.length - 1]
                const user = await User.findOne({ email: loggedIn });
                if (user) {
                    loggedIn = user.displayName;
                } else {
                    loggedIn = "Anonymous"
                }
            }
            else{
                loggedIn = "Anonymous"
            }

            const newPost = new Posts({
                postId: numPosts,
                userName: loggedIn,
                messageContent: data,
                dateTime: new Date(),
                likes: 0,
                replies: [],
            });

            const savedPost = await newPost.save();
            
            const post = await Posts.findOne({ postId: postID });
            post.replies.push(numPosts);
            await post.save();
            io.to(socket.id).emit("posts2", "success");
        } catch (error) {
            console.log("error submitting post", error);
            io.to(socket.id).emit("posts2", "failed");
        } 
        console.log(data)
    });

    socket.on("like", async (postId) => {
        console.log(postId)
        try {
            if(loginArray.length === 0){
                socket.emit("like", "You are not logged in.");
                return
            }
            let user = await Likes.findOne({ username: loginArray[loginArray.length - 1]});
            
            if (!user) {
              user = new Likes({ username: loginArray[loginArray.length - 1], likedPosts: [postId] });
              await user.save();
              const post = await Posts.findOne({ postId });

                if (!post) {
                throw new Error('Post not found');
                }
                post.likes += 1;
                await post.save();

            } else {
                if (!user.likedPosts.includes(postId)) {
                    user.likedPosts.push(postId);
                    await user.save();
                    const post = await Posts.findOne({ postId });

                    if (!post) {
                    throw new Error('Post not found');
                    }
                    post.likes += 1;

                    await post.save();
                    console.log("kkk")
                  } else {
                    console.log("LLLL")
                    return;
                  }
            }
            
        } catch (error) {
            console.error('Error liking post:', error);
            throw error;
          }
        
      });
    
      socket.on("reply", async (postId, replyContent) => {
        try {
          await Posts.findByIdAndUpdate(postId, {
            $push: { replies: { content: replyContent, username: socket.username, dateTime: new Date(), likes: 0 } }
          });
          socket.emit("reply", "success");
        } catch (error) {
          console.error("Error adding reply:", error);
          socket.emit("reply", "error");
        }
      });
      
      socket.on("viewReplies", async (postID) => {
        try {
            let arr = [];
            let post = await Posts.findOne({ postId: postID });
            arr = post.replies

            let allPosts = await Posts.find();
            let filteredPosts = []
            for(let i = 0; i < allPosts.length; i++){
                let check = false
                for(let j = 0; j < arr.length; j++){
                    if(allPosts[i].postId.toString() === arr[j].toString()){
                        check = true
                    }
                }
                if(check){
                    filteredPosts.push(allPosts[i])
                }
                
            }
            if(filteredPosts.length === 0){
                socket.emit("viewReplies", "Noreplies");
            }
            
          socket.emit("viewReplies", filteredPosts);

        } catch (error) {
          console.error("Error retrieving posts:", error);
          socket.emit("viewReplies", "Error retrieving posts");
        }
      });

      socket.on("allposts", async () => {
        try {
            let arr = [];
            let posts = await Posts.find();
            posts.forEach(post => {
            post.replies.forEach(reply => {
                arr.push(reply);
            });
            });

            let allPosts = await Posts.find();
            let filteredPosts = []
            for(let i = 0; i < allPosts.length; i++){
                let check = false
                for(let j = 0; j < arr.length; j++){
                    if(allPosts[i].postId.toString() === arr[j].toString()){
                        check = true
                    }
                }
                if(!check){
                    filteredPosts.push(allPosts[i])
                }
                
            }
          socket.emit("allposts", filteredPosts);
        } catch (error) {
          console.error("Error retrieving posts:", error);
          socket.emit("posts_error", "Error retrieving posts");
        }
      });


    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
        // Remove the user from the emailToSocketId mapping
        const email = Object.keys(emailToSocketId).find((key) => emailToSocketId[key] === socket.id);
        if (email) {
            delete emailToSocketId[email];
        }
    });




};
export default eventHanlder;


