import jwt from "jsonwebtoken";
import { getDatabase } from "@/lib/dbConfig/dbConfig";
import { ObjectId } from "mongodb";

export async function getDataFromToken(token) {
    console.log(token)
    try {
        // Verify the token and extract the user ID
        const { id: userId } = jwt.verify(token, process.env.TOKEN_SECRET);

        console.log(userId)

        // Connect to MongoDB
        const db = await getDatabase();
        const usersCollection = db.collection("users");

        // Find the user and exclude sensitive fields
        const user = await usersCollection.findOne(
            { _id: new ObjectId(userId) },
            { projection: {  __v: 0, password: 0 } }
        );

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        console.error("Error in getDataFromToken:", error);
        throw error;
    }
}