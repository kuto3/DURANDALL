import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Désactive le parsing automatique du corps de la requête
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Erreur lors du parsing du formulaire:', err);
        return res.status(500).json({ error: 'Erreur lors du parsing du formulaire.' });
      }

      const { title, description } = fields;

      // Validation simple
      if (!title || !description) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
      }

      try {
        const diploma = await prisma.diploma.create({
          data: {
            title,
            description,
          },
        });
        console.log('Diplôme créé:', diploma);

        res.status(201).json(diploma);
      } catch (error) {
        console.error('Erreur lors de la création du diplôme:', error.message);
        res.status(500).json({ error: 'Erreur lors de la création du diplôme.' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Méthode ${req.method} non autorisée.` });
  }
}
