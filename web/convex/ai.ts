import { action } from "./_generated/server";
import { v } from "convex/values";
export const generateProposal = action({
    args: { jobTitle: v.string(), jobDescription: v.string(), yourSkills: v.string() },
    handler: async (_ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new Error("OPENAI_API_KEY not configured");
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-4o", messages: [
                    {
                        role: "system", content: `You are FreelanceBot, an expert at writing winning freelance proposals for Upwork/Fiverr/Freelancer. Write proposals that stand out, are personalized to the job, and highlight relevant skills. Output JSON:
{"coverLetter":"<compelling proposal>","keyPoints":["key differentiator 1","2","3"],"estimatedBid":"<suggested hourly/fixed rate>"}` },
                    { role: "user", content: `Job Title: ${args.jobTitle}\nJob Description: ${args.jobDescription}\nMy Skills: ${args.yourSkills}` },
                ], temperature: 0.7, max_tokens: 2000, response_format: { type: "json_object" }
            }),
        });
        if (!r.ok) throw new Error(`API error`);
        return JSON.parse((await r.json() as any).choices?.[0]?.message?.content ?? "{}");
    },
});
