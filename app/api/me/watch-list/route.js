import { getDatabase } from "@/lib/dbConfig/dbConfig";
import { getDataFromToken } from "@/lib/getDataFromToken";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request) {
    const token = request.cookies.get("token")?.value || "";


    try {
        // Validate the token and extract user data
        const userData = await getDataFromToken(token);
        if (!userData || !userData._id) {
            const response = NextResponse.json(
                { error: "Authorization error..." },
                { status: 401 }
            );
            response.cookies.set("token", "", {
                httpOnly: true,
                expires: new Date(0),
            });
            return response;
        }

        const db = await getDatabase();

        // Check if the "watchLetter" collection exists
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(
            (collection) => collection.name === "watchLetter"
        );

        if (!collectionExists) {
            // If the collection doesn't exist, return an empty watchLetter list
            return NextResponse.json(
                {
                    success: true,
                    watchLeterList: [],
                },
                { status: 200 }
            );
        }

        const watchletterCollection = db.collection("watchLetter");

        // Check if the user has a watchLetter entry
        const userWatchletter = await watchletterCollection.findOne({
            userId: new ObjectId(userData._id),
        });

        if (!userWatchletter || !userWatchletter.watchLeterList) {
            // If the user's watchLetter entry doesn't exist or is empty
            return NextResponse.json(
                {
                    success: true,
                    watchLeterList: [],
                },
                { status: 200 }
            );
        }

        // Return the user's watchLetter list
        return NextResponse.json(
            {
                success: true,
                watchLeterList: userWatchletter.watchLeterList,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in user authorization route:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}


export async function POST(request) {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    try {
        const userData = await getDataFromToken(token);
        if (!userData || !userData._id) {
            return NextResponse.json(
                { error: "Authorization error..." },
                { status: 401 }
            );
        }

        const db = await getDatabase();

        // Ensure the "watchLetter" collection exists
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(
            (collection) => collection.name === "watchLetter"
        );

        if (!collectionExists) {
            await db.createCollection("watchLetter");
            console.log("Created 'watchLetter' collection.");
        }

        const watchletterCollection = db.collection("watchLetter");
        const userWatchletter = await watchletterCollection.findOne({
            userId: new ObjectId(userData._id),
        });

        const reqBody = await request.json();
        const { movieId } = reqBody;

        if (!userWatchletter) {
            // Create a new WatchLetter list for the user
            const newWatchLeterList = {
                userId: new ObjectId(userData._id),
                watchLeterList: [
                    { movieId, addedAt: new Date() },
                ],
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const result = await watchletterCollection.insertOne(newWatchLeterList);

            return NextResponse.json(
                {
                    success: true,
                    message: "WatchLetter list created and movie added",
                    data: {
                        id: result.insertedId.toString(),
                        watchLetterList: newWatchLeterList.watchLeterList,
                    },
                },
                { status: 201 }
            );
        } else {
            // Check if the movie already exists in the user's WatchLetter list
            const movieExists = userWatchletter.watchLeterList.some(
                (item) => item.movieId === movieId
            );

            if (!movieExists) {
                // Add the movie to the existing WatchLetter list
                const updatedWatchLeterList = [
                    ...userWatchletter.watchLeterList,
                    { movieId, addedAt: new Date() },
                ];

                await watchletterCollection.updateOne(
                    { userId: new ObjectId(userData._id) },
                    {
                        $set: {
                            watchLeterList: updatedWatchLeterList,
                            updatedAt: new Date(),
                        },
                    }
                );

                return NextResponse.json(
                    {
                        success: true,
                        message: "Movie added to the existing WatchLetter list",
                        data: {
                            id: userWatchletter._id.toString(),
                            watchLetterList: updatedWatchLeterList,
                        },
                    },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Movie already exists in the WatchLetter list",
                        data: {
                            id: userWatchletter._id.toString(),
                            watchLetterList: userWatchletter.watchLeterList,
                        },
                    },
                    { status: 400 }
                );
            }
        }
    } catch (error) {
        console.error("Error in processing request:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

