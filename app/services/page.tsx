import { Metadata } from "next";
import ServicePage from "./ServicePage";

export const metadata: Metadata = {
  title: "Our Services | Arixon Labs",
  description: "Explore our specialized IT services including SaaS development, AI integration, custom software, and mobile apps designed for scaling businesses.",
};

export default function page() {
  return <ServicePage />;
}
