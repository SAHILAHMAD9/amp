"use client"
import React, { useEffect, useState , useMemo} from 'react'
import { TableHeader } from './TableHeader'
import { supabase } from '@/lib/supabase'

export const JobTable = () => {
  const [activeJobType, setActiveJobType] = useState('full-time'); 
  const [activeCompanyType, setActiveCompanyType] = useState('all');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: jobs, error } = await supabase
          .from('jobs')
          .select('*')
        setJobs(jobs);
        // console.log(jobs, error);
      } catch (err) {
        console.log(err);

      }
    }
    fetchData();
  }, [])

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter((job) => {
      console.log(job);
      const matchingJobType = job.job_type === activeJobType;
      // const matchingCompanyType = job.company_type === activeCompanyType;

      return matchingJobType;
    })
  }, [jobs, activeCompanyType, activeJobType]);

  useEffect(() => {
  console.log(filteredJobs);
  
},[filteredJobs])
  return (
      <div>
      <TableHeader />

      <button onClick={() => setActiveJobType("full-time")}>full time</button>
      <button onClick={() => setActiveJobType("internship")}>Internship</button>
      {filteredJobs.map((item) => {
        return (<p key={item.id}>{item.company}</p>)
      })}
      </div>
  )
}
