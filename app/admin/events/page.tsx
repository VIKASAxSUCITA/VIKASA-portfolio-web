"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminEventDetailEditor from "@/app/components/admin/AdminEventDetailEditor";
import AdminShell from "@/app/components/admin/AdminShell";
import AdminSitePreview from "@/app/components/admin/AdminSitePreview";
import LocalizedEditableField from "@/app/components/i18n/LocalizedEditableField";
import LocalizedSection from "@/app/components/i18n/LocalizedSection";
import { usePageWithFooterEditor } from "@/app/components/admin/usePageWithFooterEditor";
import {
  createEmptyEvent,
  eventKindLabel,
  formatEventDateTime,
  sortEventsBySchedule,
} from "@/lib/content/events";
import type { EventPost } from "@/lib/content/types";
import { asLocalized, setLocalized } from "@/lib/i18n/localized";

export default function AdminEventsEditorPage() {
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
  } = usePageWithFooterEditor("events");

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    const editId = new URLSearchParams(window.location.search).get("edit");
    if (!editId) return;
    const exists = content.posts.some((post) => post.id === editId);
    if (!exists) return;
    setActiveId(editId);
    window.history.replaceState(null, "", "/admin/events");
  }, [loading, content.posts]);

  const shellProps = {
    pageTitle: "Events",
    onSave: save,
    saving,
    dirty,
    message,
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminShell {...shellProps}>
          <p className="admin-main text text-16">Loading events content...</p>
        </AdminShell>
      </AdminGuard>
    );
  }

  const posts = sortEventsBySchedule(content.posts);
  const activePost = posts.find((post) => post.id === activeId) ?? null;
  const contact = {
    email: footerContent.contact.email,
    phone: footerContent.contact.phone,
  };

  function updatePost(
    id: string,
    updater: (post: EventPost) => EventPost
  ) {
    update((prev) => ({
      ...prev,
      posts: prev.posts.map((post) =>
        post.id === id ? updater(post) : post
      ),
    }));
  }

  function handleAdd() {
    const next = createEmptyEvent();
    update((prev) => ({
      ...prev,
      posts: [next, ...prev.posts],
    }));
    setActiveId(next.id);
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Remove this event? Click Save in the top bar to publish the deletion."
    );
    if (!confirmed) return;

    update((prev) => ({
      ...prev,
      posts: prev.posts.filter((post) => post.id !== id),
    }));
    setActiveId(null);
  }

  return (
    <AdminGuard>
      <AdminShell {...shellProps}>
        <AdminSitePreview footer={footerContent} footerUpdate={footerUpdate}>
          {activePost ? (
            <AdminEventDetailEditor
              post={activePost}
              contact={contact}
              onChange={(updater) => updatePost(activePost.id, updater)}
              onBack={() => setActiveId(null)}
              onDelete={() => handleDelete(activePost.id)}
              saving={saving}
            />
          ) : (
            <main>
              <section className="page-banner overlay" aria-label="Events">
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
                    <LocalizedSection
                      edit
                      translateSources={[
                        content.heroTitle.en,
                        content.heading.en,
                      ]}
                      onAutoTranslated={(locale, values) => {
                        update((prev) => ({
                          ...prev,
                          heroTitle: setLocalized(
                            asLocalized(prev.heroTitle),
                            locale,
                            values[0] ?? ""
                          ),
                          heading: setLocalized(
                            asLocalized(prev.heading),
                            locale,
                            values[1] ?? ""
                          ),
                        }));
                      }}
                    >
                      {(locale) => (
                        <LocalizedEditableField
                          as="span"
                          className="heading text-80 fw-700"
                          value={content.heroTitle}
                          locale={locale}
                          label="Events hero title"
                          edit={{
                            onChange: (heroTitle) =>
                              update((prev) => ({ ...prev, heroTitle })),
                          }}
                        />
                      )}
                    </LocalizedSection>
                  </div>
                </div>
              </section>

              <div className="featured-blog blog-style-3 section-padding">
                <div className="container">
                  <div className="section-headings text-center">
                    <LocalizedSection
                      edit
                      translateSources={[content.heading.en]}
                      onAutoTranslated={(locale, values) => {
                        update((prev) => ({
                          ...prev,
                          heading: setLocalized(
                            asLocalized(prev.heading),
                            locale,
                            values[0] ?? ""
                          ),
                        }));
                      }}
                    >
                      {(locale) => (
                        <LocalizedEditableField
                          as="span"
                          className="heading text-50"
                          value={content.heading}
                          locale={locale}
                          label="Events list heading"
                          edit={{
                            onChange: (heading) =>
                              update((prev) => ({ ...prev, heading })),
                          }}
                        />
                      )}
                    </LocalizedSection>
                    <p className="text text-14 admin-insights-preview-note">
                      Click a card to edit the full detail page, or use Add for
                      a new event/announcement. After editing or deleting, click
                      Save in the top bar to publish.
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
                          <span className="heading text-22">Add Event</span>
                          <span className="text text-14">
                            Create an event or announcement with schedule
                          </span>
                        </button>
                      </div>

                      {posts.map((post) => (
                        <div key={post.id} className="col-12 col-md-6 col-lg-4">
                          <button
                            type="button"
                            className="card-blog-list admin-insight-card"
                            onClick={() => setActiveId(post.id)}
                            disabled={saving}
                          >
                            <div className="card-blog-list-media radius18">
                              <div className="media">
                                <img
                                  src={post.coverImage}
                                  alt=""
                                  width={1000}
                                  height={707}
                                />
                              </div>
                            </div>
                            <p className="text text-14 admin-event-card-meta">
                              {eventKindLabel(post.kind)} •{" "}
                              {formatEventDateTime(post.startsAt)}
                            </p>
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
          )}
        </AdminSitePreview>
      </AdminShell>
    </AdminGuard>
  );
}
