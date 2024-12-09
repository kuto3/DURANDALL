// pages/api/diplomas/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const diploma = await prisma.diploma.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!diploma) {
        return res.status(404).json({ error: 'Diplôme non trouvé.' });
      }

      res.status(200).json(diploma);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
}
