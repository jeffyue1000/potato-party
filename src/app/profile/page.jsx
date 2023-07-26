"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ProfilePage(){
    const router = useRouter();
    const logout = async() => {
        try{
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error){
            console.log(error.message);
            toast.error(error.message);
        }
    }
    return (
        <div>
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p> 
            <button onClick={logout}>Logout</button>
        </div>
    )
}