import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/app/components/services/ServiceDetailView";
import FooterSection from "@/app/components/home/FooterSection";
import {
  getServiceBySlug,
  SERVICE_DETAILS,
} from "@/lib/content/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_DETAILS.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title.en,
    description: service.description.en,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <ServiceDetailView service={service} />
      <FooterSection />
    </>
  );
}
