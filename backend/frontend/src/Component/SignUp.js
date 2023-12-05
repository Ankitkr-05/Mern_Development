import React, {useState} from "react";
import signupImage from '../Image/signupImage.jpg';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";

const Registration = () => {
    const [userData, setUserData] = useState({
        username: "", phonenum: "", emailid: "", password: "", confirmpass: "", gender: ""
    })

    // const history = useHistory();
    const navigate = useNavigate();

    const handleUserData = (event) => {
        let targetName = event.target.name;
        let targetValue = event.target.value;

        console.log("Val of targetName & targetValue::", targetName, targetValue)

        setUserData({...userData, [targetName]: targetValue})

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const {username, phonenum, emailid, password, confirmpass, gender} = userData;
            
            console.log("Value of data", username, phonenum);

        // Using Fetch:
        // const responseData = await fetch("/registration", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json" 
        //     },
        //     body: JSON.stringify({
        //         username, 
        //         phonenum, 
        //         emailid, 
        //         password, 
        //         confirmpass, 
        //         gender
        //     })
        // })

        // const sentData = await responseData.json()
        // console.log("Response Data is::", sentData)

        // Using Axios:
        const responseData = await axios.post("/registration", {
                username,
                emailid,
                phonenum,
                password,
                confirmpass,
                gender
        })


     const sentData = await responseData.data
        console.log("Response Data is::", sentData)

        if(sentData.status === 422 || !sentData){
            window.alert("Invalid Registration")
        }
        else{
            window.alert("Registration Valid");
            navigate("/login")
            console.log("Sucess Msg :)")
        }

     
        }
        catch (error) {
            // Network error or JSON parsing error
            console.error("Error during registration:", error);
            window.alert("Error during registration");
          }

    }


    return (
        <>
            <div className="form-main">
                <section className="form-section">
                    <form className="form-style" method="POST" onSubmit={(e) => handleSubmit(e)}>
                        {/* <label>First Name</label>
                        <input type="text" name="name" value="" /> */}

                       <div><h4 style={{color: "rgb(130, 29, 155)"}}>Registration</h4></div>

                       <div className="form-div">
                            <label htmlFor="Name">
                                <i className="zmdi zmdi-account"></i>
                            </label>
                            <input type="text" name="username" value={userData.username} onChange={(e) => handleUserData(e)} placeholder="Your Name" autoComplete="false" />
                       </div>

                       <div className="form-div" method="POST">
                            <label htmlFor="Phone">
                                <i className="zmdi zmdi-phone"></i>
                            </label>
                            <input type="number" name="phonenum" value={userData.phonenum} onChange={(e) => handleUserData(e)} placeholder="Your Number" autoComplete="false" />
                       </div>

                       <div className="form-div">
                            <label htmlFor="Email">
                                <i className="zmdi zmdi-email"></i>
                            </label>
                            <input type="email" name="emailid" value={userData.emailid} onChange={(e) => handleUserData(e)} placeholder="Your Email" />
                       </div>

                       <div className="form-div">
                            <label htmlFor="Password">
                                <i className="zmdi zmdi-lock"></i>
                            </label>
                            <input type="password" name="password" value={userData.password} onChange={(e) => handleUserData(e)} placeholder="Password" autoComplete="false" />
                       </div>
                        
                       <div className="form-div">
                            <label htmlFor="Confirm Password">
                                <i className="zmdi zmdi-lock"></i>
                            </label>
                            <input type="password" name="confirmpass" value={userData.confirmpass} onChange={(e) => handleUserData(e)} placeholder="Confirm Password" autoComplete="false" />
                       </div>
                    
                       <div className="form-div">
                            <label htmlFor="Gender">
                                {(userData.gender === "male") ? <i className="zmdi zmdi-male-alt"></i> :
                                (userData.gender === "female") ? <i className="zmdi zmdi-female"></i> :
                                <i className="zmdi zmdi-male-female"></i>
                                }
                            </label>
                            <select className="form-select" name="gender" onChange={(e) => handleUserData(e)}>
                                <option>Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                       </div>

                       <button type="submit" className="form-button">Create Account</button>
                       {/* <input type="submit" value="submit" onClick={handleSubmit} /> */}
                       <div className="btn-msg">
                        <div>User already registered</div>
                        <NavLink to="/login">Sign In</NavLink>
                       </div>

                       
                    </form>
                    <img className="form-img" src={signupImage} alt="photo" />
                </section>
            </div>
        </>
    )
}

export default Registration;