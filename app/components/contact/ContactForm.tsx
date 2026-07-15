"use client";

import { FormEvent, useState } from "react";
import type { HomeContent } from "@/lib/content/types";

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

type ContactFormProps = {
  content: HomeContent["contact"];
};

export default function ContactForm({ content }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const whatsappHref = `https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(
    "Hello VIKASA, I would like to request a proposal."
  )}`;
  const mailtoHref = `mailto:${content.email}?subject=${encodeURIComponent(
    "VIKASA — Request Proposal"
  )}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");

    window.location.href = `mailto:${content.email}?subject=${encodeURIComponent(
      "VIKASA — Request Proposal"
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
                  <span>{content.badge}</span>
                </div>
                <h2 className="heading text-50" data-aos="fade-up">
                  {content.title}
                </h2>
                <p className="text text-18" data-aos="fade-up">
                  {content.text}
                </p>

                <a
                  href={mailtoHref}
                  className="card-icon-text card-icon-text-horizontal contact-channel"
                  data-aos="fade-up"
                  aria-label={`Email ${content.email}`}
                >
                  <div className="svg-wrapper">
                    <EmailIcon />
                  </div>
                  <div className="content">
                    <h2 className="heading text-24 fw-700">Email</h2>
                    <p className="text text-16">{content.email}</p>
                  </div>
                </a>

                <a
                  href={whatsappHref}
                  className="card-icon-text card-icon-text-horizontal contact-channel"
                  data-aos="fade-up"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                >
                  <div className="svg-wrapper">
                    <WhatsAppIcon />
                  </div>
                  <div className="content">
                    <h2 className="heading text-24 fw-700">WhatsApp</h2>
                    <p className="text text-16">{content.whatsappLabel}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-12 col-lg-6 col-contact-form">
              <div className="contact-form-wrap radius18">
                <div className="contact-form-headings">
                  <h2 className="heading text-32" data-aos="fade-up">
                    {content.formTitle}
                  </h2>
                  <p className="text text-16" data-aos="fade-up">
                    {content.formText}
                  </p>
                </div>
                <form
                  action="#"
                  className="form contact-form"
                  data-aos="fade-up"
                  onSubmit={handleSubmit}
                >
                  <div className="field">
                    <label htmlFor="ContactForm-name" className="visually-hidden">
                      Your Name
                    </label>
                    <input
                      id="ContactForm-name"
                      className="contact-form-control"
                      type="text"
                      placeholder="Your Name *"
                      name="name"
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="ContactForm-email" className="visually-hidden">
                      Email
                    </label>
                    <input
                      id="ContactForm-email"
                      className="contact-form-control"
                      type="email"
                      placeholder="Email *"
                      name="email"
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="ContactForm-body" className="visually-hidden">
                      Project details
                    </label>
                    <textarea
                      id="ContactForm-body"
                      className="contact-form-control"
                      rows={4}
                      placeholder="Tell us about your project *"
                      name="message"
                      required
                    />
                  </div>
                  <div className="form-button contact-form-actions">
                    <button
                      type="submit"
                      className="button button--secondary"
                      aria-label={content.buttonLabel}
                    >
                      {content.buttonLabel}
                      <span className="svg-wrapper">
                        <svg
                          className="icon-20"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <path
                            d="M13.3365 7.84518L6.16435 15.0173L4.98584 13.8388L12.158 6.66667H5.83652V5H15.0032V14.1667H13.3365V7.84518Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                  {status === "sent" ? (
                    <p className="text text-14 contact-form-note">
                      Opening your email app to send the proposal request…
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
}
