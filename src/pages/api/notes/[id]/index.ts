import prisma from "@/lib/prisma";
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).send({});

  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const note = await prisma.note.findFirst({
        // include: { author: true },
        where: {
          id: id.toString(),
          author: {
            id: session.id as string,
          },
        },
      });
      res.status(200).json(note);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    const { content, bookmarked, published } = req.body;
    const { id: noteId } = req.query;

    try {
      const updatedNote = await prisma.note.update({
        where: {
          id: noteId.toString(),
        },
        data: {
          content: content,
          bookmarked: bookmarked,
          published: published
        },
      });
      res.status(200).json(updatedNote);
    } catch (e) {
      console.error(e);
      return res.status(500);
    }
  } else if (req.method === "DELETE") {
    const { id: noteId } = req.query;
    try {
      await prisma.note.delete({
        where: {
          id: noteId.toString(),
        },
      });
      res.status(200).json({});
    } catch (e) {
      console.error(e);
      return res.status(500);
    }
  } else {
    res.status(404);
  }
};
