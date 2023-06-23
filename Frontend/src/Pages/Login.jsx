import React from 'react'
import "../css/login.css";
const Login = () => {
    return (
        <div id='container'>

            <div id='login-card'>
                <h2 >Please Login</h2>
                {/* <img src="" alt="" srcset="" /> */}
                <div>
                    <form >
                        <label >Username</label>
                        <br />
                        <input type="email" name="email" />
                        <br />
                        <label>Password</label>
                        <br />
                        <input type="password" name="" id="" />
                        <br />
                        <button type="submit">Login</button>
                    </form>
                    <a href="http://">
                        <h5>Forgot password?</h5>

                    </a>
                </div>
            </div>
            <div>
                <p> Don't have account?  <a href="">
                    SignUp</a></p>
            </div>
        </div>
    )
}

export default Login