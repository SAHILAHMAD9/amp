"use client"
import React, { useState } from "react";
const faqs = [
    {
        question: "What is the purpose of this career platform?",
        answer:
            "This platform is a dedicated resource for individuals seeking associate product manager roles, internships, and structured programs at leading companies. We meticulously gather and present opportunities tailored for students and recent graduates from top-tier employers globally, ensuring you have access to competitive product management positions.",
    },
    {
        question: "How can I receive updates on new APM opportunities?",
        answer:
            "To stay informed about the latest APM programs, internships, and product manager job openings that match your career interests, you can sign up for personalized email notifications. Our premium option provides instant alerts, while the free plan offers weekly summaries.",
    },
    {
        question: "Why is timely access to APM programs and internships critical?",
        answer:
            "Many highly sought-after APM programs have brief application windows, often closing within 3 to 14 days, and attract thousands of applicants. Missing these limited periods can mean a year-long wait or completely missing an opportunity with a specific company.",
    },
    {
        question: "What distinguishes an Associate Product Manager from a Product Manager?",
        answer:
            "An Associate Product Manager (APM) role is typically a structured, often rotational, entry-level position designed for new graduates or those early in their careers. A Product Manager (PM) usually has more experience and is responsible for product strategy, roadmap development, and execution.",
    },
    {
        question: "What is the typical hiring timeline for APM positions?",
        answer:
            "Hiring schedules vary by organization. Many major technology companies open their APM applications between August and October, whereas startups may conduct their recruiting drives in the spring months.",
    },
    {
        question: "How can someone secure an Associate Product Manager role without prior experience?",
        answer:
            "Many APM programs are specifically structured for new graduates and do not require previous full-time PM experience. To enhance your candidacy: develop transferable skills through internships, master core product management principles, and rigorously prepare for APM interviews with practice sessions.",
    },
    {
        question: "Which organizations offer Associate Product Manager programs?",
        answer:
            "Prominent APM programs are available at companies such as Google, Meta, Microsoft, Uber, LinkedIn, Salesforce, Intuit, DoorDash, and Instacart. These programs typically recruit annually and admit a limited number of candidates.",
    },
    {
        question: "What core competencies are sought in APM programs?",
        answer:
            "Recruiters actively seek candidates demonstrating strong problem-solving, analytical thinking, and communication abilities, alongside a genuine user-centric approach. Any familiarity with product design, engineering fundamentals, SQL, or Figma is considered a valuable asset.",
    },
    {
        question: "What is the estimated average salary for an Associate Product Manager?",
        answer:
            "In the United States, annual salaries for APM roles generally range from $100,000 to over $220,000 (encompassing base salary, bonuses, and stock options), positioning them among the most lucrative entry-level opportunities for recent graduates.",
    },
    {
        question: "Are remote Associate Product Manager positions available?",
        answer:
            "Yes, remote APM opportunities are becoming increasingly common, particularly within startups and fully distributed companies. However, in-person roles can sometimes offer more robust learning and mentorship experiences during early career stages.",
    },
    {
        question: "How competitive are Associate Product Manager programs?",
        answer:
            "They are exceedingly competitive—top-tier programs often receive thousands of applications for fewer than 50 available spots. Exceptional academic records, relevant internships, leadership involvement, and meticulously crafted applications are essential for success.",
    },
    {
        question: "What is the best way to prepare for an APM interview?",
        answer:
            "Thorough preparation should encompass product sense, analytical problem-solving, behavioral questions, and case study analyses. Engaging in mock interviews and practicing established frameworks can significantly help you distinguish yourself.",
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
        <div id="faq-section" className="py-16 scroll-mt-1 px-2 text-wrap bg-slate-50">
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
