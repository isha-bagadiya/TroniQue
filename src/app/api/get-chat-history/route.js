import { NextResponse } from "next/server";
import connectToDatabase from "../../utils/mongodb";


export async function GET(request) {


  try {
    const url = new URL(request.url);
    const walletAddress = url.searchParams.get('walletAddress');

    if (!walletAddress) {
        return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });
    }

    // Connect to the database
    const client = await connectToDatabase();
    console.log("Connected to database");

    const db = client.db("Tronique");

    // Find the user document
    const user = await db.collection("users").findOne({ address: walletAddress });
    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Combine dexTradeHistory and forumHistory
    const allHistory = [
      ...(user.dexTradeHistory || []),
      ...(user.forumHistory || [])
    ].sort((a, b) => new Date(b.startTimestamp) - new Date(a.startTimestamp));

    console.log("History items:", allHistory.length);
    return NextResponse.json({ history: allHistory });
  } catch (error) {
    console.error("Error in GET /api/get-chat-history:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}