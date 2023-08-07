import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {username, title, link} = reqBody;
    
        const user = await User.findOne({username});
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 400})
        }
    
        user.watchlist.push({title: title, link: link});
    
        await user.save();

        return NextResponse.json({
            message: "Watchlist updated successfully",
            data: user,
        })
    } catch(error){
        return NextResponse({error: error.message}, {status: 500});
    }
}