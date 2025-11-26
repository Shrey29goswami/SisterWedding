import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGES } from '../constants';
import Section from '../components/Section';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const photos = IMAGES.gallery;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % photos.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage === null) return;
    setSelectedImage((selectedImage - 1 + photos.length) % photos.length);
  };

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
       <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-primary mb-4">Moments</h1>
          <p className="text-muted">A glimpse into our journey</p>
        </div>

      <div className="max-w-6xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.map((src, index) => (
          <Section key={index} delay={index * 100}>
            <div 
              className="relative group overflow-hidden rounded-lg cursor-pointer break-inside-avoid"
              onClick={() => setSelectedImage(index)}
            >
              <img 
                src={src} 
                alt={`Gallery ${index + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Section>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>

          <button 
            className="absolute left-4 text-white hover:text-primary transition-colors hidden md:block"
            onClick={prevImage}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img 
            src={photos[selectedImage]} 
            alt="Full screen"
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />

          <button 
            className="absolute right-4 text-white hover:text-primary transition-colors hidden md:block"
            onClick={nextImage}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;