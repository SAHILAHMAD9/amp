"use client"
import React, { useEffect, useState , useMemo, useCallback} from 'react'
import { TableHeader } from './TableHeader'

export const JobTable = ({jobs}) => {
  const [activeJobType, setActiveJobType] = useState('full-time'); 
  const [activeCompanyType, setActiveCompanyType] = useState('all');
  // const fetchData = useCallback(async () => {
  //   try {
  //     const { data, errors } = await supabase
  //     .from('jobs')
  //       .select('*')
  //     return data;
  //     // console.log(jobs, error);
  //   } catch (errors) {
  //     console.log(errors);
      
  //   }
  // },[])
  // const {data:jobs,error,loading,reFetch} = useFetch({ fetchFunction: fetchData ,autoFetch: true})

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter((job) => {
      // console.log(job);
      const matchingJobType = job.job_type === activeJobType;
      const matchingCompanyType = job.company_type === activeCompanyType;
      // console.log(activeCompanyType);
      return activeCompanyType === "all" ? matchingJobType : matchingCompanyType && matchingJobType 
    })
  }, [jobs, activeCompanyType, activeJobType]);

  useEffect(() => {
  // console.log(filteredJobs);
  
},[filteredJobs])
  return (
      <div className='space-12'>
      <TableHeader />

      <button onClick={() => setActiveJobType("full-time")}>full time  </button>
      <button onClick={() => setActiveJobType("internship")}>Internship  </button>
      <button onClick={() => setActiveCompanyType("all")}>all  </button>
      <button onClick={() => setActiveCompanyType("tech")}>tech  </button>
      <button onClick={() => setActiveCompanyType("non-tech")}>non-tech  </button>
      
      </div>
  )
}
