import { NextResponse } from "next/server";
import connectToDatabase from "../../utils/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const { walletAddress, route, messages, sessionId } = await request.json();

  if (!walletAddress || !route || !messages) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const client = await connectToDatabase();
  const db = client.db("Tronique");

  try {
    const historyField = route === "dextrades" ? "dexTradeHistory" : "forumHistory";

    if (sessionId) {
      // Update existing session
      const result = await db.collection("users").updateOne(
        { address: walletAddress, [`${historyField}.sessionId`]: sessionId },
        { 
          $set: { 
            [`${historyField}.$.messages`]: messages,
            [`${historyField}.$.lastUpdateTimestamp`]: new Date()
          }
        },
      );

      if (result.modifiedCount === 0) {
        return NextResponse.json({ error: "Failed to update chat session" }, { status: 500 });
      }

      return NextResponse.json({ 
        message: "Chat session updated successfully", 
        sessionId: sessionId 
      });
    } else {
      // Create new session
      const newObjectId = new ObjectId();
      const newSessionId = newObjectId.toString();
      const newSession = {
        _id: newObjectId,
        sessionId: newSessionId,
        messages,
        startTimestamp: new Date(),
        lastUpdateTimestamp: new Date(),
      };

      const result = await db.collection("users").updateOne(
        { address: walletAddress },
        { $push: { [historyField]: newSession } },
        { upsert: true }
      );

      if (result.modifiedCount === 0 && result.upsertedCount === 0) {
        return NextResponse.json({ error: "Failed to create new chat session" }, { status: 500 });
      }

      return NextResponse.json({ 
        message: "New chat session created successfully", 
        sessionId: newSessionId
      });
    }
  } catch (error) {
    console.error("Error saving chat session:", error);
    return NextResponse.json({ error: "Failed to save chat session" }, { status: 500 });
  }
}