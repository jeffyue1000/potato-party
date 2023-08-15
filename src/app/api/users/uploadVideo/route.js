import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server"
import Room from "@/models/roomModel";
import jwt from "jsonwebtoken"

connect();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {fileName, uuid} = reqBody;

        const newRoom = new Room({
            roomCode: uuid,
            publicID: fileName
        });

        await newRoom.save();

        const allowedRoomTokenData = {
            roomCode: uuid
        };

        const allowedRoomToken = await jwt.sign(allowedRoomTokenData, process.env.TOKEN_SECRET, {expiresIn: 60});

        const videoPathTokenData = {
            path: fileName
        };

        const videoPathToken = await jwt.sign(videoPathTokenData, process.env.TOKEN_SECRET, {expiresIn: "1h"});

        const response = NextResponse.json({
            message: "Video link set",
            success: true
        })
    
        response.cookies.set("videoPath", videoPathToken, {
            httpOnly: true
        })
        
        response.cookies.set("allowedRoom", allowedRoomToken, {
            httpOnly: true
        })
        
        return response;
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500}) 
    }
}