import { NextApiRequest, NextApiResponse } from 'next';

// For Pages Router (pages/api/cloudinary-images.ts)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return res.status(500).json({ 
        error: 'Missing Cloudinary configuration' 
      });
    }

    // Fetch images from the prenup folder
    // Fetch from Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          expression: "folder:prenup/*",
          sort_by: [{ created_at: "desc" }],
          max_results: 100,
        }),
      },
    )
    
    if (!response.ok) {
      throw new Error(`Cloudinary API error: ${response.status}`);
    }

    const data = await response.json();

    // Sort images by created_at date (newest first) or by public_id for consistent order
    const sortedResources = data.resources.sort((a: any, b: any) => {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

    res.status(200).json({
      resources: sortedResources,
      total: data.resources.length,
    });

  } catch (error) {
    console.error('Error fetching Cloudinary images:', error);
    res.status(500).json({ 
      error: 'Failed to fetch images from Cloudinary' 
    });
  }
}