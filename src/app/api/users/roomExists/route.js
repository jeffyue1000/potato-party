import { connect } from "@/dbConfig/dbConfig";
import Room from "@/models/roomModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {roomCode} = reqBody;
        
        const room = await Room.findOne({roomCode});
        if(!room){
            return NextResponse.json({error: "Room doesn't exist"}, {status: 400});
        }
    
        const allowedRoomTokenData = {
            roomCode: roomCode
        }
        const allowedRoomToken =  await jwt.sign(allowedRoomTokenData, process.env.TOKEN_SECRET, {expiresIn: 60});
    
        const response = NextResponse.json({
            message: "Room found successfully",
            success: true,
        });
    
        response.cookies.set("allowedRoom", allowedRoomToken, {
            httpOnly: true
        });
        
        return response;
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }

}