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
          id: parseInt(id.toString()),
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
    const { content, bookmarked } = req.body;
    const { id: noteId } = req.query;

    try {
      const updatedNote = await prisma.note.update({
        where: {
          id: parseInt(noteId.toString()),
        },
        data: {
          content: content,
          bookmarked: bookmarked,
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
          id: parseInt(noteId.toString()),
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
