import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {username} = reqBody;
        
        const user = await User.findOne({username})
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 400});
        }

        user.watchlist = [];

        await user.save();

        return NextResponse.json({
            message: "Watchlist cleared successfully",
            data: user
        })
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }

}