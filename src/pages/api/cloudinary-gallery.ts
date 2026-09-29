import type { NextApiRequest, NextApiResponse } from "next";

import { getCuratedGalleryById } from "@/lib/gallery-catalog";

const PAGE_SIZE = 30;
const MAX_CURSOR_LENGTH = 2048;

interface CloudinaryResource {
  asset_id?: string;
  public_id?: string;
  secure_url?: string;
  width?: number;
  height?: number;
  format?: string;
  created_at?: string;
}

interface CloudinarySearchResponse {
  resources?: CloudinaryResource[];
  next_cursor?: string;
}

function firstQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const galleryId = firstQueryValue(req.query.gallery);
  const cursor = firstQueryValue(req.query.cursor);
  const gallery = galleryId ? getCuratedGalleryById(galleryId) : undefined;

  if (!gallery) {
    return res.status(400).json({ success: false, error: "Invalid gallery" });
  }

  if (cursor && cursor.length > MAX_CURSOR_LENGTH) {
    return res.status(400).json({ success: false, error: "Invalid pagination cursor" });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ success: false, error: "Gallery service is not configured" });
  }

  try {
    const body: Record<string, unknown> = {
      expression: `resource_type:image AND folder="${gallery.cloudinaryFolder}"`,
      sort_by: [{ created_at: "desc" }, { public_id: "desc" }],
      max_results: PAGE_SIZE,
    };
    if (cursor) body.next_cursor = cursor;

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/resources/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      console.error("Cloudinary gallery fetch failed:", response.status);
      return res.status(response.status === 429 ? 503 : 502).json({
        success: false,
        error: "The gallery is temporarily unavailable. Please try again.",
      });
    }

    const result = (await response.json()) as CloudinarySearchResponse;
    const data = (result.resources ?? []).flatMap((resource) => {
      if (!resource.public_id || !resource.secure_url) return [];
      return [{
        id: resource.asset_id || resource.public_id,
        publicId: resource.public_id,
        secureUrl: resource.secure_url,
        width: resource.width ?? 1,
        height: resource.height ?? 1,
        format: resource.format ?? "",
        createdAt: resource.created_at ?? "",
      }];
    });

    return res.status(200).json({
      success: true,
      data,
      nextCursor: result.next_cursor ?? null,
    });
  } catch (error) {
    console.error("Cloudinary gallery error:", error);
    return res.status(502).json({
      success: false,
      error: "The gallery is temporarily unavailable. Please try again.",
    });
  }
}
