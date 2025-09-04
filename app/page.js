import Image from "next/image";
import { HeroSection } from "../components/HeroSection";
import { EventCard } from "../components/EventCard";
import { FAQAccordion } from "../components/FAQAccordion";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen">
      <HeroSection />
      <EventCard />
      <FAQAccordion/>
    </div>
  );
}
