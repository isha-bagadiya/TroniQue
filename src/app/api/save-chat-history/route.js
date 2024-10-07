import { NextResponse } from "next/server";
import connectToDatabase from "../../utils/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const { walletAddress, route, messages, sessionId, subOption, subOption2 } = await request.json();

  if (!walletAddress || !route || !messages) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const client = await connectToDatabase();
  const db = client.db("Tronique");

  try {
    let historyField;
    switch (route) {
      case "dextrades":
        historyField = "dexTradeHistory";
        break;
      case "forum":
        historyField = "forumHistory";
        break;
      case "contract":
        historyField = "contractHistory";
        break;
      default:
        return NextResponse.json({ error: "Invalid route" }, { status: 400 });
    }

    if (sessionId) {
      // Update existing session
      const updateObj = { 
        [`${historyField}.$.messages`]: messages,
        [`${historyField}.$.lastUpdateTimestamp`]: new Date()
      };

      // Add subOption to the update object if it's provided (for forum and contract routes)
      if ((route === "forum" || route === "contract") && subOption) {
        updateObj[`${historyField}.$.subOption`] = subOption;
        if (route === "forum" && subOption2) {
          updateObj[`${historyField}.$.subOption2`] = subOption2;
        }
      }

      const result = await db.collection("users").updateOne(
        { address: walletAddress, [`${historyField}.sessionId`]: sessionId },
        { $set: updateObj }
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

      // Add subOption to the new session if it's provided (for forum and contract routes)
      if ((route === "forum" || route === "contract") && subOption) {
        newSession.subOption = subOption;
        if (route === "forum" && subOption2) {
          newSession.subOption2 = subOption2;
        }
      }

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