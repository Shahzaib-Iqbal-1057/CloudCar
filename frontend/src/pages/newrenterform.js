import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import axios from 'axios'
import { Image } from 'cloudinary-react';
import styled from "@emotion/styled";
import cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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

  const [error, setError] = React.useState("");
	const [errorSubmit, setErrorSubmit] = React.useState("");
	const [errorPrice, setErrorPrice] = React.useState("");
	const [errorYear, setErrorYear] = React.useState("");
	const [errorCity, setErrorCity] = React.useState("");
  const [errorImages, setErrorImages] = React.useState("");
  const [errorPhone, setErrorPhone] = React.useState("");
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
      placeholder: "03334567890",
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
			setErrorSubmit("")
			setErrorPrice("Please enter a valid number")
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
    
    let check = true
		const today = new Date();
    today.setHours(0, 0, 0, 0);
		const from = new Date(car_details["availability from"]);
    from.setHours(0, 0, 0, 0);
    const till = new Date(car_details["availability till"]);
    till.setHours(0, 0, 0, 0);

		if(car_details.make === "" || car_details.model === "" || car_details.year === "" || car_details.city === "" || car_details["plate number"] === "" || car_details["rental price"] === "" || car_details["pickup location"] === "" || car_details["availability from"] === "" || car_details["availability till"] === "") {
			setErrorPrice("")
			setError("")
			setErrorYear("")
			setErrorCity("")
      setErrorImages("")
      setErrorPhone("")
			setErrorSubmit("Please fill all the fields")
			return
		}
    if (from > till) {
	    check = false
	    setErrorSubmit("")
      setError("Availability from date cannot be greater than availability till date");
      setCarDetails({
        ...car_details,
        "availability from": "",
        "availability till": ""
      });

      }
      else{
        setError("")
      }
	
		if(car_details.year.length != 4 || isNaN(parseInt(car_details.year)) || parseInt(car_details.year) > 2024 || parseInt(car_details.year) < 1300) {
			setErrorSubmit("")
			check = false
			setErrorYear("Please enter valid year")
      setCarDetails({
        ...car_details,
        year: ""
      });
		}
    else{
      setErrorYear("")
    }

		if (from < today || till < today) {

			setErrorSubmit("")
			check = false
			setError("Selected dates cannot be less than today's date");
			setCarDetails({
        ...car_details,
        "availability from": "",
        "availability till": ""
			});
	
		}
    else{
      setError("")
    }

		

		if(car_details.city){

			let PakistanCities = [ "Islamabad", "Ahmed Nager", "Ahmadpur East", "Ali Khan", "Alipur", "Arifwala", "Attock", "Bhera", "Bhalwal", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Burewala", "Chillianwala", "Chakwal", "Chichawatni", "Chiniot", "Chishtian", "Daska", "Darya Khan", "Dera Ghazi", "Dhaular", "Dina", "Dinga", "Dipalpur", "Faisalabad", "Fateh Jhang", "Ghakhar Mandi", "Gojra", "Gujranwala", "Gujrat", "Gujar Khan", "Hafizabad", "Haroonabad", "Hasilpur", "Haveli", "Lakha", "Jalalpur", "Jattan", "Jampur", "Jaranwala", "Jhang", "Jhelum", "Kalabagh", "Karor Lal", "Kasur", "Kamalia", "Kamoke", "Khanewal", "Khanpur", "Kharian", "Khushab", "Kot Adu", "Jauharabad", "Lahore", "Lalamusa", "Layyah", "Liaquat Pur", "Lodhran", "Malakwal", "Mamoori", "Mailsi", "Mandi Bahauddin", "mian Channu", "Mianwali", "Multan", "Murree", "Muridke", "Mianwali Bangla", "Muzaffargarh", "Narowal", "Okara", "Renala Khurd", "Pakpattan", "Pattoki", "Pir Mahal", "Qaimpur", "Qila Didar", "Rabwah", "Raiwind", "Rajanpur", "Rahim Yar", "Rawalpindi", "Sadiqabad", "Safdarabad", "Sahiwal", "Sangla Hill", "Sarai Alamgir", "Sargodha", "Shakargarh", "Sheikhupura", "Sialkot", "Sohawa", "Soianwala", "Siranwali", "Talagang", "Taxila", "Toba Tek", "Vehari", "Wah Cantonment", "Wazirabad", "Badin", "Bhirkan", "Rajo Khanani", "Chak", "Dadu", "Digri", "Diplo", "Dokri", "Ghotki", "Haala", "Hyderabad", "Islamkot", "Jacobabad", "Jamshoro", "Jungshahi", "Kandhkot", "Kandiaro", "Karachi", "Kashmore", "Keti Bandar", "Khairpur", "Kotri", "Larkana", "Matiari", "Mehar", "Mirpur Khas", "Mithani", "Mithi", "Mehrabpur", "Moro", "Nagarparkar", "Naudero", "Naushahro Feroze", "Naushara", "Nawabshah", "Nazimabad", "Qambar", "Qasimabad", "Ranipur", "Ratodero", "Rohri", "Sakrand", "Sanghar", "Shahbandar", "Shahdadkot", "Shahdadpur", "Shahpur Chakar", "Shikarpaur", "Sukkur", "Tangwani", "Tando Adam", "Tando Allahyar", "Tando Muhammad", "Thatta", "Umerkot", "Warah", "Abbottabad", "Adezai", "Alpuri", "Akora Khattak", "Ayubia", "Banda Daud", "Bannu", "Batkhela", "Battagram", "Birote", "Chakdara", "Charsadda", "Chitral", "Daggar", "Dargai", "Darya Khan", "dera Ismail", "Doaba", "Dir", "Drosh", "Hangu", "Haripur", "Karak", "Kohat", "Kulachi", "Lakki Marwat", "Latamber", "Madyan", "Mansehra", "Mardan", "Mastuj", "Mingora", "Nowshera", "Paharpur", "Pabbi", "Peshawar", "Saidu Sharif", "Shorkot", "Shewa Adda", "Swabi", "Swat", "Tangi", "Tank", "Thall", "Timergara", "Tordher", "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai", "Jafarabad", "Jhal Magsi", "Kacchi", "Kalat", "Kech", "Kharan", "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohlu", "Lasbela", "Lehri", "Loralai", "Mastung", "Musakhel", "Nasirabad", "Nushki", "Panjgur", "Pishin valley", "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk", "Zhob", "Ziarat" ]

			let cityEnteredByUser = car_details.city; 
			let cityEnteredLower = cityEnteredByUser.toLowerCase();
			let PakistanCitiesLower = PakistanCities.map(city => city.toLowerCase());

			if (!PakistanCitiesLower.includes(cityEnteredLower)) {
				setErrorCity("Please Enter Valid City")
				check = false
        setCarDetails({
          ...car_details,
          city: ""
        });
			} 
      else{
        setErrorCity("")
      }
		}
		if(car_details.phone.length != 11 || isNaN(parseInt(car_details.phone))) {
      setCarDetails({
        ...car_details,
        phone: ""
      });
      setErrorPhone("Invalid Phone Number Format")
      check = false
    }
    else{
      setErrorPhone("")
    }

    if(car_details.images.length > 5) {
      setErrorImages("Please upload a maximum of 5 images.")
      setErrorSubmit("Please upload a maximum of 5 images.")
      check = false
    }
    else{
      setErrorImages("")
      setErrorSubmit("")
    }


    if(!check){
      return
    }

    if(check){
      setCarDetails({
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
      });
			setErrorPrice("")
			setError("")
      setErrorPhone("")
			setErrorYear("")
			setErrorCity("")
      setErrorImages("")
			setErrorSubmit("Car detail have been sent!")
		
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

	}

	React.useEffect(()=>{
		socket.on("carform",(status)=>{
			if(status == "successfull") {
				setErrorSubmit("Your car has been stored Successfully")
			}
			else {
				setErrorSubmit("Car posting Failed")
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


  const handleGoBack = () => {
    window.location.href = '/ownerhomepage';
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
                      className={`bg-gray-600 border border-teal-600 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500 ${
                        field.gridCols === 2 ? "md:w-full" : ""
                      }`}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={changeCarDetails}
                    />
                    {/* {errors[field.label.toLowerCase()] && (
                      <span>This field is required</span>
                    )} */}
                    {field.label.toLowerCase() === "phone" && (
                      <span className="text-red-500 text-sm">{errorPhone}</span>
                    )}
                    {field.label.toLowerCase() === "images" && (
                      <span className="text-red-500 text-sm">{errorImages}</span>
                    )}
                    {field.label.toLowerCase() === "availability till" && (
                      <span className="text-red-500 text-sm">{error}</span>
                    )}
                    {field.label.toLowerCase() === "rental price" && (
                      <span className="text-red-500 text-sm">{errorPrice}</span>
                    )}
                    {field.label.toLowerCase() === "year" && (
                      <span className="text-red-500 text-sm">{errorYear}</span>
                    )}
                    {field.label.toLowerCase() === "city" && (
                      <span className="text-red-500 text-sm">{errorCity}</span>
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

              
              
              <div>
              <span className="text-red-500 text-sm">{errorSubmit}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
