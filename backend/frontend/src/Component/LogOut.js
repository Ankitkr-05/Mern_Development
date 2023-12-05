import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../App";

const LogOut = () => {
    const referenceFlag = useRef(false);
    const navigate = useNavigate();

    // 15.iv) useContext
    const userData = useContext(ContextData);

    useEffect(() => {

        if(referenceFlag.current === false){
            // Using Promise:
            const responseData = fetch("/logout", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                credentials: "include"
            }).then(() => {
                // 15.iv) dispatch
                userData.dispatch({type:"Login", payload:false})
                navigate("/login");
            }).catch((err) => {
                console.log(err)
            });

            referenceFlag.current = true; 
        }
        
    }, []);

    return (<>
        <div>Welcome to Log Out Page</div>
    </>)
}

export default LogOut;