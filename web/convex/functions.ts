import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const saveProposal = mutation({
  args: { jobTitle: v.string(), jobDescription: v.string(), yourSkills: v.string(), coverLetter: v.string(), keyPoints: v.array(v.string()), estimatedBid: v.string() },
  handler: async (ctx, args) => await ctx.db.insert("proposals", { ...args, createdAt: Date.now() }),
});
export const getRecent = query({ args: {}, handler: async (ctx) => await ctx.db.query("proposals").order("desc").take(20) });
export const getStatus = query({ args: {}, handler: async () => ({ status: "Online", timestamp: Date.now() }) });
