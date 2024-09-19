import { NextResponse } from "next/server";
import connectToDatabase from "../../utils/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const { walletAddress, route, messages } = await request.json();

  if (!walletAddress || !route || !messages) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Connect to the database
  const client = await connectToDatabase();
  const db = client.db("Tronique");

  try {
    // Determine the field name based on the route
    const historyField = route === "dextrades" ? "dexTradeHistory" : "forumHistory";

    // Find the user document
    const user = await db.collection("users").findOne({ address: walletAddress });

    if (!user) {
      // If user doesn't exist, create a new document with the chat session
      const newUser = {
        address: walletAddress,
        [historyField]: [{
          _id: new ObjectId(),
          messages,
          startTimestamp: new Date(),
          lastUpdateTimestamp: new Date(),
        }]
      };
      await db.collection("users").insertOne(newUser);
      return NextResponse.json({ 
        message: "New user created and chat session saved successfully", 
        chatSessionId: newUser[historyField][0]._id.toString() 
      });
    }

    // If user exists, check if there's an existing chat session for this route
    const existingSession = user[historyField] && user[historyField][0];

    if (existingSession) {
      // Update existing session
      const result = await db.collection("users").updateOne(
        { address: walletAddress, [`${historyField}._id`]: existingSession._id },
        { 
          $set: { 
            [`${historyField}.$.messages`]: messages,
            [`${historyField}.$.lastUpdateTimestamp`]: new Date()
          }
        }
      );

      if (result.modifiedCount === 0) {
        return NextResponse.json({ error: "Failed to update chat session" }, { status: 500 });
      }

      return NextResponse.json({ 
        message: "Chat session updated successfully", 
        chatSessionId: existingSession._id.toString() 
      });
    } else {
      // Create new session
      const newSession = {
        _id: new ObjectId(),
        messages,
        startTimestamp: new Date(),
        lastUpdateTimestamp: new Date(),
      };

      const result = await db.collection("users").updateOne(
        { address: walletAddress },
        { $push: { [historyField]: newSession } }
      );

      if (result.modifiedCount === 0) {
        return NextResponse.json({ error: "Failed to create new chat session" }, { status: 500 });
      }

      return NextResponse.json({ 
        message: "New chat session created successfully", 
        chatSessionId: newSession._id.toString() 
      });
    }
  } catch (error) {
    console.error("Error saving chat session:", error);
    return NextResponse.json({ error: "Failed to save chat session" }, { status: 500 });
  }
}