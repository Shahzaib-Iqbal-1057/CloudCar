#cloud car
This project allows users to be able to rent their cars to other users, while the users can also rent cars themselves made available by other users on the platform.

#setup instructions
This project has been implemented in MERN stack. The frontend directory contains the frontend react code, while the backend contains the node js code with mongoDB as the database. In order to setup, clone the repository using the following command : 
git clone https://github.com/umerrr28/CloudCar
This will make a directory named CloudCar in your local machine. Now, you will have to install the dependencies for both the frontend and the backend. Make two terminals, one for the frontend and one for the backend. run following commands in both of the directories :
npm install
npm start
You will have to run these commands in both of your directories, afterwards, the backend and frontend both willstart running. The project as of now uses our own MongoDB database, if you want to use your own, you can replace the key in .env file in backend directory.

#description
As of now, the frontend contains all the necessary pages, the figma designs have been integrated. The user can log in and sign up. The user can also post cars in order to rent them. On the other hand, database has been integrated into the backend. The backend is able to respond to any sort of frontend query and give a proper response.
