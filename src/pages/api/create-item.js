import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, image } = req.body;

    try {
      const diploma = await prisma.diploma.create({
        data: {
          title,
          image,
        },
      });
      res.status(201).json(diploma);
    } catch (error) {
      console.error('An error occurred while creating the diploma:', error);
      res.status(500).json({ error: 'An error occurred while creating the diploma.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
