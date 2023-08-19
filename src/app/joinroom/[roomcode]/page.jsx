"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Video, CloudinaryContext } from "Cloudinary-react";
import { InvalidRoomPage } from "./InvalidRoom";
import io from "socket.io-client";
import "./watchroom.css"

export default function Watchroom(){
    const [publicID, setPublicID] = useState(""); 
    const [openRoom, setOpenRoom] = useState(true);
    const [roomCode, setRoomCode] = useState("");
    const [socket, setSocket] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const videoRef = useRef(null);
    
    useEffect(() => {
        setRoomCode(window.location.pathname.split("/")[2]);
    }, [])

    useEffect(() => {
        if(roomCode.length > 0){
            isOpenRoom();
            getVideo(); 
        }
    }, [roomCode])

    useEffect(() => {
        console.log("Connecting to WebSocket server...");
        const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
            transports: ["websocket"],
        });
    
        newSocket.on("connect", () => {
            console.log("Connected to WebSocket server");
        });
    
        newSocket.on("sync-playback", (data) => {
            console.log("Received sync-playback:", data);

            videoRef.current.currentTime = data.time;

            if(data.state === "playing"){
                videoRef.current.play();
            }
            else if(data.state === "paused"){
                videoRef.current.pause();
            }
        });

        // newSocket.on("seek", (data) => {
        //     if(!isSeeking){
        //         videoRef.current.currentTime = data.time;
        //     }
        // });
    
        setSocket(newSocket);
    
        return () => {
            console.log("Disconnecting from WebSocket server...");
            newSocket.disconnect();
        };
      }, []);
      
    const isOpenRoom = async() => {
        try{
            await axios.post("/api/users/roomExists", {roomCode});
        } catch(error){
            setOpenRoom(false);
            console.log(error.message);
        }
    }

    const getVideo = async() => {
        try{
            const response = await axios.post("/api/users/loadVideo", {roomCode});
            console.log(response.data);
            if(response.data.message === "Public ID found"){

                setPublicID(response.data.data)
            }
        } catch(error){
            console.log(error.message);
        }
    }

    const handlePlay = () => {
        setIsPlaying(true);
        socket.emit("sync-playback", {time: videoRef.current.currentTime, state: "playing"});
    }

    const handlePause = () => {
        setIsPlaying(false);
        socket.emit("sync-playback", {time: videoRef.current.currentTime, state: "paused"})
    }

    const handleSeeking = () => {
        setIsSeeking(true);
    }

    const handleSeeked = () => {
        if(isPlaying){
            setIsSeeking(false);

            socket.emit("seek", {time: videoRef.current.currentTime});
        }
    }
    
    return(
        <div>
            {openRoom ? 
                <div className="video-box">
                    <h2 className="room-code"> Room Code: {roomCode} </h2>
                    <CloudinaryContext cloud_name="do5pxnewl">
                        <Video
                            publicId={publicID}
                            innerRef={videoRef}
                            onPause={handlePause}
                            onPlay={handlePlay}
                            // onSeeking={handleSeeking}
                            // onSeeked={handleSeeked}
                            width="500px"
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