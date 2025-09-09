import React, { act, useState } from 'react'

export const MyFilterHeader = ({ setActiveJobType, setActiveCompanyType }) => {
    const [jobTab, setJobTab] = useState("full-time");
    const [companyType, setCompanyType] = useState("all");
    const activeClasses = 'bg-emerald-600 text-white';
    const inactiveClasses = 'bg-white text-gray-700 hover:bg-gray-200';

    const jobTypeHandler = (action) => {
        setActiveJobType(action);
        setJobTab(action);
    }

    const companyTypeHandler = (action) => {
        setActiveCompanyType(action);
        setCompanyType(action);
    } 

  return (
      <div className='w-full flex justify-between'>
          <div className='flex space-x-2 justify-between'>
              <div className='rounded-md border-1 overflow-hidden'>
                  <button onClick={() => jobTypeHandler("full-time")} className={`h-10 px-4 py-2 ${jobTab === "full-time" ? activeClasses : inactiveClasses}`}>Full Time</button>
                  <button onClick={() => jobTypeHandler("internship")} className={`h-10 px-4 py-2 ${jobTab === "internship" ? activeClasses : inactiveClasses}`}>Internship</button>
              </div>
              <div className='rounded-md border-1 overflow-hidden'>
                  <button onClick={() => companyTypeHandler("all")} className={`h-10 px-4 py-2 ${companyType === "all" ? activeClasses : inactiveClasses}`}>All</button>
                  <button onClick={() => companyTypeHandler("tech")} className={`h-10 px-4 py-2 ${companyType === "tech" ? activeClasses : inactiveClasses}`}>Tech</button>
                  <button onClick={() => companyTypeHandler("non-tech")} className={`h-10 px-4 py-2 ${companyType === "non-tech" ? activeClasses : inactiveClasses}`}>Non Tech</button>
              </div>
          </div>
<p>last date</p>
          
    </div>
  )
}
