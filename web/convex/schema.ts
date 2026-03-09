import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
export default defineSchema({
  ...authTables,
  proposals: defineTable({
    jobTitle: v.string(), jobDescription: v.string(), yourSkills: v.string(),
    coverLetter: v.string(), keyPoints: v.array(v.string()), estimatedBid: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
