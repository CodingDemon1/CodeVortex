import React, { useState } from 'react'
import "../css/forgotpassword.css";
import { PinInput, PinInputField, HStack } from '@chakra-ui/react';
import logo from "../images/code-vortex-logo.png";
import axios from 'axios';
const ForgotPassword = () => {
    const [btnText, setBtnText] = useState(false);
    const [pins, setPin] = useState("")
    const [email, setEmail] = useState("");
    const [otp, setOtP] = useState();
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [password, setPassword] = useState("")

    const handleForm = (event) => {
        event.preventDefault();

        if (!btnText) {

            //checking email is present or not in DB. if true then sending otp from BE allowing to show PIN
            // ----in.then..setBTNTEXT to true---
            axios.post("localhost:5000/user/forget-password/email")
                .then((res) => {
                    setOtP(res.data)
                    setBtnText(true)
                }).catch((err) => alert(err.message))
            // -- in catch
            // user not found
        } else {
            // check otp is correct or not
            // if correcrt then show and allow to change Password
            if (otp == pins) {
                setShowChangePassword(true)
            } else {
                alert("OTP doesn't matched")
            }
            //request for updating the password
            if (showChangePassword) {
                axios.patch("url")
                    .then((res) => {
                        alert("Password reset successfull !")
                    })
                    .catch((err) => alert(err.message))
            }

        }
    }
    return (
        <div id='container'>

            <div id='forgot-card'>
                <h1>Forgot Password</h1>
                {/* <img src={logo} alt="code-vertex" /> */}
                <div>
                    <form onSubmit={handleForm} >
                        <label >Email</label>
                        <br />
                        <input placeholder='enter your email' onChange={(e) => setEmail(e.target.value)} type="email" name="email" disabled={btnText} />
                        <br />
                        {
                            btnText && !showChangePassword ? (<HStack>
                                <PinInput className="pin-head" onChange={(e) => setPin(e)} placeholder=''>
                                    <PinInputField className="pin-input" />
                                    <PinInputField className="pin-input" />
                                    <PinInputField className="pin-input" />
                                    <PinInputField className="pin-input" />
                                </PinInput>
                            </HStack>) : ""
                        }

                        {
                            showChangePassword ? (
                                <input placeholder='Reset your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            ) : ""
                        }
                        <button type="submit">{btnText && !showChangePassword ? "Verify OTP" : showChangePassword ? "RESET" : "Send OTP"}</button>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default ForgotPassword