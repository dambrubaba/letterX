import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import dbConnect from "../../../lib/dbConnect";
import Newsletter from "../../../models/Newsletter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const total = await Newsletter.countDocuments({});
        const newsletters = await Newsletter.find({})
          .sort({ subscribers: -1 })
          .skip(skip)
          .limit(limit);

        res.status(200).json({
          newsletters,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const session = await getSession(req, res);
        if (!session) {
          return res
            .status(401)
            .json({ success: false, message: "Not authenticated" });
        }
        const newsletter = await Newsletter.create({
          ...req.body,
          creator: session.user.sub,
        });
        res.status(201).json({ success: true, data: newsletter });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
