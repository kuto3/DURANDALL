import { PrismaClient } from '@prisma/client';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Disable body parsing (required for formidable)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'public/uploads'), // Directory to save uploaded files
    keepExtensions: true, // Keep the original file extension
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ error: 'Error parsing the form' });
    }

    try {
      const { id, email, username } = fields;
      let profileImage = fields.profileImage || null;

      console.log("Updating user with ID:", id);
      console.log("Profile Image URL:", profileImage);

      // Update the user profile in the database
      const updatedUser = await prisma.user.update({
        where: { walletAddress: String(id) },
        data: {
          email: email || undefined, // Update email only if provided
          username: username ? String(username) : undefined, // Convert username to string if provided
          imageUrl: profileImage ? String(profileImage) : undefined, // Update the image URL only if provided
        },
      });

      res.status(200).json({ user: updatedUser });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Error updating the profile' });
    }
  });
}
