import React from 'react';

function Login() {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">

      <div className="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?blend=000000&blend-alpha=10&blend-mode=normal&blend-w=1&crop=faces%2Cedges&h=630&mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-align=top%2Cleft&mark-pad=50&mark-w=64&w=1200&auto=format&fit=crop&q=60&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzA4ODA5NjgwfA&ixlib=rb-4.0.3" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="bg-gradient-to-b from-gray-900 via-gray-700 to-black w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">

        <div className="w-full h-100">

          <h1 className="text-4xl text-center font-bold text-teal-600 mb-4">CloudCar</h1>

          <h1 className="text-xl md:text-2xl leading-tight mt-7 text-center text-white">Log in</h1>

          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-white">Email Address</label>
              <input type="email" name="" id="" placeholder="Enter Email Address" className="w-full px-4 py-3 text-white rounded-lg bg-gray-600 mt-2 border focus:border-blue-500 focus:outline-none" autoFocus autoComplete="email" required />
            </div>

            <div className="mt-4">
              <label className="block text-white">Password</label>
              <input type="password" name="" id="" placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 text-white rounded-lg bg-gray-600 mt-2 border focus:border-blue-500 focus:outline-none" required />
            </div>

            <div className="text-right mt-2">
              <a href="#" className="text-sm font-semibold text-white hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
            </div>
            
            <div class="flex justify-center">
            <button type="submit" className="w-40 block bg-teal-600 hover:bg-teal-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">Log In</button>
            </div>
         
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8 text-white text-center">Don't have an account? <a href="signup" className="text-teal-600 hover:text-blue-700 font-semibold">Sign up</a></p>

        </div>
      </div>

    </section>
  );
}

export default Login;
