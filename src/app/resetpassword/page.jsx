"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "./resetpassword.css"

export default function ForgotPasswordPage(){
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState({
        token: "",
        password: "",
    })

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setUser({...user, token: urlToken});
    }, [])
    useEffect(() => {
        const resetBtn = document.getElementById("reset-btn");

        if(user.password.length > 0 && confirmPassword.length > 0 && user.password === confirmPassword){
            setPasswordsMatch(true);
            resetBtn.disabled = false;
        }
        else if(user.password.length > 0 && confirmPassword.length > 0 && user.password !== confirmPassword){
            setPasswordsMatch(false);
            resetBtn.disabled = true;
        }
        else{
            setPasswordsMatch(true);
            resetBtn.disabled = true;
        }
    }, [confirmPassword])

    const resetPassword = async() => {
        try{
            console.log(user.token)
            const response = await axios.post("/api/users/resetPassword", user);
            console.log("Password changed", response.data);
            setSuccess(true);
        } catch(error){
            console.log("Reset failed", error.message);
        }
    };

    return(
        <div className="container">
            <div className="title">Potato Couch Logo</div>
            <div className="reset-password-box">
                <h1 className="reset-password-header">Reset Password</h1>
                <div className="user-input">
                    <label htmlFor="password">New Password</label>
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        placeholder="Type password here"
                        onChange={e => {
                            setUser({...user, password: e.target.value})
                        }}
                    />
                </div>
                <div className="user-input">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        placeholder="Re-type password here"
                        onChange={e => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                </div>
                {!passwordsMatch && (
                    <div className="password-match">Passwords do not match!</div>
                )}
                <button className="reset-btn" id="reset-btn" onClick={resetPassword}>Reset Password</button>
                {success && (
                    <div className="to-login">
                        <div className="reset-success">Password has been reset!</div>
                        <Link href="/login">Return to Login</Link>
                    </div>
                )}

            </div>
        </div>
    )
}