import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/app/components/services/ServiceDetailView";
import FooterSection from "@/app/components/home/FooterSection";
import { loadPageContent } from "@/lib/content/firestore";
import { getServiceBySlug, SERVICE_DETAILS } from "@/lib/content/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateStaticParams() {
  return SERVICE_DETAILS.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await loadPageContent("services");
  const service = getServiceBySlug(slug, content.services);
  if (!service) return { title: "Service" };
  return {
    title: service.title.en,
    description: service.description.en,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await loadPageContent("services");
  const service = getServiceBySlug(slug, content.services);
  if (!service) notFound();

  return (
    <>
      <ServiceDetailView
        service={service}
        allServices={content.services}
      />
      <FooterSection />
    </>
  );
}
