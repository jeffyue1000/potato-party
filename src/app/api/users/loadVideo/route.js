import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
        const encodedToken = request.cookies.get("videoPath")?.value || "";
        const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET);

        return NextResponse.json({
            message: "Video path found",
            data: decodedToken.path
        })
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}