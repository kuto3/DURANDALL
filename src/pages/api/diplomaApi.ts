import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  if (typeof address !== 'string') {
    return res.status(400).json({ error: 'Invalid address' });
  }

  try {
    const diplomas  = await prisma.diploma.findMany({
      select: {
        ethAddress : true, // Sélectionne uniquement le champ ethAddress2
      },
    });
    console.log(diplomas);
    res.status(200).json(diplomas);
  } catch (error) {
    console.error('Error fetching diplomas:', error);
    res.status(500).json({ error: 'Error fetching diplomas' });
  }
}
