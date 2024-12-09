// pages/api/getDiplomas.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const diplomas = await prisma.diploma.findMany();
      res.status(200).json(diplomas);
    } catch (error) {
      console.error('Error retrieving diplomas:', error);
      res.status(500).json({ error: 'Error retrieving diplomas' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
