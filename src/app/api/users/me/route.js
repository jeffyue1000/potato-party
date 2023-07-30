import { tokenData } from "@/helpers/tokenData";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request){
    try{
        const userID = await tokenData(request);
        const user = await User.findOne({_id: userID});
        return NextResponse.json({ //could return user directly maybe
            message: "User found",
            data: user
        })
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 400});
    }
}