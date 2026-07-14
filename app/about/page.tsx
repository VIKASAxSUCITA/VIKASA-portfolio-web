import type { Metadata } from "next";
import AboutBody from "../components/about";

export const metadata: Metadata = {
  title: "About VIKASA",
  description:
    "Vikasa helps businesses grow through strategic consulting, innovation, and accountable solutions that create sustainable transformation.",
};

export default function Page() {
  return <AboutBody />;
}
