import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { walletAddress, email, username } = req.body;
  console.log("on a recu",walletAddress, email, username);
  if (req.method !== 'POST') {
    console.log('Received method:', req.method); 
    return res.status(405).json({ error: `${req.method}` });
  }


  // Vérification des champs requis
  if (!walletAddress || !email || !username) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        walletAddress,
        email,
        username,
        imageUrl: "/pic.jpg",
        hasAccess: true,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: `A user with this ${error.meta.target} already exists` });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });  // Always return valid JSON
  }
  
}

