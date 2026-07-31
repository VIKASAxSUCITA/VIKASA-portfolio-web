"use client";

import { FormEvent, useState } from "react";
import LocalizedEditableField from "@/app/components/i18n/LocalizedEditableField";
import LocalizedSection from "@/app/components/i18n/LocalizedSection";
import type { HomeContent } from "@/lib/content/types";
import { asLocalized, readLocalized, setLocalized } from "@/lib/i18n/localized";
import { ui, uiT } from "@/lib/i18n/ui";
import { ArrowIcon } from "../admin/EditableField";
import EditableText from "../admin/EditableText";

export function EmailIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width={80} height={80} rx={10} fill="var(--vikasa-brown, #5e3123)" />
      <path
        d="M22 28h36a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4Zm0 3.2 17.1 11.4a1.8 1.8 0 0 0 1.8 0L58 31.2V32a1.2 1.2 0 0 0-1.2-1.2H23.2A1.2 1.2 0 0 0 22 32v-.8Z"
        fill="white"
      />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width={80} height={80} rx={10} fill="var(--vikasa-brown, #5e3123)" />
      <path
        d="M40 22c-9.4 0-17 7.6-17 17 0 3 .8 5.8 2.2 8.3L23 58l10.9-2.9c2.4 1.3 5.1 2 8.1 2 9.4 0 17-7.6 17-17S49.4 22 40 22Zm8.5 24.1c-.4 1-2.1 1.9-2.9 2-.8.1-1.7.2-2.8-.2-1.1-.3-2.4-.9-4.1-1.8-3-1.5-5-5-5.1-5.2-.2-.2-1.3-1.7-1.3-3.3 0-1.5.8-2.3 1.1-2.6.3-.3.6-.4.9-.4h.6c.2 0 .5 0 .7.5.3.7.9 2.3 1 2.5.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.5.5-.2.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.2.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.9.9 2.2 1.1.3.2.5.2.6.4.1.1.1 1-.3 2Z"
        fill="white"
      />
    </svg>
  );
}

type Contact = HomeContent["contact"];

type ContactFormProps = {
  content: Contact;
  edit?: { onChange: (updater: (prev: Contact) => Contact) => void };
};

export default function ContactForm({ content, edit }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <LocalizedSection
      edit={!!edit}
      translateSources={[
        content.badge.en,
        content.title.en,
        content.text.en,
        content.whatsappLabel.en,
        content.formTitle.en,
        content.formText.en,
        content.buttonLabel.en,
      ]}
      onAutoTranslated={(locale, values) => {
        edit?.onChange((prev) => ({
          ...prev,
          badge: setLocalized(asLocalized(prev.badge), locale, values[0] ?? ""),
          title: setLocalized(asLocalized(prev.title), locale, values[1] ?? ""),
          text: setLocalized(asLocalized(prev.text), locale, values[2] ?? ""),
          whatsappLabel: setLocalized(
            asLocalized(prev.whatsappLabel),
            locale,
            values[3] ?? ""
          ),
          formTitle: setLocalized(
            asLocalized(prev.formTitle),
            locale,
            values[4] ?? ""
          ),
          formText: setLocalized(
            asLocalized(prev.formText),
            locale,
            values[5] ?? ""
          ),
          buttonLabel: setLocalized(
            asLocalized(prev.buttonLabel),
            locale,
            values[6] ?? ""
          ),
        }));
      }}
    >
      {(locale) => {
        const whatsappHref = `https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(
          uiT(ui.contact.whatsappPreset, locale)
        )}`;
        const mailtoHref = `mailto:${content.email}?subject=${encodeURIComponent(
          uiT(ui.contact.mailSubject, locale)
        )}`;

        function handleSubmit(event: FormEvent<HTMLFormElement>) {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          const name = String(data.get("name") || "").trim();
          const email = String(data.get("email") || "").trim();
          const message = String(data.get("message") || "").trim();

          const body = [
            `${uiT(ui.contact.mailName, locale)} ${name}`,
            `${uiT(ui.contact.mailEmail, locale)} ${email}`,
            "",
            message,
          ].join("\n");

          window.location.href = `mailto:${content.email}?subject=${encodeURIComponent(
            uiT(ui.contact.mailSubject, locale)
          )}&body=${encodeURIComponent(body)}`;

          setStatus("sent");
          form.reset();
        }

        return (
        <div className="section-contact-form section-padding">
          <div className="container">
            <div id="contact" className="contact-box radius18">
              <div className="row product-grid justify-content-between">
                <div className="col-12 col-lg-6 col-contact-content">
                  <div className="section-headings">
                    <div
                      className="subheading text-20 subheading-bg"
                      data-aos="fade-up"
                    >
                      <LocalizedEditableField
                        as="span"
                        value={content.badge}
                        locale={locale}
                        label="Contact badge"
                        edit={
                          edit
                            ? {
                                onChange: (badge) =>
                                  edit.onChange((prev) => ({ ...prev, badge })),
                              }
                            : undefined
                        }
                      />
                    </div>
                    <LocalizedEditableField
                      as="h2"
                      className="heading text-50"
                      value={content.title}
                      locale={locale}
                      aos="fade-up"
                      label="Contact title"
                      edit={
                        edit
                          ? {
                              onChange: (title) =>
                                edit.onChange((prev) => ({ ...prev, title })),
                            }
                          : undefined
                      }
                    />
                    <LocalizedEditableField
                      as="p"
                      className="text text-18"
                      value={content.text}
                      locale={locale}
                      multiline
                      aos="fade-up"
                      label="Contact description"
                      edit={
                        edit
                          ? {
                              onChange: (text) =>
                                edit.onChange((prev) => ({ ...prev, text })),
                            }
                          : undefined
                      }
                    />

                    {edit ? (
                      <div className="card-icon-text card-icon-text-horizontal contact-channel">
                        <div className="svg-wrapper">
                          <EmailIcon />
                        </div>
                        <div className="content">
                          <h2 className="heading text-24 fw-700">
                            {uiT(ui.contact.email, locale)}
                          </h2>
                          <EditableText
                            className="text text-16"
                            value={content.email}
                            label="Email address"
                            onChange={(email) =>
                              edit.onChange((prev) => ({ ...prev, email }))
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <a
                        href={mailtoHref}
                        className="card-icon-text card-icon-text-horizontal contact-channel"
                        data-aos="fade-up"
                        aria-label={`${uiT(ui.contact.email, locale)} ${content.email}`}
                      >
                        <div className="svg-wrapper">
                          <EmailIcon />
                        </div>
                        <div className="content">
                          <h2 className="heading text-24 fw-700">
                            {uiT(ui.contact.email, locale)}
                          </h2>
                          <p className="text text-16">{content.email}</p>
                        </div>
                      </a>
                    )}

                    {edit ? (
                      <div className="card-icon-text card-icon-text-horizontal contact-channel">
                        <div className="svg-wrapper">
                          <WhatsAppIcon />
                        </div>
                        <div className="content">
                          <h2 className="heading text-24 fw-700">
                            {uiT(ui.contact.whatsapp, locale)}
                          </h2>
                          <LocalizedEditableField
                            className="text text-16"
                            value={content.whatsappLabel}
                            locale={locale}
                            label="WhatsApp label"
                            edit={{
                              onChange: (whatsappLabel) =>
                                edit.onChange((prev) => ({
                                  ...prev,
                                  whatsappLabel,
                                })),
                            }}
                          />
                          <EditableText
                            className="text text-14"
                            value={content.whatsappNumber}
                            label="WhatsApp number (digits only)"
                            onChange={(whatsappNumber) =>
                              edit.onChange((prev) => ({
                                ...prev,
                                whatsappNumber,
                              }))
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <a
                        href={whatsappHref}
                        className="card-icon-text card-icon-text-horizontal contact-channel"
                        data-aos="fade-up"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={uiT(ui.contact.chatAria, locale)}
                      >
                        <div className="svg-wrapper">
                          <WhatsAppIcon />
                        </div>
                        <div className="content">
                          <h2 className="heading text-24 fw-700">
                            {uiT(ui.contact.whatsapp, locale)}
                          </h2>
                          <p className="text text-16">
                            {readLocalized(content.whatsappLabel, locale)}
                          </p>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                <div className="col-12 col-lg-6 col-contact-form">
                  <div className="contact-form-wrap radius18">
                    <div className="contact-form-headings">
                      <LocalizedEditableField
                        as="h2"
                        className="heading text-32"
                        value={content.formTitle}
                        locale={locale}
                        aos="fade-up"
                        label="Form title"
                        edit={
                          edit
                            ? {
                                onChange: (formTitle) =>
                                  edit.onChange((prev) => ({
                                    ...prev,
                                    formTitle,
                                  })),
                              }
                            : undefined
                        }
                      />
                      <LocalizedEditableField
                        as="p"
                        className="text text-16"
                        value={content.formText}
                        locale={locale}
                        multiline
                        aos="fade-up"
                        label="Form description"
                        edit={
                          edit
                            ? {
                                onChange: (formText) =>
                                  edit.onChange((prev) => ({ ...prev, formText })),
                              }
                            : undefined
                        }
                      />
                    </div>
                    <form
                      action="#"
                      className="form contact-form"
                      data-aos="fade-up"
                      onSubmit={handleSubmit}
                    >
                      <div className="field">
                        <label
                          htmlFor="ContactForm-name"
                          className="visually-hidden"
                        >
                          {uiT(ui.contact.nameLabel, locale)}
                        </label>
                        <input
                          id="ContactForm-name"
                          className="contact-form-control"
                          type="text"
                          placeholder={uiT(ui.contact.namePlaceholder, locale)}
                          name="name"
                          required
                          autoComplete="name"
                          disabled={Boolean(edit)}
                        />
                      </div>
                      <div className="field">
                        <label
                          htmlFor="ContactForm-email"
                          className="visually-hidden"
                        >
                          {uiT(ui.contact.email, locale)}
                        </label>
                        <input
                          id="ContactForm-email"
                          className="contact-form-control"
                          type="email"
                          placeholder={uiT(ui.contact.emailPlaceholder, locale)}
                          name="email"
                          required
                          autoComplete="email"
                          disabled={Boolean(edit)}
                        />
                      </div>
                      <div className="field">
                        <label
                          htmlFor="ContactForm-body"
                          className="visually-hidden"
                        >
                          {uiT(ui.contact.messageLabel, locale)}
                        </label>
                        <textarea
                          id="ContactForm-body"
                          className="contact-form-control"
                          rows={4}
                          placeholder={uiT(ui.contact.messagePlaceholder, locale)}
                          name="message"
                          required
                          disabled={Boolean(edit)}
                        />
                      </div>
                      <div className="form-button contact-form-actions">
                        {edit ? (
                          <span className="button button--secondary">
                            <LocalizedEditableField
                              as="span"
                              value={content.buttonLabel}
                              locale={locale}
                              label="Form button"
                              edit={{
                                onChange: (buttonLabel) =>
                                  edit.onChange((prev) => ({
                                    ...prev,
                                    buttonLabel,
                                  })),
                              }}
                            />
                            <ArrowIcon />
                          </span>
                        ) : (
                          <button
                            type="submit"
                            className="button button--secondary"
                            aria-label={readLocalized(
                              content.buttonLabel,
                              locale
                            )}
                          >
                            {readLocalized(content.buttonLabel, locale)}
                            <ArrowIcon />
                          </button>
                        )}
                      </div>
                      {status === "sent" ? (
                        <p className="text text-14 contact-form-note">
                          {uiT(ui.contact.sentNote, locale)}
                        </p>
                      ) : null}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      }}
    </LocalizedSection>
  );
}
