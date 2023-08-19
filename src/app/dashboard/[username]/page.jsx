"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import "./watchlist.css"

export default function PersonalPage(){
    const router = useRouter();
    const [watchlist, setWatchlist] = useState([{
        title: "",
        link: "",
    }]);
    const [toAdd, setToAdd] = useState({
        username: "",
        title: "",
        link: ""
    });

    useEffect(() => {
        const addBtn = document.getElementById("add-btn");
        if(toAdd.title.length > 0){
            addBtn.disabled = false;
        }
        else{
            addBtn.disabled = true;
        }
    }, [toAdd])

    useEffect(() => {
        getUserData();
    }, [])

    const addToWatchlist = async() => {
        try{
            const response = await axios.post("/api/users/addToWatchlist", toAdd);
            setWatchlist(response.data.data.watchlist);
            setToAdd({...toAdd, title: "", link: ""});
        } catch(error){
            console.log(error.message);
        }
    }
    const clearWatchlist = async() => {
        try{
            const username = toAdd.username;
            const response = await axios.post("/api/users/clearWatchlist", {username});
            setWatchlist(response.data.data.watchlist);
        } catch(error){
            console.log(error.message);
        }
    }
    const logout = async() => {
        try{
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch(error){
            console.log(error.message);
        }
    }

    const getUserData = async() => {
        try{
            const response = await axios.get("/api/users/me");
            setToAdd({...toAdd, username: response.data.data.username});
            setWatchlist(response.data.data.watchlist);
        } catch(error){
            console.log(error.message);
        }
    }

    return(
        <div className="container">
            <div className="title">Potato Party Logo</div>
            <div className="watchlist-box">
                <h1 className="watchlist-header">{toAdd.username}'s Watchlist</h1>
                <div className="add-to-watchlist">
                    <div className="watchlist-inputs">
                        <input 
                            className="add-watchlist-input"
                            id="add-input"
                            value={toAdd.title}
                            placeholder="Type video title here..."
                            onChange={e => {
                                setToAdd({...toAdd, title: e.target.value})
                        }}>
                        </input>
                        <input 
                            className="add-watchlist-link-input"
                            id="add-input"
                            value={toAdd.link}
                            placeholder="Type video link here..."
                            onChange={e => {
                                setToAdd({...toAdd, link: e.target.value})
                        }}>
                        </input>
                    </div>
                    <div className="watchlist-btn-box">
                        <button className="add-btn" id="add-btn" onClick={addToWatchlist}>Add</button>
                        <button className="clear-btn" onClick={clearWatchlist}>Clear</button>

                    </div>
                </div>
                <ol className="watchlist">
                    {watchlist.map((value, index) => (
                        <li className="watchlist-member" key={index}>
                            {value.link === "" ? 
                                value.title :
                                <a href={`${value.link}`}>
                                    {value.title}
                                </a> 
                            }
                        </li>
                    ))}
                </ol>
                <div className="navigation-btns">
                    <button className="profile-btn" onClick={() => {router.push(`/dashboard`)}}>Return to Profile</button>
                    <button className="logout-btn" onClick={() => {logout}}>Return to Login</button>
                </div>
            </div>
        </div>
    )
}