"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Video, CloudinaryContext } from "Cloudinary-react";
import { InvalidRoomPage } from "./InvalidRoom";
import "./watchroom.css"

export default function Watchroom(){
    const [publicID, setPublicID] = useState(""); 
    const [openRoom, setOpenRoom] = useState(true);
    const [roomCode, setRoomCode] = useState("");

    useEffect(() => {
        isOpenRoom();
        getVideo();
    }, [])

    const isOpenRoom = async() => {
        try{
            setRoomCode(window.location.pathname.split("/")[2]);
            await axios.post("/api/users/roomExists", roomCode);
        } catch(error){
            setOpenRoom(false);
            console.log(error.message);
        }
    }
    const getVideo = async() => {
        try{
            const response = await axios.post("/api/users/loadVideo", roomCode);
            if(response.data.message === "Public ID found"){
                setPublicID(response.data.data)
            }
        } catch(error){
            console.log(error.message);
        }
    }

    return(
        <div>
            {openRoom ? 
                <div>
                    <CloudinaryContext cloud_name="do5pxnewl">
                        <Video
                            publicId={publicID}
                            width="100%"
                            controls
                        />
                    </CloudinaryContext>
                </div>
                :
                <InvalidRoomPage/>
            }
        </div>


    )
}