import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

const GUEST_PHOTOS_FOLDER = "marvin-jovelyn-wedding/guest-photos";

type SignatureResponse =
  | {
      success: true;
      data: {
        apiKey: string;
        cloudName: string;
        folder: string;
        signature: string;
        timestamp: number;
      };
    }
  | {
      success: false;
      error: string;
    };

function createCloudinarySignature(params: Record<string, string | number>, apiSecret: string) {
  const paramsToSign = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return crypto.createHash("sha1").update(`${paramsToSign}${apiSecret}`).digest("hex");
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignatureResponse>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({
      success: false,
      error: "Missing Cloudinary configuration",
    });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const signature = createCloudinarySignature(
    {
      folder: GUEST_PHOTOS_FOLDER,
      timestamp,
    },
    apiSecret,
  );

  return res.status(200).json({
    success: true,
    data: {
      apiKey,
      cloudName,
      folder: GUEST_PHOTOS_FOLDER,
      signature,
      timestamp,
    },
  });
}
