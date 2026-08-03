import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN is not set. Add it in .env.local to upload images.",
      },
      { status: 503 }
    );
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const safeName = file.name.replace(/[^\w.\-]+/g, "_") || "image.jpg";
    const blob = await put(`vikasa/${Date.now()}-${safeName}`, file, {
      access: "public",
      token,
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Image upload failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Image upload failed",
      },
      { status: 500 }
    );
  }
}
