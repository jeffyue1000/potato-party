"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "./verifyemail.css";

export default function VerifyEmailPage(){
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token]);

    const verifyUserEmail = async() => {
        try{
            await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
        } catch(error){
            setError(true);
            console.log(error.response.data);
        }
    }

    return(
        <div className="container"> 
            <div className="title">Potato Couch Logo</div>
            <div className="verify-box">
                <h1 className="verify-header">Verify Email</h1>
                {!verified && (
                    <div>
                        <div className="verify-text">Check your email to verify your account.</div>
                        <div className="verify-text">You may close out of this page.</div>
                    </div>
                )}
                {verified && (
                    <div className="verify-success">
                        <div className="success-text">Email Verified!</div>
                        <Link className="success-text" href="/login">Return to Login Page</Link>
                    </div>
                )}
                {error && (
                    <div className="verify-text">Error</div>
                )}
            </div>
        </div>
    )
}