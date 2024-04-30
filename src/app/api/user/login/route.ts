import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // check if user exist
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({ success: false, message: "User doesn't exist" }, { status: 400 })
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 400 })   
        }

        // create token
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        // create token 
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

        const response = NextResponse.json({
            success: true,
            message: "Login successfully"
        })
        response.cookies.set("token", token, { httpOnly: true, secure: true });

        return response;
    } 
    catch (error: any) {
        console.log('Internal error, please try again.', error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}