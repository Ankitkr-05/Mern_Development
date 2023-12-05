import React, { useState, useContext } from "react"
import signinImage from '../Image/signinImage.jpg';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios"
import { ContextData } from "../App";

const LogIn = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    // 15.iv) useContext
    const {stateVal, dispatch} = useContext(ContextData);

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Value of user entered details::", userEmail, userPassword);

        // In backend as we are using : "/login"
        // const responseData = await fetch("/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         emailid: userEmail,
        //         password: userPassword
        //     })
        // })

        // const loginDetail = await responseData.json();


        const responseData = await axios.post("/login", {
            emailid: userEmail,
            password: userPassword         
        })

        const loginDetail = await responseData;
        console.log("Login Details::", loginDetail);

        // For Status: check whatever returning from backend
        if(loginDetail.status === 400 || loginDetail.error){
            window.alert("InValid credential")
        }else{
            // 15.iv) dispatch
            dispatch({type:"Login", payload:true})
            console.log("Login success");
            window.alert("Valid credential")
            navigate("/")
        }

    }
    return (
        <>
            <div className="form-main">
                <section className="form-section form-section-login">
                    <img className="form-img form-img-login" src={signinImage} alt="photo" />

                    <form className="form-style" method="POST" onSubmit={(e) => handleSubmit(e)}>
                        {/* <label>First Name</label>
                        <input type="text" name="name" value="" /> */}

                       <div><h4 style={{color: "rgb(130, 29, 155)"}}>Sign In</h4></div>

                       <div className="form-div">
                            <label htmlFor="Name">
                                <i className="zmdi zmdi-account"></i>
                            </label>
                            <input 
                            type="email" 
                            name="userEmail" 
                            value={userEmail} 
                            placeholder="Your Email"
                            onChange={(e) => setUserEmail(e.target.value)} 
                            />
                       </div>

                       <div className="form-div">
                            <label htmlFor="Password">
                                <i className="zmdi zmdi-lock"></i>
                            </label>
                            <input 
                            type="password"
                            name="userPassword" 
                            value={userPassword} 
                            placeholder="Password" 
                            onChange={(e) => setUserPassword(e.target.value)} 
                            />
                       </div>

                       <button type="submit" className="form-button">Login</button>
                       <div className="btn-msg">
                        <div>New User</div>
                        <NavLink to="/registration">Create an Account</NavLink>
                       </div>

                       
                    </form>
                </section>
            </div>
        </>
    )
}

export default LogIn;