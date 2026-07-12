import type { Metadata } from "next";
import ContactFooter from "../components/contact/ContactFooter";
import ContactForm from "../components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact / Get Proposal",
  description:
    "Request a VIKASA proposal or book a consultation by form, WhatsApp, or email.",
};

export default function Page() {
  return (
    <main>
      <ContactForm />
      <ContactFooter />
    </main>
  );
}
