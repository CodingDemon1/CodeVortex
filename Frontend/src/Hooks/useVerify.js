import React, { useEffect, useState } from "react";
import axios from "axios";

const useVerify = () => {
  const [verified, setverified] = useState(true);

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
          Auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDk1YzEyM2JlODJhMTAzMDczZjMwMDkiLCJpYXQiOjE2ODc1MzU5MTd9.xpJ9K_SwYMRtNsiFIOlceYMkyDnywmIwRwVnjbq6U0U",
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.msg == "Success") {
          setverified(true);
        } else {
          setverified(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setverified(false);
      });
  }

  return verified;
};

export default useVerify;
