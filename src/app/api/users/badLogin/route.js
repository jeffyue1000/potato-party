import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;
    
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message: "Email not found"});
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({message: "Incorrect password"});
        }
        if(!user.isVerified){
            return NextResponse.json({message: "User is not verified"});
        }
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }
    
}