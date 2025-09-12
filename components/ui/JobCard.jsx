"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiSummaryButton } from './AisummaryButton'
import { Check, X } from 'lucide-react'
import { StatusTag } from './tooltip'

export const JobCard = ({ job }) => {
    const [data, setdata] = useState({});

    return (
        <div className='w-[1080px] sm:w-full wrap-anywhere'>
            <div className='flex items-center'>
                <AiSummaryButton setData={setdata} job={job} />
                <Link
                    href={job.application_link}
                    target='_blank'
                    className='px-2 w-full items-center grid grid-cols-8'>
                    <div className='col-span-3 flex gap-4 py-4 '>
                        <Image
                            width={40}
                            height={40}
                            src={job.company_logo_url}
                            alt={`${job.company_name} Logo`}
                            className="rounded-md"
                        />
                        <div>
                            <h1 className='font-medium text-base'>{job.company_name}</h1>
                            <p className='text-sm text-gray-500'>{job.location} - {job.season}</p>
                        </div>
                    </div>
                    <div className='col-span-2 py-4'>
                        <StatusTag status={job.status}/>
                        <p className='text-sm text-gray-500 mt-1'>{job.clicks} peple clicked apply</p>
                        <p className='text-sm text-gray-500'>{job.updated_at} </p>
                    </div>
                    <div className='col-span-2 py-4'>
                        <h1>{job.role}</h1>
                    </div>
                    <div className='col-span-1 flex justify-center items-center py-4'>
                        {job.visa_sponsor && job.visa_sponsor === 'yes' && (<Check className='text-green-700' />)}
                        {job.visa_sponsor && job.visa_sponsor === 'no' && (<X className='text-red-500 ' />)}
                        {job.visa_sponsor && job.visa_sponsor === 'unsure' && ("?")}
                    </div>
                </Link>

            </div>
            {data && data.success && (
                <div className="p-4 text-sm bg-emerald-50 text-emerald-900 border rounded-md border-emerald-200">
                    <h4 className="font-bold">AI Summary:</h4>
                    <p className="mt-1">{data.data.summary}</p>
                    <p className="mt-1"><span className='font-bold'>About the company -</span> {data.data.reviewsSummary}</p>
                    <p className="mt-1"><span className='font-bold'>Carrer Path -</span> {data.data.careerPath}</p>
                    <p className="mt-1"><span className='font-bold'>Salary Range -</span> {data.data.salaryExpectation}</p>
                    <div className='p-1 mt-2 inline-flex  items-center justify-center text-sm bg-yellow-100 text-red-500 border rounded-md border-yellow-400'>
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                        This is an Ai Generated Response ,Ai can make mistakes.
                    </div>
                </div>)}
        </div>
    )
}
