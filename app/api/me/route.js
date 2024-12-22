import { getDatabase } from "@/lib/dbConfig/dbConfig";
import { getDataFromToken } from "@/lib/getDataFromToken";
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb"; 

export async function GET(request) {
    const token = request.cookies.get("token")?.value || "";
    if(!token){
        return NextResponse.json(
            {
                success: false,
                message: "invalid request...",
            },
            { status: 400 }
        );
    }
    try {
        const userData = await getDataFromToken(token);
        console.log(userData)
        if (!userData) {
            throw new Error("User not found");
        }

        return NextResponse.json(
            {
                success: true,
                message: "User found...",
                user: {
                    id: userData._id.toString(),
                    username: userData.username,
                    email: userData.email,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in user authorization route:", error);

        const response = NextResponse.json(
            { error: "Authorization error..." },
            { status: 401 }
        );

        // Clear the invalid token
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
    }
}