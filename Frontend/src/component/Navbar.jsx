import React from "react";
import image from "../assets/codev.png";
import "./animations.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGOUT } from "../Redux/actionTypes";
import axios from "axios";

const Navbar = () => {
  const auth = useSelector((store) => store.reducer.auth);
  const dispatch = useDispatch();

  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  const handleLogout = () => {
    axios.get(`${url}/user/logout`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`
      }
    }).then((res) => {

      localStorage.setItem("token", "")
      dispatch({ type: USER_LOGOUT })
    }).catch((err) => {
      console.log(err.message, "error while logout")
      alert(err.message)
    })

  }
  return (
    <nav className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={image} alt="Logo" className="h-12 w-auto animate-pulse" />
        </div>
        <div className="flex items-center space-x-25">
          {/* Add your other navbar links or components here */}
          <div className="flex space-x-20">
            <Link
              to="/home"
              className="text-white hover:text-gray-300 font-semibold transition duration-300 ease-in-out home-link"
            >
              <span className="inline-block">Home</span>
              <span className="inline-block animate-bounce text-2xl">
                &#x1F3E0;
              </span>
            </Link>
            <Link
              to="/score"
              className="text-white hover:text-gray-300 font-semibold transition duration-300 ease-in-out"
            >
              <span className="inline-block">Scores</span>
              <span className="inline-block animate-bounce text-2xl">
                &#x1F4AC;
              </span>
            </Link>
            <div

              className="text-white hover:text-gray-300 font-semibold transition duration-300 ease-in-out"
              onClick={handleLogout}
            >
              <span className="inline-block">{auth ? "Logout" : ""}</span>
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
