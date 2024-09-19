import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
console.log("uri:", uri)

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_MONGODB_URI"');
}

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Successfully connected to the database");
    return client;
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw error;
  }
}

export default connectToDatabase;
