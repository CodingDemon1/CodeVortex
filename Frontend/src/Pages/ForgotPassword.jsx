import React, { useState } from 'react'

const ForgotPassword = () => {
    const [btnText, setBtnText] = useState(false);
    const handleForm = (event) => {
        event.preventDefault();
        
        if (!btnText) {
            // do fetch post here for checking email if it is presnet in backend then  send otp and 
            // ----in.then..setBTNTEXT to true---
            setBtnText(true)
        // -- in catch
            // user not found
        } else {
    // check otp is correct or not 
            // if it correcrt then allow to changr oassword
        }
    }
    return (
        <div id='container'>

            <div id='login-card'>
                <h2 >Enter your email</h2>

                <div>
                    <form onSubmit={handleForm} >
                        <label >Email</label>
                        <br />
                        <input placeholder='enter your email' type="email" name="email" disabled={btnText} />
                        <br />
                        {
                            btnText ? (<input/>):""
}
                        <button type="submit">{btnText ? "Verify OTP" : "Send OTP"}</button>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default ForgotPassword