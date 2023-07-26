"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user]);
    
    const onLogin = async() => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login succcess", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch(error){
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
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