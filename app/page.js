import { HeroSection } from "../components/HeroSection";
import { EventCard } from "../components/EventCard";
import { FAQAccordion } from "../components/FAQAccordion";
import { JobTable } from "@/components/ui/JobTable";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home() {

  const supabase = createServerComponentClient({ cookies });
  const { data: jobs,error } = await supabase.from('jobs').select('*');
        console.log(jobs, error);
     
  
  return (
    <div className="font-sans flex flex-col min-h-screen">
      <HeroSection />
      <EventCard />
      <JobTable jobs={jobs}/>
      <FAQAccordion/>
    </div>
  );
}
