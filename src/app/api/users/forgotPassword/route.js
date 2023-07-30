import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {email} = reqBody;
    
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 400});
        }
        await sendEmail({email, emailType: "FORGOT", userID: user._id});
        console.log("test")
        return NextResponse.json({
            message: "Email sent successfully",
            success: true
        })
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }

}