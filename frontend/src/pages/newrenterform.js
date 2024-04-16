import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import axios from 'axios'
import { Image } from 'cloudinary-react';
 


const getCookieValue = (name) => {
	const cookies = document.cookie.split(';');
	for (const cookie of cookies) {
		const [cookieName, cookieValue] = cookie.split('=');
		if(cookieName.trim() === name.trim()) {
			return cookieValue.trim();
		}
	}
	return null;
  };


export default function NewRenterForm({socket}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [car_details,setCarDetails] = React.useState({
		make: "",
		model: "",
		year: "",
		city: "",
		"rental price": "",
		"pickup location": "",
		"additional details": "",
		"availability from": "",
		"availability till": "",
		"car documents": [],
		"plate number":"",
		owner: getCookieValue("email"),
		ownerDisplayName: "",
    phone: "",
    images: []

	})


  const fields = [
    {
      label: "Make",
      type: "text",
      name: "make",
      value: car_details.make,
      placeholder: ",e.g. Toyota",
      required: true,
      gridCols: 1,
    },
    {
      label: "Model",
      name: "model",
      value: car_details.model,
      type: "text",
      placeholder: ",e.g. Corolla Grande",
      required: true,
      gridCols: 1,
    },
    {
      label: "Year",
      name: "year",
      value: car_details.year,
      type: "number",
      placeholder: ",e.g. 2000",
      required: true,
      gridCols: 1,
    },
    {
      label: "City",
      type: "text",
      name: "city",
      value: car_details.city,
      placeholder: ",e.g. Lahore",
      required: true,
      gridCols: 1,
    },
    {
      label: "Plate Number",
      type: "text",
      name: "plate number",
      value: car_details["plate number"],
      placeholder: ",e.g. ABC-123",
      required: true,
      gridCols: 1,
    },
    {
      label: "Rental Price",
      type: "number",
      name: "rental price",
      value: car_details["rental price"],
      placeholder: ",e.g. 10000 (in PKR)",
      required: true,
      gridCols: 1,
    },
    {
      label: "Availability From",
      type: "date",
      name: "availability from",
      value: car_details["availability from"],
      placeholder: "DD/MM/YYYY",
      required: true,
      gridCols: 1,
    },
    {
      label: "Availability Till",
      name: "availability till",
      value: car_details["availability till"],
      type: "date",
      placeholder: "DD/MM/YYYY",
      required: true,
      gridCols: 1,
    },
    {
      label: "Phone",
      name: "phone",
      value: car_details.phone,
      type: "tel",
      placeholder: "+92 300 1234567",
      required: true,
      gridCols: 2,
    },
    {
      label: "Pickup Location",
      name: "pickup location",
      value: car_details["pickup location"],
      type: "text",
      placeholder: "123 Main St, City, Country",
      required: true,
      gridCols: 2,
    }
  ];

  
	function changeCarDetails(e) {
		if(e.target.name === "rental price" && isNaN(e.target.value)) {
			alert("Please enter a valid number")
			return
		}
		setCarDetails({
			...car_details,
			[e.target.name] : e.target.value
		})
		console.log(car_details)
	}

	 async function submitCar(event) {
    event.preventDefault();

    if(car_details.make === "" || car_details.model === "" || car_details.year === "" || car_details.city === "" || car_details["plate number"] === "" || car_details["rental price"]=== "" || car_details["pickup location"] === "" || car_details["availability from"]=== "" || car_details["availability till"] === "" || car_details.images.length === 0 || car_details.phone === "") {
			alert("Please fill all the fields")
			return
		}
    if(car_details.images.length > 5) {
      alert("Please upload a maximum of 5 images")
      return
    }
    console.log("details being sent : ", car_details)

   //constructing images and uploading them to cloud
    let image_urls = []

    for(let i=0;i<car_details.images.length;i++) {
      const formData = new FormData();
      formData.append('file', car_details.images[i]);
      formData.append('upload_preset', 'lgzz6pc4');

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dgh0rch3f/upload', formData);
        console.log("response from cloudinary",response)
        image_urls.push(response.data.secure_url)
      }
      catch {
        console.log("error uploading image")
      }
    }

    car_details.images = image_urls
		socket.emit("carform",car_details)

	}

	React.useEffect(()=>{
		socket.on("carform",(status)=>{
			if(status == "successfull") {
				alert("Your car has been stored Successfully")
			}
			else {
				alert("Car posting Failed")
			}
		})
		socket.on("get_display_name",(display_name)=>{
			setCarDetails({
				...car_details,
				ownerDisplayName: display_name
			})
		})
		return ()=>{
			socket.off("carform")
			socket.off("get_display_name")
		}
	},[socket])

	React.useEffect(()=>{
    if(getCookieValue("email") === null) {
      window.location.href = "/login"
    }
		socket.emit("get_display_name", getCookieValue("email"))
	},[])



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
              <h1 className="text-4xl font-bold text-white cursor-pointer" onClick={()=>{window.location.href='/ownerhomepage'}}> CloudCar</h1>
              <h2 className="text-2xl font-bold text-teal-600 pt-5">
                Rent a Car Form
              </h2>
            </div>
            <form
              onSubmit={submitCar}
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
                      onChange={changeCarDetails}
                    />
                    {errors[field.label.toLowerCase()] && (
                      <span>This field is required</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-teal-600">Upload Images (Max 5)</label>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="bg-gray-600 border border-teal-600 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 focus:border-red-500"
                  onChange={(event) => {
                    const files = Array.from(event.target.files);  
                    setCarDetails((car_details_previous)=>{
                      return {...car_details_previous, images: files}
                    })
                  }}    
                />
              </div>

              <div className="w-full text-left mt-5">
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-teal-600 text-black text-md font-bold border border-black rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6"
                  title="Confirm Order"
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
