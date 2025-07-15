import { connectDB } from "@/lib/db";
import { Project } from "@/lib/models/project";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const projects = await Project.find();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { name, description, image } = await req.json();
  if (!name || !description || !image) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const project = await Project.create({ name, description, image });
  return NextResponse.json(project, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
  }
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ message: "Project deleted" });
}
