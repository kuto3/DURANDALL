import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { walletAddress, name, description, ipfsUri } = req.body;

    // Validation simple
    if (!walletAddress || !name || !description || !ipfsUri) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Créer un nouvel utilisateur
    const user = await prisma.nFT.create({
      data: {
        name,
        description,
        metadataUri: ipfsUri,
        ownerAddress: walletAddress,
      },
    });

    return res.status(201).json({ user });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
