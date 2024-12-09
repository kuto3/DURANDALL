import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Assurez-vous que le contenu est JSON
      if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
        return res.status(400).json({ error: 'Content-Type must be application/json' });
      }

      // Extraire les données du corps de la requête
      const { title, description } = req.body;

      console.log('Received data:', { title, description });

      // Validation simple
      if (!title || !description) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
      }

      // Création du diplôme dans la base de données
      const diploma = await prisma.diploma.create({
        data: {
          title,
          description,
        },
      });

      // Réponse réussie
      res.status(201).json(diploma);
    } catch (error) {
      // Gérer les erreurs
      console.error('Erreur lors de la création du diplôme:', error);
      res.status(500).json({ error: 'Erreur lors de la création du diplôme.' });
    }
  } else if (req.method === 'GET') {
    try {
      // Récupération de tous les diplômes
      const diplomas = await prisma.diploma.findMany();
      console.log(diplomas);
      // Réponse réussie
      res.status(200).json(diplomas);
    } catch (error) {
      // Gérer les erreurs
      console.error('Erreur lors de la récupération des diplômes:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des diplômes.' });
    }
  } else {
    // Méthode HTTP non autorisée
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).json({ error: `Méthode ${req.method} non autorisée.` });
  }
}
