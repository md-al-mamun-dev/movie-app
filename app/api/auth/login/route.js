import { connect, getDatabase } from "@/lib/dbConfig/dbConfig"; // Import the direct MongoDB connection
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Connect to the database
        const db = await getDatabase();

        const usersCollection = db.collection("users");
        // Check if the 'users' collection exists
        if (!usersCollection) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Validation: Check if user exists
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist...!" }, { status: 400 });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Check your credentials" }, { status: 400 });
        }

        // Create JWT Token
        const tokenData = {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
        };

        const token = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        // Create Response
        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                // isVerified: user.isVerified
            }
        });

        // Set cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1, // 1 hour
        });

        return response;
    } catch (error) {
        console.error("Error in login route:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}