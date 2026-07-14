import ContactForm from "../contact/ContactForm";
import type { HomeContent } from "@/lib/content/types";

type HomeContactProps = {
  content: HomeContent["contact"];
};

export default function HomeContact({ content }: HomeContactProps) {
  return <ContactForm content={content} />;
}
