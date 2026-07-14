"use client";

import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminShell from "@/app/components/admin/AdminShell";
import AdminSitePreview from "@/app/components/admin/AdminSitePreview";
import EditableImage from "@/app/components/admin/EditableImage";
import EditableText from "@/app/components/admin/EditableText";
import { usePageWithFooterEditor } from "@/app/components/admin/usePageWithFooterEditor";

export default function AdminBlogDetailsEditorPage() {
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
  } = usePageWithFooterEditor("blog-details");

  const shellProps = {
    pageTitle: "Blog details",
    onSave: save,
    saving,
    dirty,
    message,
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminShell {...shellProps}>
          <p className="admin-main text text-16">
            Loading blog details content...
          </p>
        </AdminShell>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminShell {...shellProps}>
        <AdminSitePreview footer={footerContent} footerUpdate={footerUpdate}>
          <main>
            <section className="page-banner overlay" aria-label="Blog Details">
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
                    value={content.bannerTitle}
                    onChange={(bannerTitle) =>
                      update((prev) => ({ ...prev, bannerTitle }))
                    }
                  />
                </div>
              </div>
            </section>

            <div className="page-blog-details mt-100">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="blog-details">
                      <div className="card-blog-list">
                        <div className="card-blog-list-media radius18">
                          <div className="media">
                            <EditableImage
                              src={content.heroImage}
                              onChange={(heroImage) =>
                                update((prev) => ({ ...prev, heroImage }))
                              }
                              alt="blog image"
                            />
                          </div>
                        </div>

                        <div className="card-blog-content">
                          <EditableText
                            className="card-blog-heading heading text-50"
                            value={content.title}
                            onChange={(title) =>
                              update((prev) => ({ ...prev, title }))
                            }
                          />

                          <div className="blog-description">
                            {content.paragraphs.slice(0, 2).map((paragraph, index) => (
                              <EditableText
                                key={index}
                                multiline
                                className="text text-18"
                                value={paragraph}
                                onChange={(value) =>
                                  update((prev) => {
                                    const paragraphs = [
                                      ...prev.paragraphs,
                                    ] as [string, string, string, string];
                                    paragraphs[index] = value;
                                    return { ...prev, paragraphs };
                                  })
                                }
                              />
                            ))}

                            <div className="blog-paired-image">
                              {content.pairedImages.map((image, index) => (
                                <EditableImage
                                  key={index}
                                  src={image}
                                  onChange={(value) =>
                                    update((prev) => {
                                      const pairedImages = [
                                        ...prev.pairedImages,
                                      ] as [string, string];
                                      pairedImages[index] = value;
                                      return { ...prev, pairedImages };
                                    })
                                  }
                                  alt="blog image"
                                />
                              ))}
                            </div>

                            {content.paragraphs.slice(2).map((paragraph, i) => {
                              const index = i + 2;
                              return (
                                <EditableText
                                  key={index}
                                  multiline
                                  className="text text-18"
                                  value={paragraph}
                                  onChange={(value) =>
                                    update((prev) => {
                                      const paragraphs = [
                                        ...prev.paragraphs,
                                      ] as [string, string, string, string];
                                      paragraphs[index] = value;
                                      return { ...prev, paragraphs };
                                    })
                                  }
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
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
