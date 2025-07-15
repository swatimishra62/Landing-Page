// /app/api/contact/route.ts
import { connectDB } from "@/lib/db";
import { Contact } from "@/lib/models/contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const contact = new Contact(body);
    await contact.save();
    return NextResponse.json({ message: "Contact saved successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save contact" }, { status: 500 });
  }
}
