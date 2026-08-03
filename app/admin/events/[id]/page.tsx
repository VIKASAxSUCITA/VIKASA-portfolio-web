import AdminEventEditorClient from "@/app/components/admin/AdminEventEditorClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminEventEditPage({ params }: Props) {
  const { id } = await params;
  return <AdminEventEditorClient postId={id} />;
}
