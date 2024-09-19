import { NextResponse } from "next/server";
import connectToDatabase from "../../utils/mongodb";

export async function POST(request) {
    const { walletAddress } = await request.json();
  
    if (!walletAddress) {
      return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });
    }
  
    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("Tronique");
  
    // Try to update the user's credit information
    const result = await db.collection("users").updateOne(
      { address: walletAddress },  // Search for the document by walletAddress
      { 
        $setOnInsert: { 
          address: walletAddress,
          credits: 100  // Initialize with 100 credits if user is new
        }
      }, 
      { upsert: true }  // Create the document if it doesn't exist
    );
  
    // Respond with success message
    return NextResponse.json({ message: "Wallet address stored successfully" });
}
