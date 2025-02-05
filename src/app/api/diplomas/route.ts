import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Named export for GET request
export async function GET(req: Request) {
  try {
    // Récupération de tous les slotmachines
    const product = await prisma.Product.findMany();
    console.log(product);
    // Réponse réussie
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Gérer les erreurs
    console.error('Erreur lors de la récupération des slotmachines:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération des slotmachines.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Named export for POST request (if needed in the future)
export async function POST(req: Request) {
  // Your POST logic here
  return new Response('POST request handling');
}
