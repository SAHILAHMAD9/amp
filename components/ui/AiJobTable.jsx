"use client"
import React, { useMemo, useState } from 'react'
import { TableHeader } from './TableHeader'
import { AiFilterHeader } from './AiFilterHeader';
import { JobCard } from './JobCard';

const filterConfig = [
  {
    id: 'jobType',
    options: [
      { value: 'full-time', label: 'APM (Full-Time)'},
      { value: 'internship', label: 'Internship' },
    ],
  },
  {
    id: 'companyType',
    options: [
      { value: 'all', label: 'All' },
      { value: 'tech', label: 'Tech' },
      { value: 'non-tech', label: 'Non-Tech' },
    ],
  },
];

export const AiJobTable = ({ jobs }) => {
    const [filters, setFilters] = useState({
        jobType: 'full-time',
        companyType: 'all',
    });
  
  const filtersJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter((job) => {
      const jobTypeMatch = job.job_type === filters.jobType;
      const companyTypeMatch = filters.companyType === 'all' || job.company_type === filters.companyType;
      return jobTypeMatch && companyTypeMatch;
    })
  },[filters,jobs])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }))
  };


  return (
    <div className='p-4 gap-4 flex flex-col items-around justify-center space-12'>
      <AiFilterHeader activeFilters={filters} onChange={handleFilterChange} config={filterConfig}/>
      <div className='overflow-x-auto scroll-m-1'>
      <TableHeader />
      {filtersJobs.map((item) => (
        <JobCard job={item} key={item.id} />
      ))}
      </div>
    </div>
  )
}
