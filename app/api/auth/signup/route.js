import { NextResponse } from "next/server";
import { connect, getDatabase } from "@/lib/dbConfig/dbConfig";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // Connect to the database
        const db = await getDatabase();
        const usersCollection = db.collection("users");

        // Check if the "users" collection exists, and create it if it doesn't
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(collection => collection.name === "users");

        if (!collectionExists) {
            await db.createCollection("users"); // Create the collection explicitly
            console.log("Collection 'users' created.");
        }

        // Validation: Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user document
        const newUser = {
            username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Insert the user into the collection
        const result = await usersCollection.insertOne(newUser);

        return NextResponse.json(
            {
                message: "User registered successfully",
                success: true,
                user: {
                    id: result.insertedId.toString(),
                    username: newUser.username,
                    email: newUser.email,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}