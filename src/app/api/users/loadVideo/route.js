// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request){
    try{
        const reqBody = await request.json();
        const roomCode = reqBody;

        const room = await Room.findOne({roomCode});
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
    // try{
    //     const encodedToken = request.cookies.get("videoPath")?.value || "";
    //     if(encodedToken === ""){
    //         return NextResponse.json({
    //             message: "No video path found",
    //             success: false
    //         })
    //     }
    //     const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET);

    //     return NextResponse.json({
    //         message: "Video path found",
    //         data: decodedToken.path
    //     })
    // } catch(error){
    //     return NextResponse.json({error: error.message}, {status: 500});
    // }
}