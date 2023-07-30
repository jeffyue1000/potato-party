import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiration: {$gt: Date.now()}})
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 400});
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiration = undefined;
        console.log(user);
        
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}