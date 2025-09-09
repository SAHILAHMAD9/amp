import { HeroSection } from "../components/ui/HeroSection";
import { EventCard } from "../components/ui/EventCard";
import { FAQAccordion } from "../components/ui/FAQAccordion";
import { MyJobTable } from "@/components/ui/MyJobTable";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AiJobTable } from "@/components/ui/AiJobTable";
// import { AiJobTable } from "@/components/ui/AiJobTable";

export default async function Home() {

  const supabase = createServerComponentClient({ cookies });
  const { data: jobs,error } = await supabase.from('jobs').select('*');
     
  
  return (
    <div className="font-sans flex flex-col min-h-screen">
      <HeroSection />
      <EventCard />
      {/* <AiJobTable jobs={jobs}/> */}
      <AiJobTable jobs={jobs}/>
      <FAQAccordion/>
    </div>
  );
}
  