import { IncomingForm } from 'formidable';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

// Désactiver le parsing du corps pour gérer les requêtes form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

const JWT = process.env.JWT;

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const form = new IncomingForm({ keepExtensions: true });

  // Extract headers
  const headers = new Headers(req.headers);

  // Convert the request body to a readable stream
  const readable = Readable.from(req.body);

  return new Promise((resolve, reject) => {
    form.parse(readable, { headers }, async (err, fields, files) => {
      if (err) {
        return NextResponse.json({ error: 'Error parsing the form' }, { status: 500 });
      }

      try {
        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
        console.log(title);
        console.log(description);
        console.log(JWT);

        // Regrouper toutes les images
        const imageFiles = [
          files.logoImage,
          files.backgroundImage,
          files.wheelImage0,
          files.wheelImage1,
          files.wheelImage2,
          files.wheelImage3,
          files.wheelImage4,
          files.wheelImage5,
          files.wheelImage6,
          files.wheelImage7,
          files.wheelImage8,
          files.wheelImage9,
        ].filter(Boolean); // Éliminer les images non définies

        // Téléverser chaque image sur IPFS
        const imageUrls = [];
        for (const imageFile of imageFiles) {
          const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;
          if (file && file.filepath) {
            const formData = new FormData();
            formData.append('file', fs.createReadStream(file.filepath));

            const response = await axios.post(
              'https://api.pinata.cloud/pinning/pinFileToIPFS',
              formData,
              {
                headers: {
                  Authorization: `Bearer ${JWT}`,
                  ...formData.getHeaders(),
                },
              }
            );

            const imageUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
            console.log(`Image uploaded to IPFS: ${imageUrl}`);
            imageUrls.push(imageUrl);
          }
        }

        // Créer les métadonnées avec les URLs des images
        const metadata = {
          name: title,
          description,
          images: imageUrls, // Stocker toutes les URLs des images
        };

        console.log("Metadata to upload:", metadata);

        // Téléverser les métadonnées sur IPFS
        const metadataUploadResponse = await axios.post(
          'https://api.pinata.cloud/pinning/pinJSONToIPFS',
          metadata,
          {
            headers: {
              Authorization: `Bearer ${JWT}`,
            },
          }
        );

        const metadataUrl = `https://gateway.pinata.cloud/ipfs/${metadataUploadResponse.data.IpfsHash}`;
        console.log("Metadata uploaded to IPFS at:", metadataUrl);

        try {
          const slotMachine = await prisma.slotMachine.create({
            data: {
              url: metadataUrl,
            },
          });
          console.log("Slot machine record created in database:", slotMachine);

          // Envoyer la réponse avec les URI d'IPFS des images et des métadonnées
          return NextResponse.json({
            success: true,
            imageIpfsUris: imageUrls,
            metadataUrl,
            slotMachineId: slotMachine.id
          }, { status: 200 });
        } catch (dbError) {
          console.error("Error saving to database:", dbError);
          return NextResponse.json({ error: 'An error occurred while saving to the database.' }, { status: 500 });
        }

      } catch (error) {
        console.error("Error during the process:", error);
        return NextResponse.json({ error: 'An error occurred during the metadata publishing process.' }, { status: 500 });
      } finally {
        await prisma.$disconnect();
      }
    });
  });
}
