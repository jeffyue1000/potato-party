// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Room from "@/models/roomModel";

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {roomCode} = reqBody;

        const room = await Room.findOne({roomCode: roomCode});
        if(!room){
            return NextResponse.json({error: "Room doesn't exist"}, {status: 400});
        }
        return NextResponse.json({
            message: "Public ID found",
            data: room.publicID
        })
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}