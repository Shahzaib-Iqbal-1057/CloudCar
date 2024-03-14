import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowCircleRight } from "react-icons/hi";

const fields = [
  {
    label: "First Name",
    type: "text",
    placeholder: "John",
    required: true,
    gridCols: 1,
  },
  {
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    required: true,
    gridCols: 1,
  },
  {
    label: "Email",
    type: "email",
    placeholder: "john.doe@example.com",
    required: true,
    gridCols: 2,
  },
  {
    label: "Display Name",
    type: "text",
    placeholder: "johndoe1122",
    required: true,
    gridCols: 2,
  },
  {
    label: "Phone",
    type: "tel",
    placeholder: "+92 300 1234567",
    required: true,
    gridCols: 2,
  },
  {
    label: "Address",
    type: "text",
    placeholder: "123 Main St, City, Country",
    required: true,
    gridCols: 2,
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
    gridCols: 1,
  },
  {
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    required: true,
    gridCols: 1,
  },
];

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // You can perform further actions with the form data here
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
              onSubmit={handleSubmit(onSubmit)}
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
                      {...register(field.label.toLowerCase(), {
                        required: field.required,
                      })}
                      className={`bg-gray-600 border border-teal-600 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500 ${
                        field.gridCols === 2 ? "md:w-full" : ""
                      }`}
                      type={field.type}
                      placeholder={field.placeholder}
                    />
                    {errors[field.label.toLowerCase()] && (
                      <span>This field is required</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="w-full text-left">
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
