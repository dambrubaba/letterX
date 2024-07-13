import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import dbConnect from "../../../../lib/dbConnect";
import Newsletter from "../../../../models/Newsletter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const session = await getSession(req, res);
        if (!session) {
          return res
            .status(401)
            .json({ success: false, message: "Not authenticated" });
        }
        const { id } = req.query;
        const newsletter = await Newsletter.findByIdAndUpdate(
          id,
          { $addToSet: { subscribers: session.user.sub } },
          { new: true },
        );
        if (!newsletter) {
          return res
            .status(404)
            .json({ success: false, message: "Newsletter not found" });
        }
        res.status(200).json({ success: true, data: newsletter });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
