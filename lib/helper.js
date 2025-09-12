"use server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export const generateJobSummary = async ({ role, companyName, description }) => {
    if (!role || !companyName || !description) {
        return { error: "Job details are required." };
    }
    const prompt = `
    Analyze the following job opportunity.
    - Company: "${companyName}"
    - Role: "${role}"
    - Description: "${description}"

    Based on this, provide the following insights as a JSON object with the exact keys "summary", "reviewsSummary", "salaryExpectation", and "careerPath".

    1.  summary: A concise, 2-3 sentence summary of the role's main responsibilities.
    2.  reviewsSummary: A brief overview of the company's work culture, based on publicly known information and employee reviews.
    3.  salaryExpectation: An estimated annual salary range (e.g., "$110,000 - $140,000 USD") for this type of role at this company.
    4.  careerPath: A typical 3-5 year career path for someone starting in this position.
  `;

    try {
        const rslt = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are a senior, experienced product manager with high tech knowledge having skills in (web2 , web3, cyber security , genrativeAI) and career consultant. You provide concise, insightful, and realistic advice about companies, job roles, and career paths based on publicly available data.",
                thinkingConfig: {
                    thinkingBudget : 1 ,
                }
            }
        })
        const respText = rslt.text.replace(/```json|```/g, "").trim();
        const repsJson = JSON.parse(respText);
        // console.log(repsJson);

        return { success: true, data: repsJson };

    } catch (error) {
        console.error("AI generation error:", error);
        return { error: "Failed to generate AI insights." };
    }
}