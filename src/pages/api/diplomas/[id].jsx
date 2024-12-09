import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      // Récupérer un diplôme spécifique par son ID
      const diploma = await prisma.diploma.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!diploma) {
        return res.status(404).json({ error: 'Diplôme non trouvé.' });
      }

      res.status(200).json(diploma);

    } else if (req.method === 'DELETE') {
      // Supprimer un diplôme par son ID
      const deletedDiploma = await prisma.diploma.delete({
        where: { id: parseInt(id, 10) },
      });

      res.status(200).json({ message: 'Diplôme supprimé avec succès.', diploma: deletedDiploma });

    } else if (req.method === 'PUT') {
      // Mettre à jour un diplôme par son ID
      const { title, description, imageUrl } = req.body;

      const updatedDiploma = await prisma.diploma.update({
        where: { id: parseInt(id, 10) },
        data: {
          title,
          description,
          imageUrl,
        },
      });

      res.status(200).json(updatedDiploma);

    } else {
      // Si la méthode HTTP n'est pas prise en charge, on renvoie une erreur
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erreur lors du traitement de la requête:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
}
