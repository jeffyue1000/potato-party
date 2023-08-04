"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./signup.css";
import { resolve } from "styled-jsx/css";

export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [doubleInvalid, setDoubleInvalid] = useState(false);

    useEffect(() => {
        const signupBtn = document.getElementById("signup-btn")

        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            signupBtn.disabled = false;
        }
        else{
            signupBtn.disabled = true;
        }
    }, [user]);

    const onSignUp = async() => {
        try{
            setLoading(true);
            setInvalidEmail(false);
            setInvalidUsername(false);
            setDoubleInvalid(false);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/verifyemail");

        } catch(error){
            const response = await axios.post("/api/users/badSignup", user);
            if(response.data.message === "Email already exists"){
                setInvalidEmail(true);
            }
            if(response.data.message === "Username already exists"){
                setInvalidUsername(true);
            }
            if(response.data.message === "Both username and email exist"){
                setDoubleInvalid(true);
            }
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    };

    return(
        <div className="container">
            <div className="title">Potato Couch Logo</div>
            <div className="signup-box">
                <h1 className="signup-header">{loading ? "Loading..." : "Signup"}</h1>
                <div className="user-input">
                    <label htmlFor="username">Username</label>
                    <input
                        className="usernameinput"
                        id="username"
                        type="text"
                        value={user.username}
                        placeholder="Type username here..."
                        onChange={e => {
                            setUser({...user, username: e.target.value})
                        }}
                    />
                </div>
                <div className="user-input">
                    <label htmlFor="emai">Email</label>
                    <input
                        id="email"
                        type="text"
                        value={user.email}
                        placeholder="Type email here..."
                        onChange={e => {
                            setUser({...user, email: e.target.value})
                        }}
                    />
                </div>
                <div className="user-input">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        placeholder="Type password here..."
                        onChange={e => {
                            setUser({...user, password: e.target.value})
                        }}
                    />
                </div>
                {doubleInvalid && (
                    <div className="invalid-signup">Both username and email already taken!</div>
                )}
                {invalidEmail && (
                    <div className="invalid-signup">An account with that email already exists!</div>
                )}
                {invalidUsername && (
                    <div className="invalid-signup">Username is already taken!</div>
                )}
                <button className="signup-btn" id="signup-btn" onClick={onSignUp}>Sign Up</button>
                <div className="to-login">
                    <div className="account-already">Already have an account?</div>
                    <Link href="/login">Login Instead</Link>
                </div>
            </div>
        </div>
    )
}