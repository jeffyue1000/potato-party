import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { cookies } from "next/dist/client/components/headers";

connect();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user already exists
        const user  = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        //chec if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400});
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.usernmae,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"});
        
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500}) 
    }
}