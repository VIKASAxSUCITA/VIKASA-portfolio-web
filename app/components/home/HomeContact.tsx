import ContactForm from "../contact/ContactForm";
import type { HomeContent } from "@/lib/content/types";

type Contact = HomeContent["contact"];

type HomeContactProps = {
  content: Contact;
  edit?: { onChange: (updater: (prev: Contact) => Contact) => void };
};

export default function HomeContact({ content, edit }: HomeContactProps) {
  return <ContactForm content={content} edit={edit} />;
}
