import { redirect } from "next/navigation";

/** Insight articles are edited on the Insights admin page. */
export default function AdminBlogDetailsRedirectPage() {
  redirect("/admin/insights");
}
