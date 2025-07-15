import { NextRequest, NextResponse } from "next/server";
import { Client } from "@/lib/models/client";
import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();
  const clients = await Client.find();
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { name, description, image, designation } = await req.json();
  if (!name || !description || !image || !designation) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const client = await Client.create({ name, description, image, designation });
  return NextResponse.json(client, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing client ID" }, { status: 400 });
  }
  await Client.findByIdAndDelete(id);
  return NextResponse.json({ message: "Client deleted" });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const { id, name, description, image, designation } = await req.json();
  if (!id || !name || !description || !image || !designation) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const updated = await Client.findByIdAndUpdate(id, { name, description, image, designation }, { new: true });
  if (!updated) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
} 