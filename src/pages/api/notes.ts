import prisma from "@/lib/prisma";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).send({});

  if (req.method === "GET") {
    try {
      const posts = await prisma.note.findMany({
        include: { author: true },
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
  } else {
    res.status(404);
  }
};
