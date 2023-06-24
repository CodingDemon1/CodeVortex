import React, { useEffect, useState } from "react";
import "../css/login.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_AUTH } from "../Redux/actionTypes";
import {
  Center,
  Divider,
  Heading,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  const auth = useSelector((store) => store.reducer.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (auth) {
      location.state ? navigate(location.state) : navigate("/home");
    }
  }, [auth]);

  const handleLogin = (e) => {
    e.preventDefault();
    const payload = { email, password };
    axios
      .post(`${url}/user/login`, payload)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("id", res.data.user._id);
        toast({
          title: `${
            res.data.user.name
              ? `${res.data.user.name} succesfully logged in`
              : res.data.msg
          }`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem("token", res.data.Accesstoken);
        dispatch({
          type: USER_AUTH,
          auth: true,
          payload: res.data.user,
          token: res.data.Accesstoken,
        });
        navigate("/home");
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
  };

  return (
    <div id="container">
      <div id="login-card">
        {/* <h2>Please Login</h2> */}
        {/* <img src="" alt="" srcset="" /> */}
        <div>
          <form onSubmit={handleLogin}>
            <label>Username</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <br />
            <button
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500"
              type="submit"
            >
              Login
            </button>
          </form>
          <Link to="/resetPass">
            <h5>Forgot password?</h5>
          </Link>
        </div>
      </div>
      <div>
        <p>
          {" "}
          Don't have account? <Link to={"/signup"}>SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
