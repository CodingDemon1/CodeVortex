import React, { useState } from "react";
import "../css/signup.css";
import logo from "../images/code-vortex-logo.png";
import { Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import {useNavigate} fro/m
const baseUrl = "localhost:5000";
const Signup = () => {
  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const handleRegister = (e) => {
    e.preventDefault();
    if (password === confirmPass) {
      const payload = {
        email,
        password,
        name,
      };
      axios
        .post(`${url}/user/register`, payload)
        .then((res) => {
          if (res.data.msg === "user has been registered successfully") {
            toast({
              title: res.data.msg,
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top",
            });

            navigate("/");
          } else {
            toast({
              title: res.data.msg,
              status: "warning",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
          toast({
            title: `${err.message ? err.message : "Something went wrong!"}`,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        });
    } else {
      toast({
        title: "Oops! password is not matching ",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <div id="container">
      <div id="signup-card">
        {/* <img src={logo} width={"100px"} alt="eroyu" /> */}
        <Text fontSize="20px">Register</Text>
        <div>
          <form onSubmit={handleRegister}>
            <label>Name</label>
            <br />
            <input
              placeholder="enter your name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="name"
              name="name"
            />
            <br />
            <label>Email</label>
            <br />
            <input
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
            />
            <br />
            <label>Password</label>
            <br />
            <input
              placeholder="minimum 8 characters"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name=""
              id=""
            />
            <br />
            <label>Confirm Password</label>
            <br />
            <input
              placeholder="confirm password"
              minLength={6}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              type="password"
              name="confirm-password"
            />
            <br />
            <button
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500"
              type="submit"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
