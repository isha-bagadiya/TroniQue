import { NextResponse } from "next/server";
import connectToDatabase from "../../../utils/mongodb";

export async function POST(request) {
    try {
        const { deduct, walletAddress } = await request.json();

        if (!walletAddress || deduct <= 0) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const client = await connectToDatabase();
        const db = client.db("Tronique");

        const user = await db.collection("users").findOneAndUpdate(
            { address: walletAddress },
            { $inc: { credits: -deduct } },
            { returnOriginal: false }
        );

        if (!user.value) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ credits: user.value.credits });
    } catch (error) {
        console.error('Error deducting credits:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
