import { getDatabase } from "@/lib/dbConfig/dbConfig";
import { getDataFromToken } from "@/lib/getDataFromToken";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request) {
    const token = request.cookies.get("token")?.value || "";
    if(!token){
        return NextResponse.json(
                                    { error: "Authorization error..." },
                                    { status: 401 }
                                );
    }

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

        // Check if the "watchLater" collection exists
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(
            (collection) => collection.name === "watchLater"
        );

        if (!collectionExists) {
            // If the collection doesn't exist, return an empty watchLater list
            return NextResponse.json(
                {
                    success: true,
                    watchLaterList: [],
                },
                { status: 200 }
            );
        }

        const watchLaterCollection = db.collection("watchLater");

        // Check if the user has a watchLater entry
        const userwatchLater = await watchLaterCollection.findOne({
            userId: new ObjectId(userData._id),
        });

        if (!userwatchLater || !userwatchLater.watchLaterList) {
            // If the user's watchLater entry doesn't exist or is empty
            return NextResponse.json(
                {
                    success: true,
                    watchLaterList: [],
                },
                { status: 200 }
            );
        }

        // Return the user's watchLater list
        return NextResponse.json(
            {
                success: true,
                watchLaterList: userwatchLater.watchLaterList,
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

        // Ensure the "watchLater" collection exists
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(
            (collection) => collection.name === "watchLater"
        );

        if (!collectionExists) {
            await db.createCollection("watchLater");

        }

        const watchLaterCollection = db.collection("watchLater");
        const userwatchLater = await watchLaterCollection.findOne({
            userId: new ObjectId(userData._id),
        });

        const reqBody = await request.json();
        const { movieId } = reqBody;

        if (!userwatchLater) {
            // Create a new watchLater list for the user
            const newwatchLaterList = {
                userId: new ObjectId(userData._id),
                watchLaterList: [
                    { movieId, addedAt: new Date() },
                ],
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const result = await watchLaterCollection.insertOne(newwatchLaterList);

            return NextResponse.json(
                {
                    success: true,
                    message: "watchLater list created and movie added",
                    data: {
                        id: result.insertedId.toString(),
                        watchLaterList: newwatchLaterList.watchLaterList,
                    },
                },
                { status: 201 }
            );
        } else {
            // Check if the movie already exists in the user's watchLater list
            const movieExists = userwatchLater.watchLaterList.some(
                (item) => item.movieId === movieId
            );

            if (!movieExists) {
                // Add the movie to the existing watchLater list
                const updatedwatchLaterList = [
                    ...userwatchLater.watchLaterList,
                    { movieId, addedAt: new Date() },
                ];

                await watchLaterCollection.updateOne(
                    { userId: new ObjectId(userData._id) },
                    {
                        $set: {
                            watchLaterList: updatedwatchLaterList,
                            updatedAt: new Date(),
                        },
                    }
                );

                return NextResponse.json(
                    {
                        success: true,
                        message: "Movie added to the existing watchLater list",
                        data: {
                            id: userwatchLater._id.toString(),
                            watchLaterList: updatedwatchLaterList,
                        },
                    },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Movie already exists in the watchLater list",
                        data: {
                            id: userwatchLater._id.toString(),
                            watchLaterList: userwatchLater.watchLaterList,
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

export async function DELETE(request) {
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
        const watchLaterCollection = db.collection("watchLater");

        const reqBody = await request.json();
        const { movieId } = reqBody;

        // Check if the user's watchLater list exists
        const userWatchLater = await watchLaterCollection.findOne({
            userId: new ObjectId(userData._id),
        });

        if (!userWatchLater) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No watchLater list found for this user",
                },
                { status: 404 }
            );
        }

        // Check if the movie exists in the watchLater list
        const movieExists = userWatchLater.watchLaterList.some(
            (item) => item.movieId === movieId
        );

        if (!movieExists) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Movie not found in the watchLater list",
                    data: {
                        id: userWatchLater._id.toString(),
                        watchLaterList: userWatchLater.watchLaterList,
                    },
                },
                { status: 404 }
            );
        }

        // Remove the movie from the watchLater list
        const updatedWatchLaterList = userWatchLater.watchLaterList.filter(
            (item) => item.movieId !== movieId
        );

        await watchLaterCollection.updateOne(
            { userId: new ObjectId(userData._id) },
            {
                $set: {
                    watchLaterList: updatedWatchLaterList,
                    updatedAt: new Date(),
                },
            }
        );

        return NextResponse.json(
            {
                success: true,
                message: "Movie removed from the watchLater list",
                data: {
                    id: userWatchLater._id.toString(),
                    watchLaterList: updatedWatchLaterList,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in processing request:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

