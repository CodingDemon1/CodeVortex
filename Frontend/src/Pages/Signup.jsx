import React, { useState } from 'react'
import "../css/signup.css"
import logo from "../images/code-vortex-logo.png";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import {useNavigate} fro/m
const baseUrl = "localhost:5000"
const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setname] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const navigate = useNavigate()
    const handleRegister = (e) => {
        e.preventDefault();
        if (password === confirmPass) {
            const payload = {
                email,
                password,
                name
            }
            axios.post(`http://localhost:5000/user/register`, payload)
                .then((res) => {
                    console.log(res.data)
                    alert(res.data.msg)
                    // navigate("/login")
                })
                .catch((err) => {
                    console.log(err.message)
                    alert(err.message)
                })

        } else {
            alert("Oops! password is not matching ")
        }
    }

    return (
        <div id='container'>

            <div id='signup-card'>
                {/* <img src={logo} width={"100px"} alt="eroyu" /> */}
                <Text fontSize="20px">Register</Text>
                <div>
                    <form onSubmit={handleRegister}>
                        <label >Name</label>
                        <br />
                        <input placeholder='enter your name' value={name} onChange={(e) => setname(e.target.value)} type="name" name="name" />
                        <br />
                        <label >Email</label>
                        <br />
                        <input placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" />
                        <br />
                        <label>Password</label>
                        <br />
                        <input placeholder='minimum 8 characters' minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="" id="" />
                        <br />
                        <label >Confirm Password</label>
                        <br />
                        <input placeholder='confirm password' minLength={6} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" name="confirm-password" />
                        <br />
                        <button type="submit">Sign up</button>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default Signup