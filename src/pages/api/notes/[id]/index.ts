import prisma from "@/lib/prisma";
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const note = await prisma.note.findFirst({
        // include: { author: true },
        where: {
          id: id.toString(),
        },
      });

      // if the note is published everyone can read it
      if (note.published) return res.status(200).json(note);

      // else check if the current user is the user that created the note
      if (session && session.id && note.authorId === session.id) return res.status(200).json(note);

      // if the note is not published and other than the creator wants access we return a 401
      return res.status(401).send({});
      
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    if (!session) return res.status(401).send({});
    const { content, bookmarked, published } = req.body;
    const { id: noteId } = req.query;
    try {
      const updatedNote = await prisma.note.updateMany({
        where: {
          id: noteId.toString(),
          author: {
            id: session.id as string,
          },
        },
        data: {
          content: content,
          bookmarked: bookmarked,
          published: published,
        },
      });
      res.status(200).json(updatedNote);
    } catch (e) {
      console.error(e);
      return res.status(500);
    }
  } else if (req.method === "DELETE") {
    if (!session) return res.status(401).send({});
    const { id: noteId } = req.query;
    try {
      await prisma.note.deleteMany({
        where: {
          id: noteId.toString(),
          author: {
            id: session.id as string,
          },
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
