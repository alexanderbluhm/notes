import prisma from "@/lib/prisma";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const posts = await prisma.note.findMany({
        include: { author: true },
        orderBy: {
            createdAt: 'desc'
        }
      });
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    const { title, content, authorEmail } = req.body;
    try {
      const createdPost = await prisma.note.create({
        data: {
          title,
          content,
          author: {
            connect: {
              email: authorEmail,
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
