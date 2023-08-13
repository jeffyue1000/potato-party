"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Video, CloudinaryContext } from "Cloudinary-react";
import "./watchroom.css"

export default function Watchroom(){
    const [publicID, setPublicID] = useState(""); 

    useEffect(() => {
        getVideo();
    }, [])

    const getVideo = async() => {
        try{
            const response = await axios.get("/api/users/loadVideo");
            setPublicID(response.data.data)
        } catch(error){
            console.log(error.message);
        }
    }

    return(
        <div>
            <CloudinaryContext cloud_name="do5pxnewl">
                <Video
                    publicId={publicID}
                    width="90%"
                    controls
                />
            </CloudinaryContext>
        </div>
    )
}