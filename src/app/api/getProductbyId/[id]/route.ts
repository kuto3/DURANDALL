// /pages/api/getProductbyId/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;  // Utilisation de l'UUID directement
    console.log(params);
  try {
    const product = await prisma.Product.findUnique({
      where: { id: id },  // Pas de conversion en nombre, l'ID est un UUID
    });

    if (!product) {
      return new Response(
        JSON.stringify({ error: 'Produit non trouvé.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération du produit.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
