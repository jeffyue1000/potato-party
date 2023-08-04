"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "./dashboard.css"

export default function ProfilePage(){
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [hiddenPassword, setHiddenPassword] = useState("xxxxxxxxxxx");
    const [roomCode, setRoomCode] = useState("");
    const [user, setUser] = useState({
        username: "tester",
        email: "jeffyue1000@gmail.com",
        password: "Test Password",
        admin: false,
    });

    // useEffect(() => {
    //     getUserData();
    //     let newHiddenPassword = "";
    //     for(let i = 0; i < user.password.length; i++){
    //         newHiddenPassword += "*";
    //     }
    //     setHiddenPassword(newHiddenPassword);
    // }, [])

    const getUserData = async() => {
        const result = await axios.get("/api/users/me");
        console.log("check")

        setUser({
            username: response.data.data.username, 
            email: response.data.data.email, 
            password: response.data.data.password, 
            admin: esponse.data.data.isAdmin
        });
    }
    
    const createNewRoom = () => {

    }
    const joinRoom = () => {

    }

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
    const toWatchlist = () => {
        router.push(`/dashboard/${user.username}`);
    }
    return (
        <div className="container">
            <div className="title">Potato Couch Logo</div>
            <div className="dashboard-box">
                <h1 className="dashboard-header">{user.username}'s Profile</h1>
                <div className="user-attributes"> 
                    <div className="username-password">
                        <div className="username">Username: {user.username}</div>
                        <div 
                            onMouseEnter={() => setShowPassword(true)} 
                            onMouseLeave={() => setShowPassword(false)}
                            className="password"> 
                            Password: {showPassword ? user.password : hiddenPassword}
                        </div>
                    </div>
                    <div className="email-admin">
                        <div className="email">Email: {user.email}</div>

                        <div className="admin">Admin: {user.admin ? "True" : "False"}</div>
                    </div>
                </div>
                <div className="room-btns">
                    <button className="new-room-btn" onClick={createNewRoom}>Create New Room</button>
                    <div className="or">or</div>
                    <div className="join-room">
                        <input
                            className="room-code-input"
                            id="room-code-input"
                            type="text"
                            value={roomCode}
                            placeholder="Type room code here..."
                            onChange={e => {
                                setRoomCode(e.target.value);
                            }}
                        />
                        <button className="join-room-btn" onClick={joinRoom}>Join a Room</button>
                    </div>
                </div>
                <div className="or">or</div>
                <div className="watchlist-logout">
                    <div className="to-watchlist">
                        <button className="watchlist-btn" onClick={toWatchlist}>View Watchlist</button>
                    </div>
                    <button className="logout-btn" onClick={logout}>Return to Login</button>
                </div>


            </div>
        </div>
    )
}