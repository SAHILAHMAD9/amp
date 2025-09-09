"use client"
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What is APM Season?",
        answer:
            "APM Season is the leading platform for discovering associate product manager jobs, internships, and programs at top companies. We hand-curate opportunities for students and recent grads from the best employers in the world, so you never miss a chance to apply for competitive roles in product management.",
    },
    {
        question: "How can I stay up to date with APM opportunities?",
        answer:
            "Sign up for personalized email alerts to receive notifications about the latest APM programs, internships, and product manager jobs that match your interests. You can select our APM Season Premium Plan to get immediate reminders or our free plan to get weekly reminders.",
    },
    {
        question: "Why is it important to stay updated with APM programs and internships?",
        answer:
            "Most competitive APM programs are only open for 3–14 days before closing and there can be thousands of applicants. Missing the window can mean waiting an entire year or missing a company altogether.",
    },
    {
        question: "What is the difference between an APM and a PM?",
        answer:
            "An Associate Product Manager (APM) is typically a more structured (often rotational) entry-level role designed for recent graduates or early-career professionals. Product Managers (PMs) are more experienced and own product strategy, roadmap, and execution.",
    },
    {
        question: "What is the typical recruiting timeline for APM roles?",
        answer:
            "Timelines vary by company. Many big tech APM programs open applications between August and October, while startups may recruit in the spring.",
    },
    {
        question: "How do I get an Associate Product Manager job with no experience?",
        answer:
            "Many APM programs are designed for new grads and don’t require prior full-time PM experience. To improve your chances: gain transferable skills through internships, learn PM fundamentals, and prepare for APM interviews with mock practice.",
    },
    {
        question: "Which companies offer Associate Product Manager programs?",
        answer:
            "Top APM programs are offered by companies such as Google, Meta, Microsoft, Uber, LinkedIn, Salesforce, Intuit, DoorDash, and Instacart. These programs often recruit once per year and have limited cohort sizes.",
    },
    {
        question: "What skills do APM programs look for?",
        answer:
            "Recruiters look for problem-solving, analytical, and communication skills, plus a user-focused mindset. Familiarity with product design, engineering foundations, SQL, or Figma is a plus.",
    },
    {
        question: "What is the average salary for an Associate Product Manager?",
        answer:
            "In the U.S., APM salaries range from $100,000 to $220,000+ (base + bonuses + stock), making them some of the best-paying opportunities for new graduates.",
    },
    {
        question: "Are there remote Associate Product Manager jobs?",
        answer:
            "Yes. Remote APM roles are becoming more common, especially at startups and fully distributed companies. However, in-person roles can sometimes provide stronger early-career learning.",
    },
    {
        question: "How competitive are APM programs?",
        answer:
            "Extremely competitive—top programs receive thousands of applications for fewer than 50 spots. Strong academics, internships, leadership experience, and polished applications are critical.",
    },
    {
        question: "How should I prepare for an APM interview?",
        answer:
            "Preparation should cover product sense, analytical problem solving, behavioral questions, and case studies. Mock interviews and practicing frameworks can help you stand out.",
    },
];

export const FAQAccordion =() => {
    const [openIndex, setOpenIndex] = useState(Array(faqs.length).fill(null));

    const clickedHandler = (index) => {
        setOpenIndex((prev) =>
            prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
        );
        };

    return (
        <div className="py-16 px-2 text-wrap bg-slate-50">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-md shadow-md ">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="md:px-6 px-2 border-b last:border-b-0 border-gray-200"
                    >
                        <button
                            onClick={() => clickedHandler(index)}
                            className="w-full flex justify-between items-center py-5 text-left"
                        >
                            <h1 className="text-lg font-medium text-gray-800">
                                {faq.question}
                            </h1>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-5 h-5 text-emerald-500 transition-transform duration-300 ${openIndex[index] ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {openIndex[index] && (
                            <div className="pb-5 text-base leading-relaxed">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
