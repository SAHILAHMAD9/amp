"use client"
import React, { useEffect, useState , useMemo, useCallback} from 'react'
import { TableHeader } from './TableHeader'
import { MyFilterHeader } from './MyFilterHeader';
import { JobCard } from './JobCard';

export const MyJobTable = ({jobs}) => {
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
  
  return (
    <div className='w-[1080px] m-9  overflow-auto space-12'>
      <TableHeader />
      <MyFilterHeader setActiveCompanyType={setActiveCompanyType} setActiveJobType={setActiveJobType}/>
      {filteredJobs.map((item) => (
        <JobCard job={item} key={item.id}/>
       ))}
      </div>
  )
}
