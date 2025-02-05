import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type")?.trim();
  const genre = searchParams.get("genre")?.trim();
  const model = searchParams.get("model")?.trim();
  const isNew = searchParams.get("new")?.trim();
  const size = searchParams.get("size")?.trim();
  const etat = searchParams.get("etat")?.trim();
  const priceMin = searchParams.get("pricemin")?.trim();
  const priceMax = searchParams.get("pricemax")?.trim();
  const name = searchParams.get("name")?.trim();
  const souscategorie = searchParams.get("souscategorie")?.trim();

  console.log("Params:", params);
  console.log("Filters - Type:", type, "Genre:", genre, "Model:", model, "New:", isNew, "Size:", size, "État:", etat, "PriceMin:", priceMin, "PriceMax:", priceMax, "Name:", name);

  try {
    let filters = {
      ...(id !== "All" && { designer: id }), // Ignore designer filter if "All"
      ...(type === "Bag"
        ? { categorie: { in: ["HandBag", "Shoulder Bag"] } } // Specific case for type = "Bag"
        : type === "Clothe"
        ? { categorie: { in: ["Coat", "Jacket", "Suit"] } } // New case for type = "Clothe"
        : type && { categorie: type }), // Otherwise, filter normally by type
      ...(genre && genre !== "" && { genre }), 
      ...(souscategorie && souscategorie !== "" && { souscategorie }), 
      ...(model && { model }),
      ...(isNew && { new: isNew === "true" }),
      ...(size && { size }),
      ...(etat && { etat }),
      ...(priceMin && !isNaN(priceMin) && priceMax && !isNaN(priceMax) && { price: { gte: parseFloat(priceMin), lte: parseFloat(priceMax) } }),
      ...(priceMin && !isNaN(priceMin) && !priceMax && { price: { gte: parseFloat(priceMin) } }),
      ...(priceMax && !isNaN(priceMax) && !priceMin && { price: { lte: parseFloat(priceMax) } }),
      ...(name && name !== "All" && { name }),
    };
    

    console.log("Final Filters:", filters); // Debugging

    const products = await prisma.Product.findMany({
      where: filters,
    });

    if (!products.length) {
      return new Response(
        JSON.stringify({ error: 'Aucun produit trouvé.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(products), {
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
