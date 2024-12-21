import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Prepare the response
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        });

        // Clear the cookie by setting it to an empty value and expire it
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;
    } catch (error) {
        // Handle errors and send response with error message
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}