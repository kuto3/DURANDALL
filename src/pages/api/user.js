// Exemple d'API pour rechercher des utilisateurs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { searchQuery } = req.query;

  if (!searchQuery) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: searchQuery, mode: 'insensitive' } },
          { walletAddress: { contains: searchQuery, mode: 'insensitive' } }
        ]
      }
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
  }
}
