import React from "react";
import profileBg from "../images/Profile/profileBg.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  let email = useRef("");
  let firstName = useRef("");
  let lastName = useRef("");
  let pass = useRef("");
  let confirmPass = useRef("");
  function SignUping(e) {
    e.preventDefault();
    if (
      email == "" ||
      pass == "" ||
      confirmPass == "" ||
      firstName == "" ||
      lastName == "" ||
      email.current.value == "" ||
      pass.current.value == "" ||
      firstName.current.value == "" ||
      lastName.current.value == "" ||
      confirmPass.current.value == ""
    ) {
      alert("please fill in all inputs");
      return null;
    }
    let user = {
      email: email.current.value,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      password: pass.current.value,
      confirmPassword: confirmPass.current.value,
    };
    axios
      .post("https://trello.vimlc.uz/api/auth/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/signin");
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Error occurred during signup");
      });
  }
  return (
    <div className="sign flex flex-col items-center justify-center relative">
      <Link className="p-2 rounded-none absolute top-2 left-2 bg-blur" to="/">
        <i className="fa-solid fa-chevron-left"></i> Back
      </Link>
      {/* <img src={profileBg} className="w-full " alt="" /> */}
      <div className="btn-def bg-white border-def sign-cont flex flex-col gap-6 relative bottom-[-50px]">
        <h1 className="text-center text-[30px] font-500">Sign Up</h1>
        <div className="email flex flex-col gap-1">
          <p className="text-[16px]">Email</p>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              ref={email}
              className="grow"
              placeholder="example@gmail.com"
            />
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[16px]">First name</p>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              ref={firstName}
              className="grow"
              placeholder="Name"
            />
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[16px]">Last name</p>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              ref={lastName}
              className="grow"
              placeholder="Sur Name"
            />
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[16px]">Password</p>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              ref={pass}
              className="grow"
              placeholder="password"
            />
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[16px]">Confirm Password</p>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              ref={confirmPass}
              className="grow"
              placeholder="password"
            />
          </label>
        </div>
        <Link className="text-blue-600" to="/login">Login</Link>
        <button
          onClick={SignUping}
          className="bg-def-blue text-white btn-def border-def"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SignUp;
