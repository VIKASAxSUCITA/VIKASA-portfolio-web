import { NextResponse } from "next/server";
import { loadPageContent } from "@/lib/content/firestore";

export const dynamic = "force-dynamic";

export async function GET() {
  const [insights, events] = await Promise.all([
    loadPageContent("insights"),
    loadPageContent("events"),
  ]);

  return NextResponse.json({
    insights: insights.posts.map((post) => ({
      id: post.id,
      title: [post.title, post.titleKm, post.titleZh].filter(Boolean).join(" "),
      label: post.title,
    })),
    events: events.posts.map((post) => ({
      id: post.id,
      title: [post.title, post.titleKm, post.titleZh].filter(Boolean).join(" "),
      label: post.title,
    })),
  });
}
