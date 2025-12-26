// src/components/InstagramMasonryGallery.jsx
import React, { useState } from "react";
import { useInstagramPhotos } from "../hooks/useReactQuery";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Link } from "react-router";

export default function InstagramMasonryGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const { data, isLoading, isError, error, refetch } = useInstagramPhotos(1000);

  if (isLoading) {
    return <MasonryLoadingSkeleton />;
  }

  if (isError) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  let photos = data?.data || [];

  // Lightbox slides
  const slides = photos.map((photo) => ({
    src: photo.media_url,
    alt: photo.caption || "Instagram",
    title: photo.caption,
    download: photo.media_url,
  }));

  return (
    <div className="min-h-screen bg-gray-50 cursor-none">
      {/* Header */}
      <div className="sticky w-full h-full px-5 py-3 top-0 z-10 bg-white shadow-md flex items-center justify-between">
        <Link to={"/"}>Orqaga</Link>
        <p>Rasmlar soni: {photos.length}</p>
      </div>

      {/* Masonry Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {photos.map((photo, index) => (
            <MasonryPhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Download]}
        captions={{ descriptionTextAlign: "center" }}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
          border: 0,
          borderRadius: 8,
          padding: 4,
          gap: 12,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
        slideshow={{
          autoplay: false,
          delay: 3000,
        }}
        animation={{ fade: 300 }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
        }}
      />
    </div>
  );
}

// Masonry Photo Card
function MasonryPhotoCard({ photo, index, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative break-inside-avoid mb-3 md:mb-4"
    >
      <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300">
        {/* Image */}
        <img
          src={photo.media_url}
          alt={photo.caption || `Instagram ${index + 1}`}
          className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Zoom Icon */}
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Error Display
function ErrorDisplay({ error, onRetry }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Xatolik yuz berdi
        </h3>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          🔄 Qayta urinish
        </button>
      </div>
    </div>
  );
}

// Loading Skeleton
function MasonryLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="h-16 bg-gray-200 rounded-2xl w-96 mx-auto mb-8 animate-pulse"></div>
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-xl overflow-hidden animate-pulse"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div
                className="bg-gray-200 w-full"
                style={{ height: `${Math.random() * 200 + 200}px` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
