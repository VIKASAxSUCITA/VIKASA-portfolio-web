import { loadPageContent } from "@/lib/content/firestore";
import HomeFooter from "./HomeFooter";

export default async function FooterSection() {
  const content = await loadPageContent("footer");
  return <HomeFooter content={content} />;
}
