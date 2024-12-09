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

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing the form' });
    }

    const title = fields.name;
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
    const ethAddress = Array.isArray(fields.ethAddress) ? fields.ethAddress[0] : fields.ethAddress;
    const ethAddress2 = Array.isArray(fields.ethAddress2) ? fields.ethAddress2[0] : fields.ethAddress2;
    const file = Array.isArray(files.image) ? files.image[0] : files.image;

    console.log("Received title:", title);
    console.log("Received description:", description);
    console.log("Received file:", file);

    if (!file || !file.filepath) {
      return res.status(400).json({ error: 'File not uploaded or file path is missing.' });
    }

    try {
      // 1. Upload the image to IPFS via Pinata
      const formData = new FormData();
      const filePath = file.filepath;

      console.log("File path to upload:", filePath);

      formData.append('file', fs.createReadStream(filePath));

      const imageUploadResponse = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
            ...formData.getHeaders(),
          },
        }
      );

      const imageUrl = `https://gateway.pinata.cloud/ipfs/${ await imageUploadResponse.data.IpfsHash}`;
      console.log("Image uploaded to IPFS at:", imageUrl);

      // 2. Create metadata with the image URL
      const metadata = {
        name: await title,
        description: description,
        image: imageUrl,
        ethAddress2: ethAddress2,
      };

      console.log("Metadata to upload:", metadata); // Debugging the metadata object

      // 3. Upload metadata to IPFS
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

      // Send the response with the image IPFS URI
      res.status(200).json({ success: true, imageIpfsUri: imageUrl, metadataUrl });
    } catch (error) {
      console.error("Error during the process:", error);
      res.status(500).json({ error: 'An error occurred during the metadata publishing process.' });
    }
  });
};

export default handler;
