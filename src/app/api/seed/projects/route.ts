// /app/api/seed/projects/route.ts
import { connectDB } from "@/lib/db";
import { Project } from "@/lib/models/project";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const data = [
    {
      name: "Consultation",
      description: "Project Name, Location",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Design",
      description: "Project Name, Location",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Marketing & Design",
      description: "Project Name, Location",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    }
  ];

  await Project.insertMany(data);

  return NextResponse.json({ message: "Seeded successfully" });
}
