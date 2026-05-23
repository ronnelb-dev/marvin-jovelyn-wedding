import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const MAX_UPLOADER_NAME_LENGTH = 120;

interface GuestPhoto {
  id: string;
  uploader_name: string;
  cloudinary_public_id: string;
  secure_url: string;
  width: number | null;
  height: number | null;
  created_at: string;
}

type GuestPhotosResponse =
  | {
      success: true;
      data: GuestPhoto[] | GuestPhoto;
    }
  | {
      success: false;
      error: string;
    };

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseKey);
}

function isCloudinarySecureUrl(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.startsWith("https://res.cloudinary.com/") &&
    value.length <= 2048
  );
}

function parseDimension(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return null;
  }

  return Math.round(value);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GuestPhotosResponse>,
) {
  try {
    const supabase = getSupabaseClient();

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("guest_photos")
        .select(
          "id,uploader_name,cloudinary_public_id,secure_url,width,height,created_at",
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Guest photos fetch error:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to load guest photos",
        });
      }

      return res.status(200).json({
        success: true,
        data: data ?? [],
      });
    }

    if (req.method === "POST") {
      const uploaderName =
        typeof req.body?.uploaderName === "string" ? req.body.uploaderName.trim() : "";
      const publicId =
        typeof req.body?.publicId === "string" ? req.body.publicId.trim() : "";
      const secureUrl = req.body?.secureUrl;
      const width = parseDimension(req.body?.width);
      const height = parseDimension(req.body?.height);

      if (!uploaderName) {
        return res.status(400).json({
          success: false,
          error: "Uploader name is required",
        });
      }

      if (uploaderName.length > MAX_UPLOADER_NAME_LENGTH) {
        return res.status(400).json({
          success: false,
          error: `Uploader name must be ${MAX_UPLOADER_NAME_LENGTH} characters or less`,
        });
      }

      if (!publicId) {
        return res.status(400).json({
          success: false,
          error: "Cloudinary public id is required",
        });
      }

      if (!isCloudinarySecureUrl(secureUrl)) {
        return res.status(400).json({
          success: false,
          error: "A valid Cloudinary image URL is required",
        });
      }

      const { data, error } = await supabase
        .from("guest_photos")
        .insert({
          uploader_name: uploaderName,
          cloudinary_public_id: publicId,
          secure_url: secureUrl,
          width,
          height,
        })
        .select("id,uploader_name,cloudinary_public_id,secure_url,width,height,created_at")
        .single();

      if (error) {
        console.error("Guest photo insert error:", error);
        return res.status(500).json({
          success: false,
          error:
            "The image uploaded, but we could not save it to the gallery. Please try again.",
        });
      }

      return res.status(201).json({
        success: true,
        data,
      });
    }

    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  } catch (error) {
    console.error("Guest photos API error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
