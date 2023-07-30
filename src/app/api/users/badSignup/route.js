import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {email, username} = reqBody;
    
        const emailExists = await User.findOne({email});
        const usernameExists = await User.findOne({username});
        
        if(emailExists && usernameExists){
            return NextResponse.json({message: "Both username and email exist"})
        }
        if(emailExists){
            return NextResponse.json({message: "Email already exists"});
        }
        if(usernameExists){
            return NextResponse.json({message: "Username already exists"});
        }
    } catch(error){
        return NextResponse.json({error: error.mesage}, {status: 400});
    }
}