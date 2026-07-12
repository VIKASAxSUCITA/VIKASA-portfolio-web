import ContactFooter from "./ContactFooter";
import ContactForm from "./ContactForm";

export { ContactFooter, ContactForm };

export default function ContactContent() {
  return (
    <main>
      <ContactForm />
      <ContactFooter />
    </main>
  );
}
