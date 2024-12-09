import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query; // Get the user ID (address) from the query string

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { walletAddress: id }, // Assuming the user's address or ID is stored in the `walletAddress` field
      select: { username: true, hasAccess: true }, // Select both username and hasAccess fields
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
