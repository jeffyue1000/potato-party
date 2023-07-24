"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./signup.css"

export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user]);

    const onSignUp = async() => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");

        } catch(error){
            console.log("Signup failed", error.message);
            toast.error(error.message);

        } finally{
            setLoading(false);
        }
    };

    {/* change button to just turn on/off based on buttonDisabled and incorporate email/user/password validation */}
    return(
        <div>
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr/>
            <label for="username">username</label>
            <input
                id="username"
                type="text"
                value={user.username}
                placeholder="type username here"
                onChange={e => {
                    setUser({...user, username: e.target.value})
                }}
            />
            <label for="emai">email</label>
            <input
                id="email"
                type="text"
                value={user.email}
                placeholder="type email here"
                onChange={e => {
                    setUser({...user, email: e.target.value})
                }}
            />
            <label for="password">password</label>
            <input
                id="password"
                type="password"
                value={user.password}
                placeholder="type password here"
                onChange={e => {
                    setUser({...user, password: e.target.value})
                }}
            />
            <button onClick={onSignUp}>{buttonDisabled ? "Signup Unavailable" : "Signup"}</button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    )
}