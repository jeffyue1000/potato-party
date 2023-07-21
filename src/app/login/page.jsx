"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { axios } from "axios";

export default function LoginPage(){
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const onLogin = async() => {

    }

    return(
        <div>
            <h1>Login</h1>
            <hr/>
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
            <button onClick={onLogin}>Login</button>
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    )
}