'use client';

import { useState } from 'react';
import { GalleryModal, GalleryImage } from './GalleryModal';

interface OverviewProps {
  title?: string;
  description: string;
  images?: GalleryImage[];
  accentColor?: string;
}

// Default placeholder images for when real photos aren't available
const defaultPlaceholderImages: GalleryImage[] = [
  { id: '1', placeholder: true, color: '#2a2a2a' },
  { id: '2', placeholder: true, color: '#333' },
  { id: '3', placeholder: true, color: '#3a3a3a' },
  { id: '4', placeholder: true, color: '#404040' },
  { id: '5', placeholder: true, color: '#2d2d2d' },
  { id: '6', placeholder: true, color: '#363636' },
  { id: '7', placeholder: true, color: '#3d3d3d' },
  { id: '8', placeholder: true, color: '#454545' },
  { id: '9', placeholder: true, color: '#2b2b2b' },
  { id: '10', placeholder: true, color: '#343434' },
  { id: '11', placeholder: true, color: '#3c3c3c' },
  { id: '12', placeholder: true, color: '#424242' },
];

export function Overview({
  title = 'About This Crawl',
  description,
  images = defaultPlaceholderImages,
  accentColor = '#D4A853',
}: OverviewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const coverImages = images.slice(0, 4);
  const remainingCount = images.length - 4;

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
            {/* Text Content */}
            <div className="flex-1">
              <h2
                className="font-serif text-3xl md:text-4xl mb-6"
                style={{ color: accentColor }}
              >
                {title}
              </h2>
              <div className="text-[#F5F0E8]/80 text-lg leading-relaxed space-y-4">
                {description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Photo Gallery Grid */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {coverImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => openModal(index)}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                  >
                    {image.placeholder ? (
                      <div
                        className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: image.color }}
                      >
                        <svg
                          className="w-8 h-8 text-white/20"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    ) : (
                      <img
                        src={image.src}
                        alt={image.alt || `Gallery image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}

                    {/* "+X more" overlay on last thumbnail */}
                    {index === 3 && remainingCount > 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          +{remainingCount} more
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </button>
                ))}
              </div>

              {/* View all link */}
              <button
                onClick={() => openModal(0)}
                className="mt-4 text-sm hover:underline transition-colors"
                style={{ color: accentColor }}
              >
                View all {images.length} photos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {modalOpen && (
        <GalleryModal
          images={images}
          currentIndex={currentImageIndex}
          onClose={() => setModalOpen(false)}
          onNavigate={setCurrentImageIndex}
        />
      )}
    </>
  );
}
