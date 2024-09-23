import { NextResponse } from "next/server";
import connectToDatabase from "../../utils/mongodb";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const walletAddress = url.searchParams.get('walletAddress');
    const route = url.searchParams.get('route');
    const sessionId = url.searchParams.get('sessionId');

    console.log(`Received request for walletAddress: ${walletAddress}, route: ${route}, sessionId: ${sessionId}`);

    if (!walletAddress) {
      return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });
    }

    if (!route) {
      return NextResponse.json({ error: "Missing route parameter" }, { status: 400 });
    }

    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("Tronique");

    // Find the user document
    const user = await db.collection("users").findOne({ address: walletAddress });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const historyField = route === 'dextrades' ? 'dexTradeHistory' : 'forumHistory';
    
    if (sessionId) {
      // Find the specific session
      const session = user[historyField]?.find(session => session.sessionId === sessionId);
      
      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
      }

      return NextResponse.json({ 
        sessionId: session.sessionId,
        messages: session.messages
      });
    } else {
      // Return all sessions for the route
      const history = user[historyField] || [];
      history.sort((a, b) => new Date(b.startTimestamp) - new Date(a.startTimestamp));

      return NextResponse.json({ history: history });
    }

  } catch (error) {
    console.error("Error in GET /api/get-chat-history:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}