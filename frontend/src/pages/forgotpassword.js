// import React from 'react';
// // import './App.css'; // Assuming you have a CSS file named App.css for your styles

// function ForgotPassword() {
//   return (
//     <div style={{paddingTop: '70px'}}> {/* Applying inline style for padding */}
//       <div className="container">
//         <div className="row">
//           <div className="col-md-4 col-md-offset-4">
//             <div className="panel panel-default">
//               <div className="panel-body">
//                 <div className="text-center">
//                   <h3><i className="fa fa-lock fa-4x"></i></h3>
//                   <h2 className="text-center">Forgot Password?</h2>
//                   <p>You can reset your password here.</p>
//                   <div className="panel-body">
//                     <form id="register-form" role="form" autoComplete="off" className="form" method="post">
//                       <div className="form-group">
//                         <div className="input-group">
//                           <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
//                           <input id="email" name="email" placeholder="email address" className="form-control" type="email" />
//                         </div>
//                       </div>
//                       <div className="form-group">
//                         <input name="recover-submit" className="btn btn-lg btn-primary btn-block" value="Reset Password" type="submit" />
//                       </div>
//                       <input type="hidden" className="hide" name="token" id="token" value="" />
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;


import React from 'react';
import '../styles/forgotpassword.css'; // Assuming you have a CSS file named style.css in the styles folder

function ForgotPassword() {
  return (
    <html lang="en">
      <head>
        {/* CSS file imported here */}
        <link rel="stylesheet" type="text/css" href="./styles/style.css" />
      </head>
      <body>
        <div className="container-center">
          <center>
            <img src="https://i.imgur.com/LaimZqD.png" width="30%" alt="logo" />
          </center>
          <h2>Don't Worry!</h2>
          <form action="">
            <h4>
              Just provide your email<br />
              and we can do the rest
            </h4>
            <div className="formgroup">
              <input type="text" name="email" />
              <label htmlFor="email"><br />Email</label>
              <span>enter your email</span>
            </div>
            <button id="login-btn">Next</button>
          </form>
          <p>Did you remember? <a href="">Sign In</a></p>
        </div>
      </body>
    </html>
  );
}

export default ForgotPassword;
