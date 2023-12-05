import React, { useState, useEffect, useRef } from "react";
import profileImg from "../Image/profileImg.jpg"
import { useNavigate } from "react-router-dom";

const About = () => {
    const [activeTab, setActiveTab] = useState("About");
    const [userDetail, setUserDetail] = useState({});
    const dataLoadedRef = useRef(false);

    
    const navigate = useNavigate();

    const handleActiveTab = (selectedTab) => {
        setActiveTab(selectedTab)
    }

    const onLoadAboutPage = async () => {
        try{
            const responseData = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await responseData.json();

            console.log("Value of About Data is:", data);

            if(responseData.status !== 200 || !data){
                const error = new error("Invalid User");
                throw error;
            }else{
                setUserDetail(data)
            }
            
        }
        catch(err){
            console.log(err);
            navigate("/login")
        }
    }

    useEffect(() => {
        // Check if data has already been loaded
        if (!dataLoadedRef.current) {
            onLoadAboutPage();
            // Set dataLoaded to true using the ref
            dataLoadedRef.current = true;
        }
    }, [])
    
    return (
        <>
            <div className="form-main">
                <section className="form-section about-box-width">
                    <div className="about-page-grid">
                        <div className="first-box">
                            <div>
                                <input type="text" value="Edit Profile" />
                            </div>
                            <div>
                                <h4>{userDetail.username}</h4>
                                <h6>Web Developer</h6>
                                <p>Ranking: <span> 8/10</span></p>
                            </div>
                        </div>

                        <div className="second-box">
                            <div>
                                <img src={profileImg} />
                            </div>
                        </div>

                        <div className="third-box">
                            <div className="third-box-tab">
                                <ul>
                                    <li>
                                        <a className={(activeTab === 'About') ? 'active' : ""} onClick={() => handleActiveTab("About")}>About</a>
                                    </li>
                                    <li>
                                        <a className={(activeTab === 'Timeline') ? 'active' : ""} onClick={() => handleActiveTab("Timeline")}>Timeline</a>
                                    </li>
                                </ul>
                            </div>

                            {
                                (activeTab === 'Timeline') ?
                       
                                <div className="content-second-box" id="timeline">

                                    {userDetail?.contactData.map((item, index) => {
                                        if(index<3){
                                            return (<>
                                                <label>{item.title}</label>
                                                <p>{item.usermessage}</p>
                                                </>)
                                        }
                                    })}
                                </div>

                                :

                                <div className="content-second-box">
                                    <label>Name</label>
                                    <p>{userDetail.username}</p>

                                    <label>Email</label>
                                    <p>{userDetail.emailid}</p>

                                    <label>Mobile</label>
                                    <p>{userDetail.phonenum}</p>

                                    <label>Gender</label>
                                    <p>{userDetail.gender}</p>

                                    <label>Company</label>
                                    <p>Reliance Digital</p>

                                    <label>Profession</label>
                                    <p>Software Developer</p>

                                </div>
                            }

                        </div>
                        <div className="fourth-box">
                            <div>
                                <p>Work Skills</p>
                                <a>Facebook</a><br/>
                                <a>Facebook</a><br/>
                                <a>Facebook</a><br/>
                                <a>Facebook</a><br/>
                                <a>Facebook</a><br/>
                                <a>Facebook</a><br/>
                                <a>Facebook</a><br/>
                                <a>Facebook</a><br/>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}

export default About;