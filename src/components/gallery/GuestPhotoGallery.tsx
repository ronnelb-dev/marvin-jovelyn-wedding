"use client";

import Image from "next/image";
import {
  AlertCircle,
  Camera,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 1600;
const MAX_UPLOADER_NAME_LENGTH = 120;
const UPLOADER_NAME_STORAGE_KEY = "marvin-jovelyn-wedding:uploader-name";
const LIGHTBOX_MIN_ZOOM = 1;
const LIGHTBOX_MAX_ZOOM = 3;
const LIGHTBOX_ZOOM_STEP = 0.5;
const GALLERY_BATCH_SIZE = 16;
const REQUEST_TIMEOUT_MS = 30000;
const CLOUDINARY_UPLOAD_TIMEOUT_MS = 120000;
const COMPRESSION_ERROR_MESSAGE =
  "We could not reduce this photo below 5MB. Please choose a smaller image.";

interface GuestPhoto {
  id: string;
  uploader_name: string;
  cloudinary_public_id: string;
  secure_url: string;
  width: number | null;
  height: number | null;
  created_at: string;
}

interface SignaturePayload {
  apiKey: string;
  cloudName: string;
  folder: string;
  signature: string;
  timestamp: number;
}

interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
}

interface LoadedImage {
  image: CanvasImageSource;
  width: number;
  height: number;
  cleanup: () => void;
}

interface SelectedPhotoPreview {
  id: string;
  file: File;
  previewUrl: string;
}

function getErrorMessage(value: unknown, fallback: string) {
  if (value instanceof Error) {
    return value.message;
  }

  return fallback;
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.error || "Something went wrong");
  }

  return result;
}

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMessage = "The upload is taking too long. Please try again.",
) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(timeoutMessage);
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function getCompressedFileName(fileName: string) {
  const baseName = fileName.replace(/\.[^/.]+$/, "") || "wedding-photo";

  return `${baseName}-compressed.jpg`;
}

async function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("This browser could not compress the selected image."));
          return;
        }

        resolve(blob);
      },
      type,
      quality,
    );
  });
}

async function loadImageFromFile(file: File): Promise<LoadedImage> {
  if ("createImageBitmap" in window) {
    const bitmap = await createImageBitmap(file, {
      imageOrientation: "from-image",
    });

    return {
      image: bitmap,
      width: bitmap.width,
      height: bitmap.height,
      cleanup: () => bitmap.close(),
    };
  }

  const objectUrl = URL.createObjectURL(file);

  return new Promise<LoadedImage>((resolve, reject) => {
    const image = document.createElement("img");

    image.onload = () => {
      resolve({
        image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        cleanup: () => URL.revokeObjectURL(objectUrl),
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("We could not read the selected image."));
    };

    image.decoding = "async";
    image.src = objectUrl;
  });
}

async function optimizeImageForUpload(file: File) {
  const loadedImage = await loadImageFromFile(file);

  try {
    const scale = Math.min(
      1,
      MAX_IMAGE_DIMENSION / Math.max(loadedImage.width, loadedImage.height),
    );
    const targetWidth = Math.max(1, Math.round(loadedImage.width * scale));
    const targetHeight = Math.max(1, Math.round(loadedImage.height * scale));
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("This browser does not support image compression.");
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    context.drawImage(loadedImage.image, 0, 0, targetWidth, targetHeight);

    const qualities = [0.86, 0.8, 0.74, 0.68];
    let smallestBlob: Blob | null = null;

    for (const quality of qualities) {
      const blob = await canvasToBlob(canvas, "image/jpeg", quality);
      smallestBlob = blob;

      if (blob.size <= MAX_FILE_SIZE_BYTES) {
        return new File([blob], getCompressedFileName(file.name), {
          type: "image/jpeg",
          lastModified: Date.now(),
        });
      }
    }

    if (smallestBlob && smallestBlob.size <= MAX_FILE_SIZE_BYTES) {
      return new File([smallestBlob], getCompressedFileName(file.name), {
        type: "image/jpeg",
        lastModified: Date.now(),
      });
    }

    throw new Error(COMPRESSION_ERROR_MESSAGE);
  } finally {
    loadedImage.cleanup();
  }
}

export default function GuestPhotoGallery() {
  const [photos, setPhotos] = useState<GuestPhoto[]>([]);
  const [selectedUploader, setSelectedUploader] = useState<string | null>(null);
  const [visiblePhotoCount, setVisiblePhotoCount] = useState(GALLERY_BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState(LIGHTBOX_MIN_ZOOM);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaderName, setUploaderName] = useState("");
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhotoPreview[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitAfterFileSelectionRef = useRef(false);
  const uploaderNameInputRef = useRef<HTMLInputElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const gallerySentinelRef = useRef<HTMLDivElement>(null);
  const lightboxPointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchDistanceRef = useRef<number | null>(null);

  const filteredPhotos = useMemo(
    () =>
      selectedUploader
        ? photos.filter((photo) => photo.uploader_name === selectedUploader)
        : photos,
    [photos, selectedUploader],
  );

  const displayedPhotos = useMemo(
    () => filteredPhotos.slice(0, visiblePhotoCount),
    [filteredPhotos, visiblePhotoCount],
  );

  useEffect(() => {
    setVisiblePhotoCount(GALLERY_BATCH_SIZE);
    setHasReachedEnd(false);
  }, [selectedUploader]);

  useEffect(() => {
    const sentinel = gallerySentinelRef.current;
    if (!sentinel || isLoadingGallery) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || isLoadingMore || hasReachedEnd) return;
        if (visiblePhotoCount >= filteredPhotos.length) {
          setHasReachedEnd(true);
          return;
        }
        setIsLoadingMore(true);
        window.setTimeout(() => {
          setVisiblePhotoCount((current) => Math.min(current + GALLERY_BATCH_SIZE, filteredPhotos.length));
          setIsLoadingMore(false);
        }, 250);
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredPhotos.length, hasReachedEnd, isLoadingGallery, isLoadingMore, visiblePhotoCount]);

  const activeLightboxPhoto = lightboxIndex === null ? null : displayedPhotos[lightboxIndex] ?? null;

  function resetLightboxView() {
    setZoomScale(LIGHTBOX_MIN_ZOOM);
    setPanOffset({ x: 0, y: 0 });
  }

  function closeLightbox() {
    setLightboxIndex(null);
    resetLightboxView();
  }

  function moveLightbox(direction: -1 | 1) {
    if (lightboxIndex === null) return;
    const nextIndex = lightboxIndex + direction;
    if (nextIndex < 0 || nextIndex >= displayedPhotos.length) return;
    setLightboxIndex(nextIndex);
    resetLightboxView();
  }

  function handleLightboxPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    lightboxPointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (lightboxPointersRef.current.size === 2) {
      const points = [...lightboxPointersRef.current.values()];
      pinchDistanceRef.current = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
    }
  }

  function handleLightboxPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const previous = lightboxPointersRef.current.get(event.pointerId);
    if (!previous) return;
    lightboxPointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (lightboxPointersRef.current.size === 2 && pinchDistanceRef.current) {
      const points = [...lightboxPointersRef.current.values()];
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      setZoomScale((current) => Math.min(LIGHTBOX_MAX_ZOOM, Math.max(LIGHTBOX_MIN_ZOOM, current * (distance / pinchDistanceRef.current!))));
      pinchDistanceRef.current = distance;
    } else if (zoomScale > LIGHTBOX_MIN_ZOOM) {
      setPanOffset((current) => ({ x: current.x + event.clientX - previous.x, y: current.y + event.clientY - previous.y }));
    }
  }

  function handleLightboxPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    lightboxPointersRef.current.delete(event.pointerId);
    if (lightboxPointersRef.current.size < 2) pinchDistanceRef.current = null;
  }

  useEffect(() => {
    if (!isNameModalOpen) return;
    window.setTimeout(() => uploaderNameInputRef.current?.focus(), 0);
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsNameModalOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isNameModalOpen]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => lightboxCloseRef.current?.focus(), 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        resetLightboxView();
      }
      if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && lightboxIndex !== null) {
        const direction = event.key === "ArrowLeft" ? -1 : 1;
        const nextIndex = lightboxIndex + direction;
        if (nextIndex >= 0 && nextIndex < displayedPhotos.length) {
          setLightboxIndex(nextIndex);
          resetLightboxView();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, displayedPhotos.length]);

  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= displayedPhotos.length) {
      setLightboxIndex(null);
      resetLightboxView();
    }
  }, [displayedPhotos.length, lightboxIndex]);

  useEffect(() => {
    let isMounted = true;

    async function loadPhotos() {
      try {
        const response = await fetch("/api/guest-photos");
        const result = await parseJsonResponse<{ success: true; data: GuestPhoto[] }>(
          response,
        );

        if (isMounted) {
          setPhotos(result.data);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            getErrorMessage(error, "We could not load the guest photo gallery."),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingGallery(false);
        }
      }
    }

    loadPhotos();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      selectedPhotos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
  }, [selectedPhotos]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setSuccessMessage("");

    if (files.length === 0) {
      setSelectedPhotos([]);
      return;
    }

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length !== files.length) {
      setSelectedPhotos([]);
      setErrorMessage("Please choose image files only.");
      event.target.value = "";
      return;
    }

    setErrorMessage("");
    setSelectedPhotos((current) => {
      current.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));

      return imageFiles.map((file, index) => ({
        id: `${file.name}-${file.lastModified}-${index}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }));
    });

    if (submitAfterFileSelectionRef.current) {
      submitAfterFileSelectionRef.current = false;
      window.setTimeout(() => formRef.current?.requestSubmit(), 0);
    }
  }

  function clearSelectedPhotos(options: { clearMessages?: boolean } = {}) {
    setSelectedPhotos((current) => {
      current.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
      return [];
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (options.clearMessages ?? true) {
      setSuccessMessage("");
      setErrorMessage("");
    }
  }

  async function requestCloudinarySignature() {
    const response = await fetchWithTimeout(
      "/api/cloudinary-signature",
      {
        method: "POST",
      },
      "We could not prepare the upload. Please try again.",
    );
    const result = await parseJsonResponse<{ success: true; data: SignaturePayload }>(
      response,
    );

    return result.data;
  }

  function uploadToCloudinary(
    file: File,
    signatureData: SignaturePayload,
    onProgress: (progress: number | null) => void,
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signatureData.apiKey);
    formData.append("timestamp", String(signatureData.timestamp));
    formData.append("folder", signatureData.folder);
    formData.append("signature", signatureData.signature);

    return new Promise<CloudinaryUploadResponse>((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
      );
      request.timeout = CLOUDINARY_UPLOAD_TIMEOUT_MS;

      request.upload.onprogress = (event) => {
        if (!event.lengthComputable) {
          onProgress(null);
          return;
        }

        onProgress(Math.min(99, Math.round((event.loaded / event.total) * 100)));
      };

      request.onload = () => {
        let result: CloudinaryUploadResponse & { error?: { message?: string } };

        try {
          result = JSON.parse(request.responseText);
        } catch {
          reject(new Error("Cloudinary returned an invalid upload response."));
          return;
        }

        if (request.status < 200 || request.status >= 300) {
          reject(new Error(result.error?.message || "Cloudinary upload failed"));
          return;
        }

        resolve(result);
      };

      request.onerror = () => {
        reject(
          new Error(
            "We could not reach Cloudinary. Please check your connection and try again.",
          ),
        );
      };

      request.ontimeout = () => {
        reject(
          new Error(
            "The photo upload is taking too long. Please try a smaller image or check your connection.",
          ),
        );
      };

      request.send(formData);
    });
  }

  async function saveGuestPhoto(uploadResult: CloudinaryUploadResponse, name: string) {
    const response = await fetchWithTimeout(
      "/api/guest-photos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uploaderName: name,
          publicId: uploadResult.public_id,
          secureUrl: uploadResult.secure_url,
          width: uploadResult.width,
          height: uploadResult.height,
        }),
      },
      "The image uploaded, but saving it to the gallery took too long. Please try again.",
    );
    const result = await parseJsonResponse<{ success: true; data: GuestPhoto }>(response);

    return result.data;
  }

  async function uploadSelectedPhotos(trimmedName: string) {
    setSuccessMessage("");
    setErrorMessage("");

    if (selectedPhotos.length === 0) {
      setErrorMessage("Please choose at least one image to upload.");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Preparing your upload...");

    const savedPhotos: GuestPhoto[] = [];
    const failedUploads: string[] = [];
    const totalPhotos = selectedPhotos.length;

    try {
      for (const [index, photo] of selectedPhotos.entries()) {
        const photoNumber = index + 1;

        try {
          setUploadStatus(`Optimizing photo ${photoNumber} of ${totalPhotos}...`);
          const optimizedFile = await optimizeImageForUpload(photo.file);
          const signatureData = await requestCloudinarySignature();
          setUploadStatus(`Uploading photo ${photoNumber} of ${totalPhotos}...`);
          const uploadResult = await uploadToCloudinary(
            optimizedFile,
            signatureData,
            (progress) => {
              setUploadStatus(
                progress === null
                  ? `Uploading photo ${photoNumber} of ${totalPhotos}...`
                  : `Uploading photo ${photoNumber} of ${totalPhotos}... ${progress}%`,
              );
            },
          );
          setUploadStatus(`Adding photo ${photoNumber} of ${totalPhotos} to the gallery...`);
          const savedPhoto = await saveGuestPhoto(uploadResult, trimmedName);
          savedPhotos.push(savedPhoto);
          setPhotos((current) => [savedPhoto, ...current]);
        } catch (error) {
          failedUploads.push(
            `${photo.file.name}: ${getErrorMessage(
              error,
              "This photo could not be uploaded.",
            )}`,
          );
        }
      }

      if (savedPhotos.length > 0) {
        const photoLabel = savedPhotos.length === 1 ? "photo has" : "photos have";
        setSuccessMessage(`${savedPhotos.length} ${photoLabel} been added to the gallery.`);
      }

      if (failedUploads.length > 0) {
        const failedLabel = failedUploads.length === 1 ? "photo" : "photos";
        setErrorMessage(
          `${failedUploads.length} ${failedLabel} could not be uploaded. ${failedUploads.join(" ")}`,
        );
      }

      if (savedPhotos.length === 0 && failedUploads.length === 0) {
        setErrorMessage("No photos were uploaded. Please try again.");
      }

      if (savedPhotos.length > 0) {
        setUploaderName("");
        clearSelectedPhotos({ clearMessages: false });
      }
    } catch (error) {
      setErrorMessage(
        getErrorMessage(
          error,
          "We could not upload your photo. Please check your connection and try again.",
        ),
      );
    } finally {
      setIsUploading(false);
      setUploadStatus("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const storedName = window.localStorage.getItem(UPLOADER_NAME_STORAGE_KEY)?.trim() ?? "";

    if (!storedName) {
      setIsNameModalOpen(true);
      return;
    }

    if (selectedPhotos.length === 0) {
      submitAfterFileSelectionRef.current = true;
      fileInputRef.current?.click();
      return;
    }

    setUploaderName(storedName);
    await uploadSelectedPhotos(storedName);
  }

  async function handleNameConfirmation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = uploaderName.trim();
    if (!trimmedName) {
      setErrorMessage("Please enter the uploader name.");
      return;
    }
    if (trimmedName.length > MAX_UPLOADER_NAME_LENGTH) {
      setErrorMessage(
        `Please keep the uploader name to ${MAX_UPLOADER_NAME_LENGTH} characters or less.`,
      );
      return;
    }
    window.localStorage.setItem(UPLOADER_NAME_STORAGE_KEY, trimmedName);
    setIsNameModalOpen(false);

    if (selectedPhotos.length === 0) {
      submitAfterFileSelectionRef.current = true;
      fileInputRef.current?.click();
      return;
    }

    await uploadSelectedPhotos(trimmedName);
  }

  return (
    <section className="wedding-gallery-section" aria-label="Guest photo uploads">
      <div className="wedding-gallery-upload">
        <div className="wedding-gallery-upload-copy">
          <p className="wedding-kicker">share a photo</p>
        </div>

        <form ref={formRef} className="wedding-gallery-form" onSubmit={handleSubmit}>
          <div className="wedding-gallery-file-field wedding-gallery-file-field-hidden">
            <input
              id="guest-photo-file"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>

          {selectedPhotos.length > 0 ? (
            <div className="wedding-gallery-preview-list" aria-label="Selected image previews">
              {selectedPhotos.map((photo, index) => (
                <div className="wedding-gallery-preview-item" key={photo.id}>
                  <Image
                    src={photo.previewUrl}
                    alt={`Selected wedding photo preview ${index + 1}`}
                    fill
                    sizes="(max-width: 620px) 50vw, 180px"
                    unoptimized
                  />
                </div>
              ))}
              <button
                type="button"
                className="wedding-gallery-clear"
                onClick={() => clearSelectedPhotos()}
                disabled={isUploading}
              >
                Clear selected photos
              </button>
            </div>
          ) : (
            <div className="wedding-gallery-preview wedding-gallery-preview-empty">
              <Camera size={34} />
              <span>Your image previews will appear here</span>
            </div>
          )}

          {successMessage ? (
            <p className="wedding-gallery-message wedding-gallery-message-success">
              <CheckCircle2 size={18} />
              {successMessage}
            </p>
          ) : null}

          {isUploading && uploadStatus ? (
            <p className="wedding-gallery-message wedding-gallery-message-progress">
              <Loader2 size={18} className="wedding-gallery-spinner" />
              {uploadStatus}
            </p>
          ) : null}

          {errorMessage ? (
            <p className="wedding-gallery-message wedding-gallery-message-error">
              <AlertCircle size={18} />
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            className="cordially-submit wedding-gallery-submit"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 size={18} className="wedding-gallery-spinner" />
                Please wait...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload Photos
              </>
            )}
          </button>
        </form>
      </div>

      <div className="wedding-gallery-list-header">
        <p className="wedding-kicker">guest gallery</p>
        <h2>{selectedUploader ? `Photos shared by ${selectedUploader}` : "Photos from our people"}</h2>
        <p className="wedding-gallery-list-intro">
          {selectedUploader
            ? "Showing this guest's shared wedding memories."
            : "Scroll below to see the wedding memories shared by other guests."}
        </p>
      </div>

      {selectedUploader ? (
        <div className="wedding-gallery-filter-banner" role="status">
          <span>Showing photos shared by {selectedUploader}</span>
          <button type="button" onClick={() => { setSelectedUploader(null); setVisiblePhotoCount(GALLERY_BATCH_SIZE); setHasReachedEnd(false); }}>
            Show all guest uploads
          </button>
        </div>
      ) : null}

      {isLoadingGallery ? (
        <div className="wedding-gallery-empty">
          <Loader2 size={32} className="wedding-gallery-spinner" />
          <p>Loading guest photos...</p>
        </div>
      ) : displayedPhotos.length > 0 ? (
        <div className="wedding-gallery-grid">
          {displayedPhotos.map((photo) => (
            <article className="wedding-gallery-card" key={photo.id}>
              <button
                type="button"
                className="wedding-gallery-card-image"
                onClick={() => { setLightboxIndex(displayedPhotos.indexOf(photo)); resetLightboxView(); }}
                aria-label={`Open wedding photo uploaded by ${photo.uploader_name}`}
              >
                <Image
                  src={photo.secure_url}
                  alt={`Wedding photo uploaded by ${photo.uploader_name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 33vw"
                />
              </button>
              <div className="wedding-gallery-card-meta">
                <div>
                  <p>Uploaded by</p>
                  <h3>{photo.uploader_name}</h3>
                </div>
                {selectedUploader !== photo.uploader_name ? (
                  <button
                    type="button"
                    className="wedding-gallery-filter-action"
                    onClick={() => setSelectedUploader(photo.uploader_name)}
                    aria-label={`See more from ${photo.uploader_name}`}
                  >
                    See more from {photo.uploader_name}
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="wedding-gallery-empty">
          <Camera size={36} />
          <h3>{selectedUploader ? `No photos from ${selectedUploader} yet` : "No guest photos yet"}</h3>
          <p>
            {selectedUploader
              ? "Try showing all guest uploads to browse the complete gallery."
              : "Be the first to add a favorite moment from the celebration."}
          </p>
        </div>
      )}

      <div ref={gallerySentinelRef} className="wedding-gallery-scroll-sentinel" aria-hidden="true" />
      {isLoadingMore ? (
        <p className="wedding-gallery-scroll-status" role="status">
          <Loader2 size={18} className="wedding-gallery-spinner" /> Loading more guest photos...
        </p>
      ) : null}
      {hasReachedEnd && displayedPhotos.length > 0 ? (
        <p className="wedding-gallery-scroll-status wedding-gallery-scroll-end" role="status">
          You&apos;ve reached the end of the guest gallery.
        </p>
      ) : null}

      {activeLightboxPhoto && lightboxIndex !== null ? (
        <div
          className="wedding-gallery-lightbox-backdrop"
          role="presentation"
          onClick={(event) => { if (event.target === event.currentTarget) closeLightbox(); }}
        >
          <div className="wedding-gallery-lightbox" role="dialog" aria-modal="true" aria-label="Guest photo viewer">
            <button ref={lightboxCloseRef} type="button" className="wedding-gallery-lightbox-close" onClick={closeLightbox} aria-label="Close photo viewer"><X size={24} /></button>
            <button type="button" className="wedding-gallery-lightbox-nav wedding-gallery-lightbox-prev" onClick={() => moveLightbox(-1)} disabled={lightboxIndex === 0} aria-label="Previous image"><ChevronLeft size={32} /></button>
            <div className="wedding-gallery-lightbox-stage" onPointerDown={handleLightboxPointerDown} onPointerMove={handleLightboxPointerMove} onPointerUp={handleLightboxPointerUp} onPointerCancel={handleLightboxPointerUp}>
              <Image
                src={activeLightboxPhoto.secure_url}
                alt={`Wedding photo uploaded by ${activeLightboxPhoto.uploader_name}`}
                fill
                sizes="100vw"
                className="wedding-gallery-lightbox-image"
                style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})` }}
              />
            </div>
            <button type="button" className="wedding-gallery-lightbox-nav wedding-gallery-lightbox-next" onClick={() => moveLightbox(1)} disabled={lightboxIndex === displayedPhotos.length - 1} aria-label="Next image"><ChevronRight size={32} /></button>
            <div className="wedding-gallery-lightbox-tools" aria-label="Zoom controls">
              <button type="button" onClick={() => setZoomScale((current) => Math.max(LIGHTBOX_MIN_ZOOM, current - LIGHTBOX_ZOOM_STEP))} aria-label="Zoom out"><ZoomOut size={20} /></button>
              <button type="button" onClick={resetLightboxView} aria-label="Reset zoom"><RotateCcw size={18} /></button>
              <button type="button" onClick={() => setZoomScale((current) => Math.min(LIGHTBOX_MAX_ZOOM, current + LIGHTBOX_ZOOM_STEP))} aria-label="Zoom in"><ZoomIn size={20} /></button>
            </div>
          </div>
        </div>
      ) : null}

      {isNameModalOpen ? (
        <div className="wedding-gallery-modal-backdrop" role="presentation">
          <div className="wedding-gallery-modal" role="dialog" aria-modal="true" aria-labelledby="uploader-name-title">
            <p className="wedding-kicker">before you share</p>
            <h2 id="uploader-name-title">Who should we thank?</h2>
            <p className="wedding-gallery-modal-copy">Add your name so your memory can be shared with the wedding gallery.</p>
            <form onSubmit={handleNameConfirmation}>
              <label className="cordially-field">
                <span>Uploader name</span>
                <input ref={uploaderNameInputRef} type="text" value={uploaderName} maxLength={MAX_UPLOADER_NAME_LENGTH} onChange={(event) => { setUploaderName(event.target.value); if (errorMessage) setErrorMessage(""); }} placeholder="Your name" autoComplete="name" required aria-required="true" />
              </label>
              {errorMessage ? <p className="wedding-gallery-modal-error">{errorMessage}</p> : null}
              <div className="wedding-gallery-modal-actions">
                <button type="button" className="wedding-gallery-modal-cancel" onClick={() => setIsNameModalOpen(false)}>Cancel</button>
                <button type="submit" className="cordially-submit">Continue</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
