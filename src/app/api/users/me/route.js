import { tokenData } from "@/helpers/tokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request){
    try{
        const userID = await tokenData(request);
        const user = User.findOne({_id: userID});
        select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 400});
    }
}