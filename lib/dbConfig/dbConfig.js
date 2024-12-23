import { MongoClient } from "mongodb";

let client;
let clientPromise;

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

// Function to connect to MongoDB
export async function connect() {
    try {
        if (!client) {
            client = new MongoClient(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }

        if (!client.isConnected) {
            await client.connect();
        }

        return client; 
    } catch (error) {
        console.error("MongoDB connection error. Please make sure the database is running.");
        console.error(error.message || error);
        process.exit(1); 
    }
}

export async function getDatabase() {
    const client = await connect();
    return client.db(); // Return the default database
}