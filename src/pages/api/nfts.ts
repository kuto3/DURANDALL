import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Récupérer tous les NFTs de la base de données
    const nfts = await prisma.nFT.findMany();

    res.status(200).json(nfts);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    res.status(500).json({ error: 'Error fetching NFTs' });
  } finally {
    await prisma.$disconnect();
  }
}
