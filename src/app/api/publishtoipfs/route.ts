import { IncomingForm } from 'formidable';
import fs from 'fs/promises';
import axios from 'axios';
import FormData from 'form-data';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const JWT = process.env.JWT;
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const form = new IncomingForm({ keepExtensions: true });

  try {
    const formData = await request.formData(); // Use Next.js's formData method
    
    // Convert FormData to a format that IncomingForm can parse
    const body = new Map();
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // For files, we need to deal with them differently
        body.set(key, {
          filepath: await value.arrayBuffer(), // We'll use this later
          originalFilename: value.name,
          mimetype: value.type,
        });
      } else {
        // For other fields
        body.set(key, value);
      }
    }
    
    // Mock the IncomingForm.parse behavior
    const fields = {};
    const files = {};
    for (const [key, value] of body.entries()) {
      if (value.filepath) {
        files[key] = [{ 
          filepath: value.filepath, 
          originalFilename: value.originalFilename, 
          mimetype: value.mimetype 
        }];
      } else {
        fields[key] = value;
      }
    }

    const title = fields.title || '';
    const description = fields.description || '';
    console.log(title);
    console.log(description);
    console.log(JWT);

    // Group all images
    const imageFiles = [
      files.logoImage?.[0],
      files.backgroundImage?.[0],
      ...Array(10).fill().map((_, i) => files[`wheelImage${i}`]?.[0])
    ].filter(Boolean);

    // Upload each image to IPFS
    const imageUrls = [];
    for (const imageFile of imageFiles) {
      if (imageFile && imageFile.filepath) {
        const ipfsFormData = new FormData();
        ipfsFormData.append('file', Buffer.from(imageFile.filepath), {
          filename: imageFile.originalFilename,
          contentType: imageFile.mimetype
        });

        const response = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          ipfsFormData,
          {
            headers: {
              Authorization: `Bearer ${JWT}`,
              ...ipfsFormData.getHeaders()
            },
          }
        );

        const imageUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log(`Image uploaded to IPFS: ${imageUrl}`);
        imageUrls.push(imageUrl);
      }
    }

    // Create metadata with image URLs
    const metadata = {
      name: title,
      description,
      images: imageUrls,
    };

    console.log("Metadata to upload:", metadata);

    // Upload metadata to IPFS
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

    // Save to database
    const slotMachine = await prisma.slotMachine.create({
      data: {
        url: metadataUrl,
      },
    });
    console.log("Slot machine record created in database:", slotMachine);

    // Send response
    return NextResponse.json({ 
      success: true, 
      imageIpfsUris: imageUrls, 
      metadataUrl,
      slotMachineId: slotMachine.id 
    }, { status: 200 });

  } catch (error) {
    console.error("Error during the process:", error);
    return NextResponse.json({ error: error.message || 'An error occurred during the metadata publishing process.' }, { status: 500 });
  }
}