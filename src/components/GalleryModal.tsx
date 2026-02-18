'use client';

import { useEffect, useCallback } from 'react';

export interface GalleryImage {
  id: string;
  src?: string;
  alt?: string;
  placeholder?: boolean;
  color?: string;
}

interface GalleryModalProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryModal({ images, currentIndex, onClose, onNavigate }: GalleryModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    } else if (e.key === 'ArrowRight') {
      onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
    }
  }, [currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        aria-label="Close gallery"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation - Previous */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
        }}
        className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Navigation - Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
        }}
        className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image container */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {currentImage.placeholder ? (
          <div
            className="w-[80vw] h-[60vh] rounded-lg flex items-center justify-center"
            style={{ backgroundColor: currentImage.color || '#333' }}
          >
            <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        ) : (
          <img
            src={currentImage.src}
            alt={currentImage.alt || `Gallery image ${currentIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        )}
      </div>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm font-medium tracking-wide">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
