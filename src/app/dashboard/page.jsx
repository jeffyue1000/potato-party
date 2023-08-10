"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css"

export default function ProfilePage(){
    const router = useRouter();
    const [roomCode, setRoomCode] = useState("");
    const [user, setUser] = useState({
        username: "",
        email: "",
        verified: true,
        admin: false,
    });

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = async() => {
        try{
            const response = await axios.get("/api/users/me");

            setUser({
                username: response.data.data.username, 
                email: response.data.data.email, 
                verified: response.data.data.isVerified, 
                admin: response.data.data.isAdmin,
            });
        } catch(error){
            console.log(error.message);
        }
    }
    const joinRoom = () => {

    }

    const logout = async() => {
        try{
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error){
            console.log(error.message);
        }
    }
    return (
        <div className="container">
            <div className="title">Potato Couch Logo</div>
            <div className="dashboard-box">
                <h1 className="dashboard-header">{user.username}'s Profile</h1>
                <div className="user-attributes"> 
                    <div className="username-password">
                        <div className="username">Username: {user.username}</div>
                        <div className="verified"> Verified: {user.verified ? "True" : "False"}</div>
                    </div>
                    <div className="email-admin">
                        <div className="email">Email: {user.email}</div>

                        <div className="admin">Admin: {user.admin ? "True" : "False"}</div>
                    </div>
                </div>
                <div className="room-btns">
                    <button className="new-room-btn" onClick={() => {router.push("/createroom")}}>Create New Room</button>
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
                        <button className="watchlist-btn" onClick={() => {router.push(`/dashboard/${user.username}`)}}>View Watchlist</button>
                    </div>
                    <button className="logout-btn" onClick={logout}>Return to Login</button>
                </div>
            </div>
        </div>
    )
}