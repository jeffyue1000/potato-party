"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./login.css";

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [invalidLogin, setInvalidLogin] = useState(false);
    const [isVerified, setIsVerified] = useState(true);

    useEffect(() => {
        const loginBtn = document.getElementById("login-btn");
        if(user.email.length > 0 && user.password.length > 0){
            loginBtn.disabled = false;
        }
        else{
            loginBtn.disabled = true;
        }
    }, [user]);
    
    const onLogin = async() => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login succcess", response.data);
            router.push("/dashboard");
        } catch(error){
            const response = await axios.post("/api/users/badLogin", user);
            if(response.data.message === "Email not found" || response.data.message === "Incorrect password"){
                setInvalidLogin(true);
            }
            else if(response.data.message === "User is not verified"){
                setIsVerified(false);
            }
            console.log("Login failed", error.message);
        } finally{
            setLoading(false);
        }
    }

    return(
        <div className="container">
            <div className="title">Potato Couch Logo</div>
            <div className="login-box">
                <h1 className="login-header">{loading ? "Loading..." : "Login"}</h1>
                <div className="user-input">
                    <label htmlFor="emai">Email</label>
                    <input
                        className="email-input"
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
                        className="password-input"
                        type="password"
                        value={user.password}
                        placeholder="Type password here..."
                        onChange={e => {
                            setUser({...user, password: e.target.value})
                        }}
                    />
                    <Link className="forgot-pass-link" href="/forgotpassword">Forgot Password?</Link>
                </div>
                {invalidLogin && (
                    <div className="invalid-login">Email or password is incorrect!</div>
                )}
                {!isVerified && (
                    <div className="invalid-login">Account is not verified!</div>
                )}
                <button className="login-btn" id="login-btn" onClick={onLogin}>Login</button>
                <div className="to-signup">
                    <div className="no-account">Don't have an account?</div>
                    <Link href="/signup">Sign Up Here</Link>
                </div>
            </div>
        </div>

    )
}