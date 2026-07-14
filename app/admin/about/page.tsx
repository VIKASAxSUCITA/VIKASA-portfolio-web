"use client";

import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminShell from "@/app/components/admin/AdminShell";
import AdminSitePreview from "@/app/components/admin/AdminSitePreview";
import EditableImage from "@/app/components/admin/EditableImage";
import EditableText from "@/app/components/admin/EditableText";
import { usePageWithFooterEditor } from "@/app/components/admin/usePageWithFooterEditor";

export default function AdminAboutEditorPage() {
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
  } = usePageWithFooterEditor("about");

  const shellProps = {
    pageTitle: "About",
    onSave: save,
    saving,
    dirty,
    message,
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminShell {...shellProps}>
          <p className="admin-main text text-16">Loading about content...</p>
        </AdminShell>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminShell {...shellProps}>
        <AdminSitePreview footer={footerContent} footerUpdate={footerUpdate}>
          <main>
            <section
              className="page-banner overlay about-hero"
              aria-label="About VIKASA"
            >
              <picture className="media media-bg">
                <EditableImage
                  src={content.hero.image}
                  onChange={(image) =>
                    update((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, image },
                    }))
                  }
                  alt="About banner"
                />
              </picture>
              <div className="page-banner-content">
                <div className="container text-center">
                  <EditableText
                    className="heading text-80 fw-700 about-hero-title"
                    value={content.hero.title}
                    onChange={(title) =>
                      update((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, title },
                      }))
                    }
                  />
                  <EditableText
                    multiline
                    className="text text-18 about-hero-desc"
                    value={content.hero.text}
                    onChange={(text) =>
                      update((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, text },
                      }))
                    }
                  />
                </div>
              </div>
            </section>

            <div className="image-text mt-100">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-12">
                    <div className="media-wrap">
                      <EditableImage
                        src={content.whatWeDo.image}
                        onChange={(image) =>
                          update((prev) => ({
                            ...prev,
                            whatWeDo: { ...prev.whatWeDo, image },
                          }))
                        }
                        alt="What we do"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="content section-headings">
                      <EditableText
                        className="heading text-50"
                        value={content.whatWeDo.title}
                        onChange={(title) =>
                          update((prev) => ({
                            ...prev,
                            whatWeDo: { ...prev.whatWeDo, title },
                          }))
                        }
                      />
                      <EditableText
                        multiline
                        className="text text-18"
                        value={content.whatWeDo.text}
                        onChange={(text) =>
                          update((prev) => ({
                            ...prev,
                            whatWeDo: { ...prev.whatWeDo, text },
                          }))
                        }
                      />
                      <ul className="text-lists list-unstyled">
                        {content.whatWeDo.items.map((item, index) => (
                          <li key={index} className="text-item text text-18">
                            <EditableText
                              value={item}
                              onChange={(value) =>
                                update((prev) => {
                                  const items = [...prev.whatWeDo.items] as [
                                    string,
                                    string,
                                    string,
                                  ];
                                  items[index] = value;
                                  return {
                                    ...prev,
                                    whatWeDo: { ...prev.whatWeDo, items },
                                  };
                                })
                              }
                            />
                          </li>
                        ))}
                      </ul>
                      <div className="buttons">
                        <span className="button button--primary">
                          <EditableText
                            value={content.whatWeDo.buttonLabel}
                            onChange={(buttonLabel) =>
                              update((prev) => ({
                                ...prev,
                                whatWeDo: { ...prev.whatWeDo, buttonLabel },
                              }))
                            }
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="mt-100" aria-labelledby="about-story-heading">
              <div className="container">
                <div className="about-story-inner text-center">
                  <EditableText
                    className="heading text-50 about-story-title"
                    value={content.story.title}
                    onChange={(title) =>
                      update((prev) => ({
                        ...prev,
                        story: { ...prev.story, title },
                      }))
                    }
                  />
                  <EditableText
                    multiline
                    className="text text-18 about-story-desc"
                    value={content.story.text}
                    onChange={(text) =>
                      update((prev) => ({
                        ...prev,
                        story: { ...prev.story, text },
                      }))
                    }
                  />
                </div>
              </div>
            </section>

            <section
              className="about-vm section-padding"
              aria-label="Our Vision and Mission"
            >
              <div className="container">
                <div className="about-vm-grid">
                  <article className="about-vm-item">
                    <EditableText
                      className="heading text-36 about-vm-title"
                      value={content.vision.title}
                      onChange={(title) =>
                        update((prev) => ({
                          ...prev,
                          vision: { ...prev.vision, title },
                        }))
                      }
                    />
                    <EditableText
                      multiline
                      className="text text-18 about-vm-desc"
                      value={content.vision.text}
                      onChange={(text) =>
                        update((prev) => ({
                          ...prev,
                          vision: { ...prev.vision, text },
                        }))
                      }
                    />
                  </article>
                  <article className="about-vm-item">
                    <EditableText
                      className="heading text-36 about-vm-title"
                      value={content.mission.title}
                      onChange={(title) =>
                        update((prev) => ({
                          ...prev,
                          mission: { ...prev.mission, title },
                        }))
                      }
                    />
                    <EditableText
                      multiline
                      className="text text-18 about-vm-desc"
                      value={content.mission.text}
                      onChange={(text) =>
                        update((prev) => ({
                          ...prev,
                          mission: { ...prev.mission, text },
                        }))
                      }
                    />
                  </article>
                </div>
              </div>
            </section>
          </main>
        </AdminSitePreview>
      </AdminShell>
    </AdminGuard>
  );
}
