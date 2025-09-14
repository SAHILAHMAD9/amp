import { HeroSection } from "../components/ui/HeroSection";
import { EventCard } from "../components/ui/EventCard";
import { FAQAccordion } from "../components/ui/FAQAccordion";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AiJobTable } from "@/components/ui/AiJobTable";
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: jobs, error } = await supabase.from('jobs').select('*').order('clicks',{ascending:false});
  
  return (
    <div className="font-sans flex flex-col min-h-screen">
      <HeroSection />
      <EventCard />
      <AiJobTable jobs={jobs}/>
      <FAQAccordion/>
    </div>
  );
}