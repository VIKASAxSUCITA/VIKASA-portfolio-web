import HomePageStyles from "../home/HomePageStyles";
import FooterSection from "../home/FooterSection";
import InsightDetailsBody from "./InsightDetailsBody";
import type { InsightPost } from "@/lib/content/types";

type InsightDetailsPageProps = {
  post: InsightPost;
};

export default function InsightDetailsPage({ post }: InsightDetailsPageProps) {
  return (
    <>
      <HomePageStyles />
      <InsightDetailsBody post={post} />
      <div className="mt-100">
        <FooterSection />
      </div>
    </>
  );
}
