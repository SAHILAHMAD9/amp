"use client";
import { Sparkle, LoaderCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { generateJobSummary } from '@/lib/helper';
import { useFetch } from '@/hooks/useFetch';
import { useEffect } from 'react';

export const AiSummaryButton = ({ job, setData }) => {
    const { data,error, loading, reFetch } = useFetch({
        fetchFunction: () => generateJobSummary({
            role: job.role,
            companyName: job.company_name,
            description: `Job Type: ${job.job_type}, Location: ${job.location}`
        }), autoFetch: false
    })

    useEffect(() => {
        if (data) {
            setData(data);
        }
    }, [data, setData]);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button onClick={reFetch} className="p-1 rounded-full hover:bg-emerald-100 transition-colors">
                    {loading ? (
                        <LoaderCircle className="w-5 h-5 text-emerald-600 animate-spin" />
                    ) : (
                        <Sparkle className='w-5 h-5 text-emerald-600' />
                    )}
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Summarize this job with AI</p>
            </TooltipContent>
        </Tooltip>
    );
};