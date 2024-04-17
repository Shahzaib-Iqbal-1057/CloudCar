import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';


export default function Signup({socket}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  
  const [signup_data,setSignupData] = React.useState({
		"first name" : "",
    "last name" : "",
    "display name" : "",
		email : "",
		phone : "",
		address: "",
		password: "",
		"confirm password": "",

	})


  const fields = [
    {
      label: "First Name",
      value: signup_data["first name"],
      name: "first_name",
      type: "text",
      placeholder: "John",
      required: true,
      gridCols: 1,
    },
    {
      label: "Last Name",
      value: signup_data["last name"],
      name:"last_name",
      type: "text",
      placeholder: "Doe",
      required: true,
      gridCols: 1,
    },
    {
      label: "Email",
      value : signup_data.email,
      name: "email",
      type: "email",
      placeholder: "john.doe@example.com",
      required: true,
      gridCols: 2,
    },
    {
      label: "Display Name",
      name: "display_name",
      value: signup_data["display name"],
      type: "text",
      placeholder: "johndoe1122",
      required: true,
      gridCols: 2,
    },
    {
      label: "Phone",
      name: "phone",
      type: "tel",
      value: signup_data.phone,
      placeholder: "03001234567",
      required: true,
      gridCols: 2,
    },
    {
      label: "Address",
      name : "address",
      type: "text",
      value: signup_data.address,
      placeholder: "123 Main St, City, Country",
      required: true,
      gridCols: 2,
    },
    {
      label: "Password",
      name: "password",
      value: signup_data.password,
      type: "password",
      placeholder: "Enter your password",
      required: true,
      gridCols: 1,
    },
    {
      label: "Confirm Password",
      name: "password_again",
      value: signup_data["confirm password"],
      type: "password",
      placeholder: "Confirm your password",
      required: true,
      gridCols: 1,
    },
  ];




	function changeSignupData(e) {
		
    console.log(e)
    if (e.target.files) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onloadend = function () {
				setSignupData({
					...signup_data,
					[e.target.name]: reader.result 
				});  
			};
			reader.readAsArrayBuffer(file)
		} 
		else {

			setSignupData({
				...signup_data,
				[e.target.name] : e.target.value
			});
		}
		console.log(signup_data)
	}

	function handleSignup(event) {
    event.preventDefault()
    console.log("signup data : ", signup_data)
		if(signup_data.password !== signup_data["confirm password"]) {
			alert("Passwords don't match")
			return
		}
		if(signup_data["first name"] === "" || signup_data["last name"] === ""|| signup_data.email === "" || signup_data.phone === ""  || signup_data.address === "" || signup_data.password === "" || signup_data["confirm password"] === "") {
			alert("Please fill all fields")
			return
		}
		document.cookie = `display_name=${signup_data["display name"]};path=/`
		socket.emit("signup",signup_data)
		console.log("sent signup data : ", signup_data)
	}
	React.useEffect(()=>{
		socket.on("signup",(status)=>{
      console.log("STATUS: ", status);
			if(status === "successfull") {
				alert("Signup Successfull")
        window.location.href = '/login'
			}
			else {
				if(status === "username_already_exists") {
					alert("Email already exists")
				}
				if(status === "weak_password") {
          console.log("STATUS password ka", status);
					alert("Password is weak. It should be at least 8 characters including 1 uppercase character, and a number")
				}
				if(status === "invalid_email") {
					alert("Invalid . Your email must contain '@' and a '.' characters.")
				}
				if(status === "invalid_phone_number_length") {
					alert("Invalid phone number. Phone number entered must be a 10-digit number.")
				}
        if(status === "invalid_phone_number_type") {
					alert("Invalid phone number. Phone number entered must be numbers only.")
				}
			}
		})
		return ()=>{
			socket.off("signup")
		}
	},[socket])


  const handleGoBack = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <div className="container mx-auto h-screen">
        <div
          className="h-auto flex items-center justify-center"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/signup2.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="lg:w-7/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-2xl rounded-md bg-gradient-to-b from-gray-900 via-gray-700 to-black">
            <div className="pb-3">
              <h1 className="text-4xl font-bold text-white"> CloudCar</h1>
              <h2 className="text-2xl font-bold text-teal-600 pt-5">
                SignUp Form
              </h2>
            </div>
            <form
              onSubmit={(event)=>event.preventDefault()}
              className="flex flex-col justify-start items-center w-full m-auto"
            >
              <div className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-3 w-full">
                {fields.map((field, index) => (
                  <div
                    key={index}
                    className={`text-left flex flex-col gap-2 w-full ${
                      field.gridCols === 2 ? "md:col-span-2" : ""
                    }`}
                  >
                    <label className="font-semibold text-teal-600">
                      {field.label}
                    </label>
                    <input
                      value={field.value}
                      {...register(field.label.toLowerCase(), {
                        required: field.required,
                      })}
                      className={`bg-gray-600 text-white border border-teal-600 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500 ${
                        field.gridCols === 2 ? "md:w-full" : ""
                      }`}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={changeSignupData}
                    />
                    {errors[field.label.toLowerCase()] && (
                      <span>This field is required</span>
                    )}
                  </div>
                ))}
              </div>

              
              <div className="w-full text-left mt-5 flex justify-between">
              
              <button
                type="button"
                onClick={handleGoBack}
                className="flex justify-center items-center gap-2 w-1/2 py-3 px-4 bg-teal-600 text-black text-md font-bold border border-black rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-teal-600 md:px-6"
                title="Go Back"
              >
                <HiOutlineArrowCircleLeft size={20} />
                <span>Go Back</span>
              </button>

              <div className="w-12"></div> {/* This div adds a gap of 1 rem between the buttons */}

              <button
                type="submit"
                className="flex justify-center items-center gap-2 w-1/2 py-3 px-4 bg-teal-600 text-black text-md font-bold border border-black rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-teal-600 md:px-6"
                title="Register"
              >
                <span>Register</span>
                <HiOutlineArrowCircleRight size={20} />
              </button>
            </div>


            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
