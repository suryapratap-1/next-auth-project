import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // check if the user is already exist
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({ success: false, message: 'User already exist' }, { status: 400 })
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await User.create({ username, email, password: hashedPassword });

        // console.log(newUser._id.toString())

        // send verification email 
        const emailResponse = await sendMail({ email, emailType: "Verification", userID: newUser._id });

        if (emailResponse) return NextResponse.json({ success: true, message: 'User created successfully'}, {status: 200});
    } 
    catch (error: any) {
        console.log('Internal error, please try again.', error.message);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}