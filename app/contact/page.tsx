import { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Arixon Labs",
  description: "Get in touch with Arixon Labs for high-performance SaaS development, AI automation, and custom software solutions. We build products that scale global visions.",
};

export default function page() {
  return <ContactPage />;
}
