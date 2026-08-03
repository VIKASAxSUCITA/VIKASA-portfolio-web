import AdminInsightEditorClient from "@/app/components/admin/AdminInsightEditorClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminInsightEditPage({ params }: Props) {
  const { id } = await params;
  return <AdminInsightEditorClient postId={id} />;
}
