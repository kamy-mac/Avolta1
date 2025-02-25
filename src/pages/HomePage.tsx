import React from 'react';
import Hero from '../components/home/Hero';
import NewsSection from '../components/home/NewsSection';
import VideoSection from '../components/home/VideoSection';
import GallerySection from '../components/home/GallerySection';
import TeamGrid from '../components/home/TeamGrid';

export default function HomePage() {
  return (
    <div className="bg-day">
      <Hero />
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-night to-transparent" />
        <NewsSection />
        <VideoSection />
        <TeamGrid />
        <GallerySection />
      </div>
    </div>
  );
}