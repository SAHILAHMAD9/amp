"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, X } from 'lucide-react';
import { AiSummaryButton } from './AisummaryButton';
import { StatusTag } from './tooltip';
import { trackJobClick } from '@/lib/helper';

export const JobCard = ({ job }) => {
    const [aiResponse, setAiResponse] = useState({}); 

    const handleApplyClick = async () => {
        await trackJobClick(job.id);

        if (job.application_link) {
            window.open(job.application_link, '_blank');
        }
    };

    // Date().
    let datess = job.updated_at.toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })
    console.log(datess);
    
    return (
        <div className='border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-100'>
            <div className='flex items-center text-gray-900'> 
                <div className="flex-shrink-0 p-4"> 
                    <AiSummaryButton setData={setAiResponse} job={job} />
                </div>
                <button
                    onClick={handleApplyClick}
                    className='flex-grow grid grid-cols-1 md:grid-cols-8 items-center px-2 py-4 no-underline text-black'
                >
                    <div className='col-span-full md:col-span-3 flex gap-3 items-center'>
                        <Image
                            width={40}
                            height={40}
                            src={job.company_logo_url}
                            alt={`${job.company_name} Logo`}
                            className="rounded-md flex-shrink-0"
                        />
                        <div className="flex flex-col">
                            <h1 className='font-medium text-base'>{job.company_name}</h1>
                            <p className='text-sm text-gray-500'>{job.location} - {job.season}</p>
                        </div>
                    </div>

                    <div className='col-span-full md:col-span-2 mt-2 md:mt-0 flex flex-col md:block'>
                        <StatusTag status={job.status} />
                        <p className='text-sm text-gray-500 mt-1'>{job.clicks} people clicked apply
                        </p>
                        <p className='text-sm text-gray-500 mt-1'>
                            {job.updated_at}
                        </p>
                    </div>

                    <div className='col-span-full md:col-span-2 mt-2 md:mt-0'>
                        <h1 className='font-medium text-base'>{job.role}</h1>
                    </div>

                    <div className='col-span-full md:col-span-1 mt-2 md:mt-0 flex justify-start md:justify-center items-center'>
                        {job.visa_sponsor === 'yes' && (<Check className='text-green-700 w-5 h-5' />)}
                        {job.visa_sponsor === 'no' && (<X className='text-red-500 w-5 h-5' />)}
                        {job.visa_sponsor === 'unsure' && (<span className="text-gray-500 text-lg font-bold">?</span>)}
                    </div>
                </button>
            </div>

            {aiResponse && aiResponse.success && (
                <div className="p-4 text-sm bg-emerald-50 text-emerald-900 border-t border-emerald-200">
                    <h4 className="font-bold">AI Summary:</h4>
                    <p className="mt-1">{aiResponse.data.summary}</p>
                    {aiResponse.data.reviewsSummary && <p className="mt-2"><span className='font-bold'>Company Culture:</span> {aiResponse.data.reviewsSummary}</p>}
                    {aiResponse.data.careerPath && <p className="mt-2"><span className='font-bold'>Career Path:</span> {aiResponse.data.careerPath}</p>}
                    {aiResponse.data.salaryExpectation && <p className="mt-2"><span className='font-bold'>Salary Range:</span> {aiResponse.data.salaryExpectation}</p>}

                    <div className='p-1 mt-3 inline-flex items-center justify-center text-xs bg-yellow-100 text-red-500 border rounded-md border-yellow-400'>
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                        This is an AI Generated Response, AI can make mistakes.
                    </div>
                </div>
            )}
        </div>
    );
};