import type { NextApiRequest, NextApiResponse } from "next";

import { getCuratedGalleryById } from "@/lib/gallery-catalog";

const PAGE_SIZE = 30;
const MAX_CURSOR_LENGTH = 2048;

type CloudinaryFolderField = "asset_folder" | "folder";

interface GalleryCursor {
  folderField: CloudinaryFolderField;
  nextCursor: string;
}

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

function encodeGalleryCursor(folderField: CloudinaryFolderField, nextCursor: string) {
  return Buffer.from(JSON.stringify({ folderField, nextCursor } satisfies GalleryCursor)).toString(
    "base64url",
  );
}

function decodeGalleryCursor(value: string | undefined): GalleryCursor | null {
  if (!value || value.length > MAX_CURSOR_LENGTH) return null;

  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as Partial<GalleryCursor>;
    if (
      (parsed.folderField !== "asset_folder" && parsed.folderField !== "folder") ||
      typeof parsed.nextCursor !== "string" ||
      parsed.nextCursor.length === 0 ||
      parsed.nextCursor.length > MAX_CURSOR_LENGTH
    ) {
      return null;
    }
    return { folderField: parsed.folderField, nextCursor: parsed.nextCursor };
  } catch {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const galleryId = firstQueryValue(req.query.gallery);
  const rawCursor = firstQueryValue(req.query.cursor);
  const cursor = rawCursor ? decodeGalleryCursor(rawCursor) : null;
  const gallery = galleryId ? getCuratedGalleryById(galleryId) : undefined;

  if (!gallery) {
    return res.status(400).json({ success: false, error: "Invalid gallery" });
  }

  if (rawCursor && !cursor) {
    return res.status(400).json({ success: false, error: "Invalid pagination cursor" });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ success: false, error: "Gallery service is not configured" });
  }

  const cloudinaryFolder = gallery.cloudinaryFolder;
  const configuredCloudName = cloudName;

  try {
    async function searchFolder(
      folderField: CloudinaryFolderField,
      nextCursor?: string,
    ) {
      const body: Record<string, unknown> = {
        expression: `resource_type:image AND ${folderField}="${cloudinaryFolder}"`,
        sort_by: [{ created_at: "desc" }, { public_id: "desc" }],
        max_results: PAGE_SIZE,
      };
      if (nextCursor) body.next_cursor = nextCursor;

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${encodeURIComponent(configuredCloudName)}/resources/search`,
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
        return { ok: false as const, status: response.status };
      }

      return {
        ok: true as const,
        result: (await response.json()) as CloudinarySearchResponse,
      };
    }

    let folderField: CloudinaryFolderField = cursor?.folderField ?? "asset_folder";
    let search = await searchFolder(folderField, cursor?.nextCursor);

    // New Cloudinary product environments use dynamic folders (`asset_folder`).
    // Fall back only on the first page for legacy fixed-folder environments.
    if (
      !cursor &&
      (!search.ok || ((search.result.resources?.length ?? 0) === 0 && !search.result.next_cursor))
    ) {
      const legacySearch = await searchFolder("folder");
      if (legacySearch.ok && (legacySearch.result.resources?.length ?? 0) > 0) {
        folderField = "folder";
        search = legacySearch;
      } else if (!search.ok && legacySearch.ok) {
        folderField = "folder";
        search = legacySearch;
      }
    }

    if (!search.ok) {
      console.error("Cloudinary gallery fetch failed:", search.status);
      return res.status(search.status === 429 ? 503 : 502).json({
        success: false,
        error: "The gallery is temporarily unavailable. Please try again.",
      });
    }

    const result = search.result;
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
      nextCursor: result.next_cursor
        ? encodeGalleryCursor(folderField, result.next_cursor)
        : null,
    });
  } catch (error) {
    console.error("Cloudinary gallery error:", error);
    return res.status(502).json({
      success: false,
      error: "The gallery is temporarily unavailable. Please try again.",
    });
  }
}
