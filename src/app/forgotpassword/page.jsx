"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "./forgotpassword.css"

export default function ForgotPasswordPage(){
    const [email, setEmail] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => { 
        const forgotBtn = document.getElementById("forgot-btn");
        if(email.length > 0){
            forgotBtn.disabled = false;
        }
        else{
            forgotBtn.disabled = true;
        }
    }, [email])

    const sendForgotPasswordEmail = async() => {
        try{
            setInvalidEmail(false);
            setLoading(true);
            await axios.post("/api/users/forgotPassword", {email});
            setEmailSent(true);
            setLoading(false);
        } catch(error){
            const response = await axios.post("/api/users/badEmail", {email});
            if(response.data.message === "Email not found"){
                setInvalidEmail(true);
            }
            setLoading(false);
        }
    }
    return(
        <div className="container">
            <div className="title">Potato Couch Logo</div>
            <div className="forgot-password-box">
                <h1 className="forgot-password-header">{loading ? "Loading..." : "Forgot Password"}</h1>
                <div className="reset-instructions">
                    To reset your password, please enter your email below to receive a reset password link.
                </div>
                <div className="user-input">
                    <label htmlFor="password">Email</label>
                    <input
                        className="email-input"
                        type="text"
                        value={email}
                        placeholder="Type email here..."
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                {invalidEmail && (
                    <div className="invalid-email">Cannot find an account with that email!</div>
                )}
                {emailSent && (
                    <div className="email-sent">Email sent!</div>
                )}
                <button className="forgot-btn" id="forgot-btn" onClick={sendForgotPasswordEmail}>Send Reset Link</button>
                <Link className = "return-login" href="/login">Return to Login</Link>
            </div>
        </div>
    )
}