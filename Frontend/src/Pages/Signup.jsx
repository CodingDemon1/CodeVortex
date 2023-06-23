import React from 'react'
import "../css/signup.css"
import logo from "../images/charityhero_logo.png";
const Signup = () => {
    return (
        <div id='container'>

            <div id='signup-card'>
                <img src={logo} width={"100px"} alt="eroyu" />
                {/* <h2 >Register user</h2> */}
                <div>
                    <form >
                        <label >Email</label>
                        <br />
                        <input placeholder='enter your email'  type="email" name="email" />
                        <br />
                        <label >Mobile</label>
                        <br />
                        <input placeholder='enter mobile number'  type="mobile" name="mobile" />
                        <br />
                        <label>Password</label>
                        <br />
                        <input placeholder='password must be atleast of 8 characters' type="password" name="" id="" />
                        <br />
                        <label >Confirm Password</label>
                        <br />
                        <input placeholder='confirm password' type="password" name="confirm-password" />
                        <br />
                        <button type="submit">Sign up</button>
                    </form>
                    
                </div>
            </div>
          
        </div>
    )
}

export default Signup