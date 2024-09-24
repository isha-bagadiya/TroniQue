import { NextResponse } from "next/server";
import connectToDatabase from "../../utils/mongodb";

export async function POST(request) {
  let client;

  try {
    const { walletAddress } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Missing wallet address" },
        { status: 400 }
      );
    }

    // Connect to the database
    client = await connectToDatabase();
    const db = client.db("Tronique");

    // Try to update the user's credit information
    const result = await db.collection("users").updateOne(
      { address: walletAddress }, // Search for the document by walletAddress
      {
        $setOnInsert: {
          address: walletAddress,
          credits: 100, // Initialize with 100 credits if user is new
        },
      },
      { upsert: true } // Create the document if it doesn't exist
    );

    // Respond with success message
    return NextResponse.json({ message: "Wallet address stored successfully" });
  } catch (error) {
    console.error("Error storing wallet address:", error);
    return NextResponse.json(
      { error: "Failed to store wallet address" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close(); // Close the MongoDB client connection
    }
  }
}
