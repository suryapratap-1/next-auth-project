import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);   
        const user = await User.findOne({ _id: userID }).select("-password");

        if (!user) {
            return NextResponse.json({message: "User not found", success: false})
        }

        return NextResponse.json({message: "User found", data: user})
    } 
    catch (error: any) {
        return NextResponse.json({error: error.message, success: false}, {status: 500});
    }
}