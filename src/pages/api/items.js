// pages/api/items.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const items = await prisma.item.findMany({
      select: {
        id: true,  // Si vous voulez récupérer d'autres champs
        name: true,
      },
    });
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des items' });
  }
}
