import { Metadata } from "next";
import WorksPage from './WorkPage'

export const metadata: Metadata = {
  title: "Our Works | Arixon Labs",
  description: "Explore our portfolio of high-performance SaaS, AI, and web applications developed by Arixon Labs.",
};

const page = () => {
  return (
    <WorksPage/>
  )
}

export default page