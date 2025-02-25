import React from 'react';
import { ArrowRight } from 'lucide-react';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1542296332-2e4473faf563',
    title: 'Terminal moderne',
    category: 'Infrastructure'
  },
  {
    url: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d',
    title: 'Zone commerciale',
    category: 'Commerce'
  },
  {
    url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1',
    title: 'Initiatives vertes',
    category: 'Durabilité'
  },
  {
    url: 'https://images.unsplash.com/photo-1540339832862-474599807836',
    title: 'Technologie de pointe',
    category: 'Innovation'
  }
];

export default function GallerySection() {
  return (
    <section className="py-24 bg-night">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-1 bg-primary rounded-full mr-4" />
              <span className="text-primary font-medium">Notre Galerie</span>
            </div>
            <h2 className="text-4xl font-bold text-day">Nos Réalisations et activités sur Beekeeper</h2>
          </div>
          <button className="group flex items-center text-day hover:text-primary transition-colors">
            <span className="mr-2">Rejoingnez nous sur Beekeeper</span>
            
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="block text-primary font-medium text-xs mb-1">
                    {image.category}
                  </span>
                  <h3 className="text-sm font-bold text-day line-clamp-2">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}