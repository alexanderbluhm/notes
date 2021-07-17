import prisma from "@/lib/prisma";
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).send({});

  if (req.method === "GET") {
    try {
      const posts = await prisma.note.findMany({
        // include: { author: true },
        orderBy: {
          createdAt: "desc",
        },
        where: {
          author: {
            id: session.id as string,
          },
        },
      });
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    const { title } = req.body;
    try {
      const createdPost = await prisma.note.create({
        data: {
          title,
          author: {
            connect: {
              id: session.id as string,
            },
          },
        },
      });
      res.status(200).json(createdPost);
    } catch (e) {
      console.error(e);
      return res.status(500);
    }
  } else if (req.method == "PUT") {
    const { id: noteId, bookmarked } = req.body;
    console.log("Update " + JSON.stringify(req.body));

    try {
      const updatedPost = await prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          bookmarked: bookmarked,
        },
      });
      res.status(200).json(updatedPost);
    } catch (e) {
      console.error(e);
      return res.status(500);
    }
  } else {
    res.status(404);
  }
};
