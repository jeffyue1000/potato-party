import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {email} = reqBody;
    
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message: "Email not found"});
        }
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }

}