import { NextRequest, NextResponse } from "next/server";
import { Newsletter } from "@/lib/models/newsletter";
import { connectDB } from "@/lib/db";


export async function GET() {
  await connectDB();
  const subscribers = await Newsletter.find({}, { email: 1, _id: 0 });
  return NextResponse.json(subscribers);
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: "Email already subscribed." }, { status: 409 });
    }
    const subscriber = await Newsletter.create({ email });
    return NextResponse.json({ message: "Subscribed successfully!", subscriber }, { status: 201 });
  } catch {
   
    return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
  }
} 