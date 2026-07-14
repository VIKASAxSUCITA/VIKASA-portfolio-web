"use client";

import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminShell from "@/app/components/admin/AdminShell";
import AdminSitePreview from "@/app/components/admin/AdminSitePreview";
import EditableImage from "@/app/components/admin/EditableImage";
import EditableText from "@/app/components/admin/EditableText";
import { usePageWithFooterEditor } from "@/app/components/admin/usePageWithFooterEditor";

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
                </div>
                <div className="section-content">
                  <div className="row product-grid justify-content-center">
                    {content.posts.map((post, index) => (
                      <div
                        key={post.id}
                        className="col-12 col-md-6 col-lg-4"
                      >
                        <div className="card-blog-list">
                          <div className="card-blog-list-media radius18">
                            <div className="media">
                              <EditableImage
                                src={post.image}
                                onChange={(image) =>
                                  update((prev) => {
                                    const posts = [...prev.posts];
                                    posts[index] = {
                                      ...posts[index],
                                      image,
                                    };
                                    return { ...prev, posts };
                                  })
                                }
                                alt=""
                              />
                            </div>
                          </div>
                          <h2 className="card-blog-heading heading text-22">
                            <EditableText
                              className="heading text-22"
                              value={post.title}
                              onChange={(title) =>
                                update((prev) => {
                                  const posts = [...prev.posts];
                                  posts[index] = {
                                    ...posts[index],
                                    title,
                                  };
                                  return { ...prev, posts };
                                })
                              }
                            />
                          </h2>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </AdminSitePreview>
      </AdminShell>
    </AdminGuard>
  );
}
