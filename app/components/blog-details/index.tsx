import HomePageStyles from "../home/HomePageStyles";
import FooterSection from "../home/FooterSection";
import BlogDetailsBody from "./BlogDetailsBody";
import type { BlogDetailsContent } from "@/lib/content/types";

type BlogDetailsContentProps = {
  content: BlogDetailsContent;
};

export default function BlogDetailsContent({
  content,
}: BlogDetailsContentProps) {
  return (
    <>
      <HomePageStyles />
      <BlogDetailsBody content={content} />
      <div className="mt-100">
        <FooterSection />
      </div>
    </>
  );
}
