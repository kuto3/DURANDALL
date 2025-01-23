import { Readable } from 'stream';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Désactiver l'analyse du body par Next.js
  },
};

export async function POST(req) {
  const form = formidable({ multiples: true });

  // Convertir le `req` moderne en flux Node.js
  const stream = Readable.from(req.body);

  return new Promise((resolve, reject) => {
    form.parse(stream, (err, fields, files) => {
      if (err) {
        reject(
          new Response(JSON.stringify({ error: 'Error parsing form data' }), {
            status: 500,
          })
        );
        return;
      }

      resolve(
        new Response(
          JSON.stringify({
            fields, // Contient les données texte
            files, // Contient les fichiers envoyés
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      );
    });
  });
}
