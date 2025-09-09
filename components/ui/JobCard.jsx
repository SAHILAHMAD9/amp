import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const JobCard = ({job}) => {
  return (
      <Link
          href={job.application_link}
          target='_blank'
          className='w-[1080px] sm:w-full wrap-anywhere px-4 items-center grid grid-cols-8'>
          <div className='col-span-3 flex gap-4 py-4 '>
              <Image
                  width={40}
                  height={40}
                  src={job.company_logo_url}
                  alt={`${job.company_name} Logo`}
                  className="rounded-md"
              />
              <div>
                  <h1>{job.company_name}</h1>
                  <p>{job.location} - {job.season}</p>
              </div>
          </div>
          <div className='col-span-2 py-4'>
              <p className='inline'>{job.status} </p>
              <p>{job.clicks} peple clicked apply</p>
              <p>{job.updated_at} </p>
          </div>
          <div className='col-span-2 py-4'>
              <h1>{job.role}</h1>
          </div>
          <div className='col-span-1  py-4'>
              {job.visa_sponsor}
          </div>
      </Link>
  )
}
