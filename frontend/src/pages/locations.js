import React from 'react';

function Nav() {
  return (
    <nav className="flex justify-between bg-teal-600 text-black w-screen">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <a className="text-3xl font-bold font-heading" href="/ ">
            {" "}
            CloudCar{" "}
          </a>
          {/* Nav Links */}
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            <li>
              <a className="hover:text-gray-200" href="how-it-works">
                How it Works
              </a>
            </li>
            <li>
              <a className="hover:text-gray-200" href="locations">
                Locations
              </a>
            </li>
            <li>
              <a className="hover:text-gray-200" href="about-us">
                About Us
              </a>
            </li>
            {/* <li><a className="hover:text-gray-200" href="#">Contact Us</a></li> */}
          </ul>

          {/* Log In */}
          <div className="hidden xl:flex items-center space-x-3 items-center">
            
            <a href="login">
              <svg
                className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* </a>style={{ transition: 'fill 0.3s' }} onMouseOver={(e) => e.target.setAttribute('fill', '#EEEEEE')} onMouseOut={(e) => e.target.setAttribute('fill', 'none')}> */}
                <path d="M12 8L16 12M16 12L12 16M16 12H3M3.33782 7C5.06687 4.01099 8.29859 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.29859 22 5.06687 19.989 3.33782 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> 
            </a>


            {/* <a className="flex items-center hover:text-gray-200" href="#"></a> */}

            {/* Sign Up */}
            <a className="flex items-center hover:text-gray-700 transition-colors" href="signup">
              
              <svg
                fill="#000000" className="h-6 w-6 hover:text-gray-200" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612">
                <path
                  d="M269.272,310.198c86.177-0.005,117.184-86.291,125.301-157.169C404.572,65.715,363.282,0,269.272,0C175.274,0,133.963,65.71,143.97,153.029C152.095,223.907,183.093,310.204,269.272,310.198z"/> <path d="M457.707,346.115c2.773,0,5.528,0.083,8.264,0.235c-4.101-5.85-8.848-11.01-14.403-15.158 c-16.559-12.359-38.005-16.414-56.964-23.864c-9.229-3.625-17.493-7.226-25.251-11.326
                    c-26.184,28.715-60.329,43.736-100.091,43.74c-39.749,0-73.891-15.021-100.072-43.74c-7.758,4.101-16.024,7.701-25.251,11.326
                    c-18.959,7.451-40.404,11.505-56.964,23.864c-28.638,21.375-36.039,69.46-41.854,102.26c-4.799,27.076-8.023,54.707-8.964,82.209
                    c-0.729,21.303,9.789,24.29,27.611,30.721c22.315,8.048,45.356,14.023,68.552,18.921c44.797,9.46,90.973,16.729,136.95,17.054
                    c22.278-0.159,44.601-1.956,66.792-4.833c-16.431-23.807-26.068-52.645-26.068-83.695 C309.995,412.378,376.258,346.115,457.707,346.115z"/><path d="M457.707,375.658c-65.262,0-118.171,52.909-118.171,118.171S392.444,612,457.707,612s118.172-52.909,118.172-118.171
                    C575.878,428.566,522.969,375.658,457.707,375.658z M509.407,514.103h-31.425v31.424c0,11.198-9.077,20.276-20.274,20.276
                    c-11.198,0-20.276-9.078-20.276-20.276v-31.424h-31.424c-11.198,0-20.276-9.077-20.276-20.276 c0-11.198,9.077-20.276,20.276-20.276h31.424v-31.424c0-11.198,9.078-20.276,20.276-20.276c11.198,0,20.274,9.078,20.274,20.276
                    v31.424h31.425c11.198,0,20.276,9.078,20.276,20.276C529.682,505.027,520.606,514.103,509.407,514.103z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
            </a>

          </div>

        </div>
      </nav>
  );
}



// function Hero() {
//   return (
//     <div className="py-20 bg-cover bg-no-repeat bg-fixed" style={{backgroundImage: "url(https://unsplash.com/photos/man-driving-a-car-wearing-wrist-watch-8e2gal_GIE8)"}}>
//       <div className="container m-auto text-center px-6 opacity-100">
//         <h2 className="text-4xl font-bold mb-2 text-white">Echo Base...I've got something!</h2>
//         <h3 className="text-2xl mb-8 text-gray-200">Not much, but it could be a life form. This is Rouge Two. this is Rouge Two. Captain Solo, so you copy?</h3>
//         <button className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:border-transparent hover:text-blue-500 hover:bg-gray-800 transition-all">Commander Skywalker, do you copy?</button>
//       </div>
//     </div>
//   );
// }

function Hero() {
  return (
    <div className="py-20 bg-cover bg-no-repeat bg-fixed" style={{backgroundImage: "url(/loc3.jpg)"}}>
      <div className="container m-auto text-center px-6 opacity-100">
        <h2 className="text-4xl font-bold mb-2 text-white">We have many Locations!</h2>
        <h3 className="text-2xl mb-8 text-gray-200">We operate in various cities of Pakistan.</h3>
        <button className="bg-teal-600 text-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:border-transparent hover:bg-teal-500 transition-all"> <a href="how-it-works">See How we work</a> </button>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="container mx-auto px-6 p-10">
      {/* <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Artoo!</h2>
      <div className="flex items-center flex-wrap mb-20">
        <div className="w-full md:w-1/2 pr-10">
          <h4 className="text-3xl text-gray-800 font-bold mb-3">Vortex</h4>
          <p className="text-gray-600 mb-8">Their primary target will be the power generators. Prepare to open the shield. Sir, Rebel ships are coming into our sector. Good. Our first catch of the day. Stand by, ion control....Fire! The first transport is away.</p>
        </div>
        <div className="w-full md:w-1/2">
          <img className="rounded-lg" src="https://pbs.twimg.com/media/CR45LOXVEAADG5E.jpg" alt="Vortex" />
        </div>
      </div> */}
      {/* <div className="flex items-center flex-wrap mb-20">
        <div className="w-full md:w-1/2">
          <img className="rounded-lg" src="https://www.thesun.co.uk/wp-content/uploads/2019/06/SWJFO-EAPlay-08-1.jpg" alt="use the force" />
        </div>
        <div className="w-full md:w-1/2 pl-10">
          <h4 className="text-3xl text-white font-bold mb-3">Use the Force!</h4>
          <p className="text-white mb-8">We'll never get it out now. So certain are you. Always with you it cannot be done. Hear you nothing that I say? Master, moving stones around is one thing. This is totally different. No! No different!</p>
        </div>
      </div> */}
      <div className="flex items-center flex-wrap mb-20">
        <div className="w-full md:w-1/2">
          <img className="rounded-lg" src="/lahore.jpg" alt="use the force" />
        </div>
        <div className="w-full md:w-1/2 pl-10">
          <h4 className="text-3xl text-white font-bold mb-3">Lahore</h4>
          <p className="text-white mb-8">Our services help students and job persons by providing them rental cars at the time of need</p>
        </div>
      </div>

      <div className="flex items-center flex-wrap mb-20">
        <div className="w-full md:w-1/2 pr-10">
          <h4 className="text-3xl text-white font-bold mb-3">Islamabad</h4>
          <p className="text-white mb-8">We work in the capital of Pakistan to help them having a joyous rides in the beautiful city and mountains.</p>
        </div>
        <div className="w-full md:w-1/2">
          <img className="rounded-lg" src="/islamabad.jpg" alt="use the force" />
        </div>
      </div>

    </section>
  );
}

function Testimonials() {
  return (
    // <section className="bg-gray-100">
    <section>
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-8">People expresses</h2>
        <div className="flex flex-wrap">
          <div className="w-full h-auto md:w-1/3 px-2 mb-4">
            <div className="flex flex-col justify-between h-full bg-teal-600 rounded shadow py-2">
              <p className="text-white text-base px-6 mb-5">The need of own transport is very high where there are people coming from whole country to seek jobs and education.</p>
              <p className="text-white text-xs md:text-sm px-6">Kabir</p>
            </div>
          </div>
          <div className="w-full h-auto md:w-1/3 px-2 mb-4">
            <div className="flex flex-col justify-between h-full bg-teal-600 rounded shadow py-2">
              <p className="text-white text-base px-6 mb-5">What can a person wish for other than having a good and joyous ride in a city like Islamabad independently.</p>
              <p className="text-white text-xs md:text-sm px-6">Omar</p>
            </div>
          </div>
          <div className="w-full h-auto md:w-1/3 px-2 mb-4">
            <div className="bg-teal-600 flex flex-col justify-between h-full rounded shadow py-2">
              <p className="text-white text-base px-6 mb-5">CloudCar's locations choice is very appreciatable</p>
              <p className="text-white text-xs md:text-sm px-6">Ali</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// Features, Testimonials, Call to Action components are similar to Hero component, just replace the content accordingly.

function Locations() {
  return (
    <div className="text-gray-700 bg-white antialiased" style={{fontFamily: 'Roboto, sans-serif'}}>
      <Nav />
      <Hero />
      <div className='bg-gradient-to-b from-gray-900 via-gray-700 to-black'>
      <Features />
      <Testimonials />
      
      </div>
      {/* {/* Call to Action */}
    </div>
  );
}

export default Locations;

