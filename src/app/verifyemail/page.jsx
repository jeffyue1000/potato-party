"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

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
        <div> 
            <h1>Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            {!verified && (
                <div>
                    <h2>Please check your email to verify your account</h2>
                    <h2>Reload once verified</h2>
                </div>
            )}
            {verified && (
                <div>
                    <h2>Email Verified</h2>
                    <Link href="/login">Login Page</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error</h2>
                </div>
            )}
        </div>
    )
}