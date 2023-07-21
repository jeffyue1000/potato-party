"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { axios } from "axios";
import "./signup.css"

export default function SignupPage(){
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const onSignUp = async() => {

    }

    return(
        <div>
            <h1>Signup</h1>
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
            <button onClick={onSignUp}>Sign Up</button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    )
}