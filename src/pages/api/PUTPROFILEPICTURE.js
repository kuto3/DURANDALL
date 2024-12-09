import { IncomingForm } from 'formidable';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

// Disable body parsing to handle form-data requests
export const config = {
  api: {
    bodyParser: false,
  },
};

const JWT = process.env.PINATA_JWT;

// The handler receiving requests
const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = new IncomingForm({ keepExtensions: true });

  // Parse the incoming form-data
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing the form' });
    }

    const name = fields.name[0]; // Access the first item of the array
    const description = fields.description[0]; // Access the first item of the array
    const file = files.image[0]; // Access the first file in the array

    console.log("Received name:", name);
    console.log("Received description:", description);
    console.log("Received file:", file);

    // Check if the file exists
    if (!file || !file.filepath) {
      return res.status(400).json({ error: 'File not uploaded or file path is missing.' });
    }

    try {
      // 1. Upload the image to IPFS via Pinata directly from the request
      const formData = new FormData();
      const filePath = file.filepath; // Get the correct path

      // Log the file path to ensure it's correct
      console.log("File path to upload:", filePath);

      // Create a read stream from the file path
      formData.append('file', fs.createReadStream(filePath)); // Read directly from the filepath

      const imageUploadResponse = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
            ...formData.getHeaders(), // Ensure headers are included from formData
          },
        }
      );

      const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageUploadResponse.data.IpfsHash}`;
      console.log("Image uploaded to IPFS at:", imageUrl);

    
      // Send the response with the metadata URL
      res.status(200).json({ success: true, imageUrl });
    } catch (error) {
      console.error("Error during the process:", error);
      res.status(500).json({ error: 'An error occurred during the metadata publishing process.' });
    }
  });
};

export default handler;
