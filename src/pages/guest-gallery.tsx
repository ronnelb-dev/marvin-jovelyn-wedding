"use client";

import { useState } from "react";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { FaHeart } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import "@/styles/globals.css";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import UploadSection from "@/components/UploadSection";
import GalleryGrid from "@/components/GalleryGrid";
import MediaModal from "@/components/MediaModal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface GalleryMedia {
  publicId: string;
  src: string;
  type: "image" | "video";
  width?: number;
  height?: number;
  uploadedBy?: string;
}

interface Props {
  allImages: GalleryMedia[];
}

function WeddingGalleryContent({ allImages }: Props) {
  const [displayImages, setDisplayImages] = useState<GalleryMedia[]>(allImages);
  const [currentImage, setCurrentImage] = useState<GalleryMedia | null>(null);

  const handleUploadComplete = (media: GalleryMedia) => {
    setDisplayImages((prev) => [media, ...prev]);
  };

  const showImage = (img: GalleryMedia) => setCurrentImage(img);
  const closeModal = () => setCurrentImage(null);

  const showNext = () => {
    const currentIndex = displayImages.findIndex(
      (img) => img.publicId === currentImage?.publicId
    );
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % displayImages.length;
      setCurrentImage(displayImages[nextIndex]);
    }
  };

  const showPrev = () => {
    const currentIndex = displayImages.findIndex(
      (img) => img.publicId === currentImage?.publicId
    );
    if (currentIndex !== -1) {
      const prevIndex =
        (currentIndex - 1 + displayImages.length) % displayImages.length;
      setCurrentImage(displayImages[prevIndex]);
    }
  };

  return (
    <>
      <Head>
        <title>Marvin & Jovelyn - Guest Gallery</title>
        <meta name="description" content="Marvin and Jovelyn Guest Gallery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`${playfair.className} bg-gradient-to-br from-rose-50 via-white to-pink-50 min-h-screen`}
      >
        <NavBar />
        <Toaster position="bottom-center" />

        <div className="max-w-6xl mx-auto px-4 py-8">
          <UploadSection onUploadComplete={handleUploadComplete} />

          <div className="flex items-center justify-center gap-2 text-rose-500 mb-8">
            <FaHeart className="text-lg" />
            <span className="font-medium">
              {displayImages.length} memories shared
            </span>
            <FaHeart className="text-lg" />
          </div>

          <GalleryGrid images={displayImages} onImageClick={showImage} />

          {displayImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-12 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl"
            >
              <FaHeart className="mx-auto text-3xl text-rose-400 mb-3" />
              <p
                className={`${playfair.className} text-xl text-gray-700 font-medium`}
              >
                All our beautiful memories! ✨
              </p>
              <p className="text-gray-600 mt-1">
                Thank you for being part of our special day
              </p>
            </motion.div>
          )}
        </div>

        <MediaModal
          currentImage={currentImage}
          images={displayImages}
          onClose={closeModal}
          onNext={showNext}
          onPrev={showPrev}
        />

        <Footer />
      </div>
    </>
  );
}

export default function WeddingGalleryPage({ allImages }: Props) {
  return <WeddingGalleryContent allImages={allImages} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch from Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          expression: "folder:wedding-gallery/*",
          sort_by: [{ created_at: "desc" }],
          max_results: 100,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Cloudinary");
    }

    const data = await response.json();

    const allImages: GalleryMedia[] = data.resources.map((resource: any) => ({
      publicId: resource.public_id,
      src: resource.secure_url,
      type: resource.resource_type === "video" ? "video" : "image",
      width: resource.width,
      height: resource.height,
    }));

    return {
      props: { allImages },
    };
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return {
      props: { allImages: [] },
    };
  }
};
