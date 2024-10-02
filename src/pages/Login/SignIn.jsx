import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileBg from "../images/Profile/profileBg.svg";
function SignIn() {
  let email = useRef("");
  let pass = useRef("");
  const navigate = useNavigate();

  function Signining(e) {
    e.preventDefault();
    if (
      email == "" ||
      pass == "" ||
      email.current.value == "" ||
      pass.current.value == ""
    ) {
      alert("please fill in all inputs");
      return null;
    }
    let user = {
      email: email.current.value,
      password: pass.current.value,
    };

    axios
      .post("https://trello.vimlc.uz/api/auth/login", user)
      .then((res) => {
        if (res.data.message == "success") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/");
          location.reload();
          console.log(34);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  }
  return (
    <div className="sign flex flex-col items-center justify-center relative">
      <img src={profileBg} className="w-full " alt="" />
      <Link className="p-2 rounded-none absolute top-2 left-2 bg-blur" to="/">
        <i className="fa-solid fa-chevron-left"></i> Back
      </Link>
      <div className="btn-def bg-white border-def sign-cont flex flex-col gap-6 relative bottom-[100px]">
        <h1 className="text-center text-[30px] font-500">Sign In</h1>
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
              className="grow"
              placeholder="example@gmail.com"
              ref={email}
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
              className="grow"
              placeholder="password"
              ref={pass}
            />
          </label>
        </div>
        <Link className="text-blue-600" to="/signup">Register</Link>
        <button
          onClick={Signining}
          className="bg-def-blue text-white btn-def border-def"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SignIn;
