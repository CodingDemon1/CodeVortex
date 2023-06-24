import React, { useEffect, useState } from "react";
import axios from "axios";

const useVerify = () => {
  const [verified, setverified] = useState(true);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  useEffect(() => {
    console.log(`${url}/user/verify`);
    verifyToken();
  }, []);

  function verifyToken() {
    axios
      .get(`${url}/user/verify`, {
        headers: {
          "Content-Type": "application/json",
          Auth: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.msg == "Success") {
          setverified(true);
          setUser(res.data.user);
          setToken(res.data.token);
        } else {
          setverified(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setverified(false);
      });
  }

  return { verified, user, token };
};

export default useVerify;
