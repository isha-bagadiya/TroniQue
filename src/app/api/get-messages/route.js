import { NextResponse } from "next/server";
import connectToDatabase from "../../utils/mongodb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  const walletAddress = searchParams.get("walletAddress");
  const route = searchParams.get("route");

  if (!sessionId || !walletAddress || !route) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  const client = await connectToDatabase();
  const db = client.db("Tronique");

  try {
    let historyField;
    switch (route) {
      case "forum":
        historyField = "forumHistory";
        break;
      case "dextrades":
        historyField = "dexTradeHistory";
        break;
      case "contract":
        historyField = "contractHistory";
        break;
      default:
        return NextResponse.json({ error: "Invalid route" }, { status: 400 });
    }

    const user = await db.collection("users").findOne(
      { 
        address: walletAddress,
        [`${historyField}.sessionId`]: sessionId 
      },
      { 
        projection: { 
          [`${historyField}.$`]: 1 
        } 
      }
    );

    if (!user || !user[historyField] || user[historyField].length === 0) {
      return NextResponse.json({ error: "Chat session not found" }, { status: 404 });
    }

    const session = user[historyField][0];

    return NextResponse.json({
      sessionId: session.sessionId,
      messages: session.messages,
      subOption: session.subOption,
      subOption2: session.subOption2
    });
  } catch (error) {
    console.error("Error retrieving chat session:", error);
    return NextResponse.json({ error: "Failed to retrieve chat session" }, { status: 500 });
  }
}