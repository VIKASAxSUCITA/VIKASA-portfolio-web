import { redirect } from "next/navigation";

/** Admin only manages Insights, Events, and Partners & Clients. */
export default function AdminHomePage() {
  redirect("/admin/insights");
}
