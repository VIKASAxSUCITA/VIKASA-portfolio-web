import type { Metadata } from "next";
import ContactFooter from "../components/contact/ContactFooter";
import ContactForm from "../components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with VIKASA. Request a proposal or book a strategy consultation.",
};

export default function Page() {
  return (
    <main>
      <ContactForm />
      <ContactFooter />
    </main>
  );
}
