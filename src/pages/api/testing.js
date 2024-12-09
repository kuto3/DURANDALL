import { PrismaClient } from '@prisma/client';
import { IncomingForm } from 'formidable';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to handle file uploads manually
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.status(500).json({ error: 'Error parsing the request' });
        return;
      }

      console.log('Received fields:', fields);

      const { title, description, ipfsUri, ethAddress, ethAddress2, network } = fields;

      try {
        const diploma = await prisma.diploma.create({
          data: {
            title,
            description,
            ipfsUri,
            ethAddress,
            ethAddress2,
            imageUrl: network,
          },
        });

        res.status(201).json(diploma);
      } catch (error) {
        console.error('Error creating diploma:', error);
        res.status(500).json({ error: 'Failed to create diploma' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
