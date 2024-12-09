import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    // Convertir l'id en entier
    const nftId = parseInt(id) + 1;

    if (isNaN(nftId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Récupérer le NFT en fonction de l'ID
    const nft = await prisma.nFT.findUnique({
      where: {
        id: nftId,
      },
    });

    if (!nft) {
      return res.status(404).json({ error: 'NFT not found' });
    }

    res.status(200).json(nft);
  } catch (error) {
    console.error('Error fetching NFT:', error);
    res.status(500).json({ error: 'Error fetching NFT' });
  }
}
