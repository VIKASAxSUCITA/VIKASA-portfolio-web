"use client";

import { useRouter } from "next/navigation";
import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminShell from "@/app/components/admin/AdminShell";
import { usePageEditor } from "@/app/components/admin/usePageEditor";
import {
  excerptText,
  formatAdminDateTime,
} from "@/lib/content/adminFormat";
import { sortInsightsByLatest } from "@/lib/content/insights";

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m13.5 6.5 3 3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 7h14M10 11v6M14 11v6M8 7l1-2h6l1 2M7 7l1 12h8l1-12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AdminInsightsListPage() {
  const router = useRouter();
  const { content, loading, saving, message, saveSnapshot } =
    usePageEditor("insights");

  const shellProps = {
    pageTitle: "Insights",
    saving,
    message,
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminShell {...shellProps}>
          <p className="admin-cms admin-cms-empty">Loading insights…</p>
        </AdminShell>
      </AdminGuard>
    );
  }

  const posts = sortInsightsByLatest(content.posts);

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Remove this insight?");
    if (!confirmed) return;
    try {
      await saveSnapshot({
        ...content,
        posts: content.posts.filter((post) => post.id !== id),
      });
    } catch {
      // message set by editor hook
    }
  }

  return (
    <AdminGuard>
      <AdminShell {...shellProps}>
        <div className="admin-cms">
          <div className="admin-cms-panel">
            {posts.length === 0 ? (
              <p className="admin-cms-empty">
                No insights yet. Use + to create one.
              </p>
            ) : (
              <div className="admin-cms-table-wrap">
                <table className="admin-cms-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Cover</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>Upload date</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => {
                      const { date, time } = formatAdminDateTime(
                        post.createdAt
                      );
                      return (
                        <tr key={post.id}>
                          <td className="admin-cms-no">
                            {posts.length - index}
                          </td>
                          <td className="admin-cms-cover">
                            <div className="admin-cms-cover-media">
                              {post.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={post.image} alt="" />
                              ) : (
                                <span className="admin-cms-cover-empty" />
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="admin-cms-title">
                              <strong>{post.title || "Untitled"}</strong>
                              <div className="admin-cms-desc">
                                <span className="admin-cms-excerpt">
                                  {excerptText(post.bodyHtml) ||
                                    "No content yet"}
                                </span>
                                <div className="admin-cms-row-actions">
                                  <button
                                    type="button"
                                    className="admin-cms-icon-btn"
                                    aria-label="Edit insight"
                                    onClick={() =>
                                      router.push(`/admin/insights/${post.id}`)
                                    }
                                  >
                                    <EditIcon />
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-cms-icon-btn"
                                    aria-label="Delete insight"
                                    onClick={() => void handleDelete(post.id)}
                                  >
                                    <TrashIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {post.category ? (
                              <span className="admin-cms-pill">
                                {post.category}
                              </span>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td>{post.author || "—"}</td>
                          <td>
                            <div className="admin-cms-datetime">
                              <span>{date}</span>
                              <span>{time}</span>
                            </div>
                          </td>
                          <td>
                            <a
                              className="admin-cms-view"
                              href={`/insights/${post.id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              ##
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <button
            type="button"
            className="admin-cms-fab"
            onClick={() => router.push("/admin/insights/new")}
            disabled={saving}
            aria-label="Add insight"
            title="Add insight"
          >
            +
          </button>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
