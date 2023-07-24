import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

 export async function POST(request){
     try{
        const requestBody = await request.json();
        const {username, email, password} = requestBody;

        //check if user exists 
        const userExists = await User.findOne({email});

        if(userExists){
            return NextResponse.json({error: "User already exists"}, {status: 400});
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
        
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
     } catch(error){
        return NextResponse.json({error:error.message}, {status: 500})
     }
 }