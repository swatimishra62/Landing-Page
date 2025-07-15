import { NextRequest, NextResponse } from "next/server";
import { Contact } from "@/lib/models/contact";
import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();
  const contacts = await Contact.find();
  return NextResponse.json(contacts);
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { name, email, mobile, city } = await req.json();
    if (!name || !email || !mobile || !city) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const contact = await Contact.create({ name, email, mobile, city });
    return NextResponse.json({ message: "Contact saved successfully", contact }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save contact" }, { status: 500 });
  }
} 