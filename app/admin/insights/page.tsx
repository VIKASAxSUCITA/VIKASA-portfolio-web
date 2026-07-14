"use client";

import { useState } from "react";
import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminInsightModal from "@/app/components/admin/AdminInsightModal";
import AdminShell from "@/app/components/admin/AdminShell";
import AdminSitePreview from "@/app/components/admin/AdminSitePreview";
import EditableText from "@/app/components/admin/EditableText";
import { usePageWithFooterEditor } from "@/app/components/admin/usePageWithFooterEditor";
import { createEmptyInsight, sortInsightsByLatest } from "@/lib/content/insights";
import type { InsightPost } from "@/lib/content/types";

export default function AdminInsightsEditorPage() {
  const {
    content,
    loading,
    saving,
    dirty,
    message,
    update,
    save,
    footerContent,
    footerUpdate,
  } = usePageWithFooterEditor("insights");

  const [activeId, setActiveId] = useState<string | null>(null);

  const shellProps = {
    pageTitle: "Insights",
    onSave: save,
    saving,
    dirty,
    message,
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminShell {...shellProps}>
          <p className="admin-main text text-16">Loading insights content...</p>
        </AdminShell>
      </AdminGuard>
    );
  }

  const posts = sortInsightsByLatest(content.posts);
  const activePost = posts.find((post) => post.id === activeId) ?? null;

  function updatePost(
    id: string,
    updater: (post: InsightPost) => InsightPost
  ) {
    update((prev) => ({
      ...prev,
      posts: prev.posts.map((post) =>
        post.id === id ? updater(post) : post
      ),
    }));
  }

  function handleAdd() {
    const next = createEmptyInsight();
    update((prev) => ({
      ...prev,
      posts: [next, ...prev.posts],
    }));
    setActiveId(next.id);
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Remove this insight? Click Save in the top bar to publish the deletion."
    );
    if (!confirmed) return;

    update((prev) => ({
      ...prev,
      posts: prev.posts.filter((post) => post.id !== id),
    }));
    setActiveId(null);
  }

  function closeModal() {
    setActiveId(null);
  }

  return (
    <AdminGuard>
      <AdminShell {...shellProps}>
        <AdminSitePreview footer={footerContent} footerUpdate={footerUpdate}>
          <main>
            <section className="page-banner overlay" aria-label="Insights">
              <picture className="media media-bg">
                <img
                  src="/assets/img/banner/page-banner.jpg"
                  width={1920}
                  height={520}
                  alt=""
                />
              </picture>
              <div className="page-banner-content">
                <div className="container text-center">
                  <EditableText
                    className="heading text-80 fw-700"
                    value={content.heroTitle}
                    onChange={(heroTitle) =>
                      update((prev) => ({ ...prev, heroTitle }))
                    }
                  />
                </div>
              </div>
            </section>

            <div className="featured-blog blog-style-3 section-padding">
              <div className="container">
                <div className="section-headings text-center">
                  <EditableText
                    className="heading text-50"
                    value={content.heading}
                    onChange={(heading) =>
                      update((prev) => ({ ...prev, heading }))
                    }
                  />
                  <p className="text text-14 admin-insights-preview-note">
                    Click a card to edit in a popup, or use Add for a new
                    insight. After editing or deleting, click Save in the top
                    bar to publish.
                  </p>
                </div>
                <div className="section-content">
                  <div className="row product-grid justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4">
                      <button
                        type="button"
                        className="admin-insight-add-card"
                        onClick={handleAdd}
                        disabled={saving}
                      >
                        <span className="admin-insight-add-icon" aria-hidden>
                          +
                        </span>
                        <span className="heading text-22">Add Insight</span>
                        <span className="text text-14">
                          Create a new article with full details
                        </span>
                      </button>
                    </div>

                    {posts.map((post) => (
                      <div key={post.id} className="col-12 col-md-6 col-lg-4">
                        <button
                          type="button"
                          className={`card-blog-list admin-insight-card${
                            activeId === post.id ? " is-active" : ""
                          }`}
                          onClick={() => setActiveId(post.id)}
                          disabled={saving}
                        >
                          <div className="card-blog-list-media radius18">
                            <div className="media">
                              <img
                                src={post.image}
                                alt=""
                                width={1000}
                                height={707}
                              />
                            </div>
                          </div>
                          <h2 className="card-blog-heading heading text-22">
                            {post.title}
                          </h2>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </AdminSitePreview>

        {activePost ? (
          <AdminInsightModal
            post={activePost}
            onChange={(updater) => updatePost(activePost.id, updater)}
            onClose={closeModal}
            onDelete={() => handleDelete(activePost.id)}
            onDone={closeModal}
            saving={saving}
          />
        ) : null}
      </AdminShell>
    </AdminGuard>
  );
}
