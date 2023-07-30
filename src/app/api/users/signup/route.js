import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

 export async function POST(request){
     try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        //check if user exists 
        const emailExists = await User.findOne({email});
        const usernameExists = await User.findOne({username});
        
        if(emailExists){
            return NextResponse.json({error: "Email taken"}, {status: 400});
        }
        if(usernameExists){
            return NextResponse.json({error: "Username taken"}, {status: 400});
        }

        //create hashed password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        
        //verification email
        await sendEmail({email, emailType: "VERIFY", userID: savedUser._id}); //change verify to be in env? or a const

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
     } catch(error){
        return NextResponse.json({error:error.message}, {status: 500})
     }
 }