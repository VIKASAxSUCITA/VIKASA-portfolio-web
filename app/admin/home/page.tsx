"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminShell from "@/app/components/admin/AdminShell";
import AdminSitePreview from "@/app/components/admin/AdminSitePreview";
import EditableImage from "@/app/components/admin/EditableImage";
import EditableText from "@/app/components/admin/EditableText";
import {
  EmailIcon,
  WhatsAppIcon,
} from "@/app/components/contact/ContactForm";
import { usePageEditor } from "@/app/components/admin/usePageEditor";
import { usePageWithFooterEditor } from "@/app/components/admin/usePageWithFooterEditor";
import { getLatestInsights } from "@/lib/content/insights";
import type { InsightsContent } from "@/lib/content/types";

export default function AdminHomeEditorPage() {
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
  } = usePageWithFooterEditor("home");

  const insightsEditor = usePageEditor("insights");
  const [insightsPreview, setInsightsPreview] = useState<InsightsContent | null>(
    null
  );

  useEffect(() => {
    if (!insightsEditor.loading) {
      setInsightsPreview(insightsEditor.content);
    }
  }, [insightsEditor.loading, insightsEditor.content]);

  const shellProps = {
    pageTitle: "Home",
    onSave: save,
    saving,
    dirty,
    message,
  };

  if (loading || insightsEditor.loading) {
    return (
      <AdminGuard>
        <AdminShell {...shellProps}>
          <p className="admin-main text text-16">Loading home content...</p>
        </AdminShell>
      </AdminGuard>
    );
  }

  const latestInsights = getLatestInsights(insightsPreview?.posts ?? [], 3);
  const insightsHeading =
    insightsPreview?.heading ?? "Latest Insights From Us";

  return (
    <AdminGuard>
      <AdminShell {...shellProps}>
        <AdminSitePreview footer={footerContent} footerUpdate={footerUpdate}>
          <main>
            {/* Hero — same layout as client */}
            <div className="hero-slider with-floating-header">
              <div className="slider-card overlay">
                <picture className="slider-media">
                  <EditableImage
                    src={content.hero.image}
                    onChange={(image) =>
                      update((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, image },
                      }))
                    }
                    alt="Hero"
                  />
                </picture>
                <div className="slider-content">
                  <div className="container height-100 d-flex align-items-center justify-content-center text-center">
                    <div className="content-box section-headings">
                      <EditableText
                        className="heading text-90 fw-700"
                        value={content.hero.title}
                        onChange={(title) =>
                          update((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, title },
                          }))
                        }
                        label="Hero title"
                      />
                      <EditableText
                        multiline
                        className="text text-18"
                        value={content.hero.text}
                        onChange={(text) =>
                          update((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, text },
                          }))
                        }
                        label="Hero text"
                      />
                      <div className="buttons">
                        <span className="button button--primary">
                          <EditableText
                            value={content.hero.ctaLabel}
                            onChange={(ctaLabel) =>
                              update((prev) => ({
                                ...prev,
                                hero: { ...prev.hero, ctaLabel },
                              }))
                            }
                            label="Hero button"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About / What We Do */}
            <div id="about" className="image-text mt-100">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-12">
                    <div className="media-wrap">
                      <EditableImage
                        src={content.about.image}
                        onChange={(image) =>
                          update((prev) => ({
                            ...prev,
                            about: { ...prev.about, image },
                          }))
                        }
                        className="home-about-image"
                        alt="What we do"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="content section-headings">
                      <EditableText
                        className="heading text-50"
                        value={content.about.title}
                        onChange={(title) =>
                          update((prev) => ({
                            ...prev,
                            about: { ...prev.about, title },
                          }))
                        }
                      />
                      <EditableText
                        multiline
                        className="text text-18"
                        value={content.about.text}
                        onChange={(text) =>
                          update((prev) => ({
                            ...prev,
                            about: { ...prev.about, text },
                          }))
                        }
                      />
                      <ul className="text-lists list-unstyled">
                        {content.about.items.map((item, index) => (
                          <li key={index} className="text-item text text-18">
                            <EditableText
                              value={item}
                              onChange={(value) =>
                                update((prev) => {
                                  const items = [...prev.about.items] as [
                                    string,
                                    string,
                                    string,
                                  ];
                                  items[index] = value;
                                  return {
                                    ...prev,
                                    about: { ...prev.about, items },
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
                            value={content.about.buttonLabel}
                            onChange={(buttonLabel) =>
                              update((prev) => ({
                                ...prev,
                                about: { ...prev.about, buttonLabel },
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

            {/* CTA */}
            <div className="text-banner mt-100">
              <div className="container-fluid">
                <div className="text-banner-inner radius18">
                  <div className="section-headings">
                    <div className="subheading text-20 subheading-bg">
                      <EditableText
                        value={content.cta.badge}
                        onChange={(badge) =>
                          update((prev) => ({
                            ...prev,
                            cta: { ...prev.cta, badge },
                          }))
                        }
                      />
                    </div>
                    <EditableText
                      className="heading text-80"
                      value={content.cta.title}
                      onChange={(title) =>
                        update((prev) => ({
                          ...prev,
                          cta: { ...prev.cta, title },
                        }))
                      }
                    />
                    <EditableText
                      multiline
                      className="text text-24"
                      value={content.cta.text}
                      onChange={(text) =>
                        update((prev) => ({
                          ...prev,
                          cta: { ...prev.cta, text },
                        }))
                      }
                    />
                    <div className="buttons">
                      <span className="button button--secondary">
                        <EditableText
                          value={content.cta.buttonLabel}
                          onChange={(buttonLabel) =>
                            update((prev) => ({
                              ...prev,
                              cta: { ...prev.cta, buttonLabel },
                            }))
                          }
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="services section-padding">
              <div className="container">
                <div className="section-headings text-center">
                  <EditableText
                    className="heading text-50"
                    value={content.services.heading}
                    onChange={(heading) =>
                      update((prev) => ({
                        ...prev,
                        services: { ...prev.services, heading },
                      }))
                    }
                  />
                </div>
                <div className="row">
                  {content.services.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="col-lg-4 col-12 mb-4">
                      <div className="service-card">
                        <EditableText
                          className="heading text-22"
                          value={card.title}
                          onChange={(title) =>
                            update((prev) => {
                              const cards = [...prev.services.cards];
                              cards[cardIndex] = {
                                ...cards[cardIndex],
                                title,
                              };
                              return {
                                ...prev,
                                services: { ...prev.services, cards },
                              };
                            })
                          }
                        />
                        <EditableText
                          multiline
                          className="text text-16"
                          value={card.description}
                          onChange={(description) =>
                            update((prev) => {
                              const cards = [...prev.services.cards];
                              cards[cardIndex] = {
                                ...cards[cardIndex],
                                description,
                              };
                              return {
                                ...prev,
                                services: { ...prev.services, cards },
                              };
                            })
                          }
                        />
                        <EditableText
                          multiline
                          className="text text-14"
                          value={card.items.join("\n")}
                          onChange={(value) =>
                            update((prev) => {
                              const cards = [...prev.services.cards];
                              cards[cardIndex] = {
                                ...cards[cardIndex],
                                items: value
                                  .split("\n")
                                  .map((line) => line.trim())
                                  .filter(Boolean),
                              };
                              return {
                                ...prev,
                                services: { ...prev.services, cards },
                              };
                            })
                          }
                          label="Service bullets (one per line)"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insights — latest 3 from Insights page (read-only here) */}
            <div className="featured-blog blog-style-3 section-padding">
              <div className="container">
                <div className="section-headings text-center">
                  <h2 className="heading text-50">{insightsHeading}</h2>
                  <p className="text text-14 admin-insights-preview-note">
                    Showing the latest 3 insights automatically. Manage posts on
                    the Insights page.
                  </p>
                </div>
                <div className="section-content">
                  <div className="row product-grid justify-content-center">
                    {latestInsights.map((post) => (
                      <div key={post.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card-blog-list">
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="section-contact-form section-padding">
              <div className="container">
                <div id="contact" className="contact-box radius18">
                  <div className="row product-grid justify-content-between">
                    <div className="col-12 col-lg-6 col-contact-content">
                      <div className="section-headings">
                        <div className="subheading text-20 subheading-bg">
                          <EditableText
                            value={content.contact.badge}
                            onChange={(badge) =>
                              update((prev) => ({
                                ...prev,
                                contact: { ...prev.contact, badge },
                              }))
                            }
                            label="Contact badge"
                          />
                        </div>
                        <EditableText
                          className="heading text-50"
                          value={content.contact.title}
                          onChange={(title) =>
                            update((prev) => ({
                              ...prev,
                              contact: { ...prev.contact, title },
                            }))
                          }
                          label="Contact title"
                        />
                        <EditableText
                          multiline
                          className="text text-18"
                          value={content.contact.text}
                          onChange={(text) =>
                            update((prev) => ({
                              ...prev,
                              contact: { ...prev.contact, text },
                            }))
                          }
                          label="Contact description"
                        />

                        <div className="card-icon-text card-icon-text-horizontal contact-channel">
                          <div className="svg-wrapper">
                            <EmailIcon />
                          </div>
                          <div className="content">
                            <h2 className="heading text-24 fw-700">Email</h2>
                            <EditableText
                              className="text text-16"
                              value={content.contact.email}
                              onChange={(email) =>
                                update((prev) => ({
                                  ...prev,
                                  contact: { ...prev.contact, email },
                                }))
                              }
                              label="Email address"
                            />
                          </div>
                        </div>

                        <div className="card-icon-text card-icon-text-horizontal contact-channel">
                          <div className="svg-wrapper">
                            <WhatsAppIcon />
                          </div>
                          <div className="content">
                            <h2 className="heading text-24 fw-700">WhatsApp</h2>
                            <EditableText
                              className="text text-16"
                              value={content.contact.whatsappLabel}
                              onChange={(whatsappLabel) =>
                                update((prev) => ({
                                  ...prev,
                                  contact: { ...prev.contact, whatsappLabel },
                                }))
                              }
                              label="WhatsApp label"
                            />
                            <EditableText
                              className="text text-14"
                              value={content.contact.whatsappNumber}
                              onChange={(whatsappNumber) =>
                                update((prev) => ({
                                  ...prev,
                                  contact: { ...prev.contact, whatsappNumber },
                                }))
                              }
                              label="WhatsApp number (digits only)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-6 col-contact-form">
                      <div className="contact-form-wrap radius18">
                        <div className="contact-form-headings">
                          <EditableText
                            className="heading text-32"
                            value={content.contact.formTitle}
                            onChange={(formTitle) =>
                              update((prev) => ({
                                ...prev,
                                contact: { ...prev.contact, formTitle },
                              }))
                            }
                            label="Form title"
                          />
                          <EditableText
                            multiline
                            className="text text-16"
                            value={content.contact.formText}
                            onChange={(formText) =>
                              update((prev) => ({
                                ...prev,
                                contact: { ...prev.contact, formText },
                              }))
                            }
                            label="Form description"
                          />
                        </div>
                        <div className="form contact-form">
                          <div className="field">
                            <input
                              className="text text-16"
                              type="text"
                              placeholder="Your Name *"
                              disabled
                            />
                          </div>
                          <div className="field">
                            <input
                              className="text text-16"
                              type="email"
                              placeholder="Email *"
                              disabled
                            />
                          </div>
                          <div className="field">
                            <textarea
                              className="text text-16"
                              rows={4}
                              placeholder="Tell us about your project *"
                              disabled
                            />
                          </div>
                          <div className="form-button contact-form-actions">
                            <span className="button button--secondary">
                              <EditableText
                                value={content.contact.buttonLabel}
                                onChange={(buttonLabel) =>
                                  update((prev) => ({
                                    ...prev,
                                    contact: { ...prev.contact, buttonLabel },
                                  }))
                                }
                                label="Form button"
                              />
                            </span>
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
