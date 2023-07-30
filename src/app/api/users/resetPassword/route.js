import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {token, password} = reqBody;

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiration: {$gt: Date.now()}});
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 400});
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiration = undefined;

        await user.save();
        
        return NextResponse.json({
            message: "Password updated successfully",
            success: true,
        })
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}