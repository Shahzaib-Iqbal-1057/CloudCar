// import React from 'react';

// function ForgotPassword() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission here
//   };

//   return (
//     <div className="container-center bg-gradient-to-b from-gray-900 via-gray-700 to-black h-screen flex flex-col justify-center items-center">
//       <center>
//         <h3 className="text-teal-600 text-3xl font-bold mb-4">Forgot Password?</h3>
//         {/* <img src="https://i.imgur.com/LaimZqD.png" className="w-20" alt="Logo" /> */}
//       </center>
      
//       <h2 className="text-teal-600 text-2xl font-bold mb-4">Don't Worry!</h2>
      
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
//         <h4 className="text-center text-gray-800 text-lg font-semibold mb-4">
//           Just provide your email<br /> 
//           and we can do the rest
//         </h4>
      
//         <div className="formgroup relative mb-6">
//           {/* <input type="email" name="email" className="input-field" placeholder="Email" /> */}
//             {/* <label className="block text-teal-600">Email Address</label> */}
//             <input type="email"  name="email" id="" placeholder="Enter Email Address" className="w-full px-4 py-3 text-black rounded-lg bg-white mt-2 border focus:border-teal-600 focus:outline-none" autoFocus autoComplete="email" required />
//         </div>
      
//         <button id="login-btn" href='login' type="submit" className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300">Next</button>
      
//       </form>


//       <p className="text-white mt-4">Did you remember? <a href="login" className="text-white font-semibold">Sign In</a></p>
//     </div>
//   );
// }

// export default ForgotPassword;


import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function ForgotPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="container-center bg-gradient-to-b from-gray-900 via-gray-700 to-black h-screen flex flex-col justify-center items-center">
      <center>
        <h3 className="text-teal-600 text-3xl font-bold mb-4">Forgot Password?</h3>
      </center>
      <h2 className="text-teal-600 text-2xl font-bold mb-4">Don't Worry!</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h4 className="text-center text-gray-800 text-lg font-semibold mb-4">
          Just provide your email<br /> 
          and we can do the rest
        </h4>
        <div className="formgroup relative mb-6">
          <input type="email" name="email" id="" placeholder="Enter Email Address" className="w-full px-4 py-3 text-black rounded-lg bg-white mt-2 border focus:border-teal-600 focus:outline-none" autoFocus autoComplete="email" required />
        </div>
        {/* Replace button with Link */}
        <Link to="/login" className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 inline-block text-center">
          Next
        </Link>
      </form>
      <p className="text-white mt-4">Did you remember? <a href="login" className="text-white font-semibold">Sign In</a></p>
    </div>
  );
}

export default ForgotPassword;
