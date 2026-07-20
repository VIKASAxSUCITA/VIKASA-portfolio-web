import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetailsPage from "../../components/events/EventDetailsPage";
import { loadPageContent } from "@/lib/content/firestore";
import { loadEventById } from "@/lib/content/eventsStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await loadEventById(id);
  return {
    title: post?.title ?? "Event",
    description:
      post?.summary ||
      "Event and announcement details from VIKASA.",
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const [post, footer] = await Promise.all([
    loadEventById(id),
    loadPageContent("footer"),
  ]);
  if (!post) notFound();
  return (
    <EventDetailsPage
      post={post}
      contact={{
        email: footer.contact.email,
        phone: footer.contact.phone,
      }}
    />
  );
}
