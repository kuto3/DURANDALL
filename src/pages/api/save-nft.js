import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description, imageUrl, ownerAddress} = req.body;



    try {
      const nft = await prisma.nFT.create({
        data: {
          name,
          description,
          imageUrl,
          ownerAddress,
        },
      });
      res.status(201).json({ success: true, nft });
    } catch (error) {
      console.error('Error saving NFT:', error);
      res.status(500).json({ success: false, message: 'Failed to save NFT.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
