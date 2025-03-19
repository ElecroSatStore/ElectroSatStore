import cloudinary from "@/lib/cloudinary.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "/products", 
      });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
