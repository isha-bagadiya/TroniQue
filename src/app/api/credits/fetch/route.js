import { NextResponse } from "next/server";
import connectToDatabase from "../../../utils/mongodb";

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const walletAddress = url.searchParams.get('walletAddress');

        if (!walletAddress) {
            return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });
        }

        const client = await connectToDatabase();
        const db = client.db("Tronique");

        const user = await db.collection("users").findOne({ address: walletAddress });

        return NextResponse.json({ credits: user ? user.credits : 0 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}