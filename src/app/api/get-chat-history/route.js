import { NextResponse } from "next/server";
import connectToDatabase from "../../utils/mongodb";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const walletAddress = url.searchParams.get("walletAddress");
    const option = url.searchParams.get("option");
    const subOption = url.searchParams.get("subOption");

    console.log(`Received request for walletAddress: ${walletAddress}, option: ${option}, subOption: ${subOption}`);

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Missing wallet address" },
        { status: 400 }
      );
    }

    if (!option) {
      return NextResponse.json(
        { error: "Missing option parameter" },
        { status: 400 }
      );
    }

    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("Tronique");

    // Find the user document
    const user = await db
      .collection("users")
      .findOne({ address: walletAddress });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let history;
    if (option === "forum") {
      history = [...(user.forumHistory || [])];
      if (subOption) {
        history = history.filter((item) => item.subOption === subOption);
      }
    } else if (option === "dextrades") {
      history = [...(user.dexTradeHistory || [])];
    } else if (option === "contract") {
      history = [...(user.contractHistory || [])];
      if (subOption) {
        history = history.filter((item) => item.subOption === subOption);
      }
    } else {
      return NextResponse.json({ error: "Invalid option" }, { status: 400 });
    }


    history.sort(
      (a, b) => new Date(b.startTimestamp) - new Date(a.startTimestamp)
    );

    // console.log(`${option} history items:`, history.length);
    return NextResponse.json({ history: history });
  } catch (error) {
    console.error("Error in GET /api/get-chat-history:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
