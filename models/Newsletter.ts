import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sampleIssue: { type: String, required: true },
  creator: { type: String, required: true },
  subscribers: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Newsletter ||
  mongoose.model("Newsletter", NewsletterSchema);
