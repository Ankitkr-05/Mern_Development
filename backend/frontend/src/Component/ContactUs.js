import React, { useState, useRef, useEffect } from "react"
import contactImg from '../Image/contactImg.jpg';

const Contact = () => {
    const [userDetail, setUserDetail] = useState({
        username:"", emailid: "", phonenum: "", title: "", usermessage: ""
    });
    const loadDataFlag = useRef(false);

    const onLoadAboutPage = async () => {

        // No need to send token
        const responseData = await fetch("/getUserData", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const userData = await responseData.json();
        if(responseData.status!=200){

        }else{
            setUserDetail({...userDetail, username:userData.username, emailid:userData.emailid, phonenum:userData.phonenum})
        }
    }

    useEffect(() => {
        if(!loadDataFlag.current){
            onLoadAboutPage();
            loadDataFlag.current = true
        }
    }, []);

    const handleDataChange = (e) => {
        const {name, value} = e.target;
        setUserDetail({...userDetail, [name]: value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
       try{
        const {username, emailid, phonenum, title, usermessage} = userDetail;
        const sendData = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                emailid,
                phonenum,
                title,
                usermessage
            })
        });

        const response = await sendData.json();

        if(sendData.status === 201){
            window.alert("Message sent Successfully :) You can find the status in About Page.")
        }
       }
       catch(err){
         console.log(err)
       }
    }



    return (
        <>
            <div className="form-main">
                <section className="form-section form-section-contact">
                    <img className="form-img form-img-contact" src={contactImg} alt="photo" />

                    <form className="form-style" method="POST" onSubmit={(e) => handleSubmit(e)}>
                        {/* <label>First Name</label>
                        <input type="text" name="name" value="" /> */}

                       <div><h4 className="form-title">Contact Us</h4></div>

                        
                        <div className="form-fields">
                            
                            <div className="form-group">
                                <input type="text" 
                                name="username" 
                                value={userDetail?.username} 
                                placeholder="Your Name" 
                                />
                            </div>

                            <div className="form-group">
                                <input 
                                type="email" 
                                name="emailid" 
                                value={userDetail?.emailid} 
                                placeholder="Your Email"
                                />
                            </div>

                            <div className="form-group">
                                <input 
                                type="number" 
                                name="phonenum" 
                                value={userDetail?.phonenum} 
                                placeholder="Contact Number"
                                />
                            </div>

                            <div className="form-group">
                                <input 
                                type="text" 
                                name="title" 
                                value={userDetail.title} 
                                placeholder="Title"
                                onChange={(e) => handleDataChange(e)} 
                                />
                            </div>

                            <div className="form-group">
                                <textarea 
                                name="usermessage" 
                                value={userDetail.usermessage}
                                placeholder="Write your message here"
                                onChange={(e) => handleDataChange(e)} 
                                >
                                </textarea>
                            </div>
                        </div>
                        <button type="submit" className="form-button">Submit</button>
                       
                    </form>
                </section>
            </div>
        </>
    )
}

export default Contact;