import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

/** Old blog-details/[id] URL → /insights/[id]. */
export default async function Page({ params }: PageProps) {
  const { id } = await params;
  redirect(`/insights/${id}`);
}
