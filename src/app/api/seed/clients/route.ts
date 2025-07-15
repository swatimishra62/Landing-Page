import { connectDB } from "@/lib/db";
import { Client } from "@/lib/models/client";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const data = [
    {
      name: "Rowhan Smith",
      designation: "CEO, Foreclosure",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Shipra Kayak",
      designation: "Brand Designer",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "John Lepore",
      designation: "CEO, Foreclosure",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      name: "Marry Freeman",
      designation: "Marketing Manager at Mixit",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Lucy",
      designation: "Sales Rep at Alibaba",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  await Client.insertMany(data);
  return NextResponse.json({ message: "Clients seeded" });
}
