'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: 'Quantum Secure From Day One',
    description: 'Genesis block protection with NIST FIPS 204 standardized cryptography, securing assets against cryptographic threats now and into the future.',
  },
  {
    title: 'Bitcoin Compatible',
    description: 'Familiar architecture, transaction model, and wallet experience. If you understand Bitcoin, you understand BTQ.',
  },
  {
    title: 'Canary Network',
    description: 'A proving ground for quantum-safe technologies, validating solutions that will secure our digital future.',
  },
  {
    title: 'Future Ready',
    description: 'Designed for cryptographic agility, ready to adopt emerging NIST or otherwise standardized algorithms as the post-quantum ecosystem matures.',
  },
  {
    title: 'A New Network',
    description: 'Distinct genesis block, network identifiers, and address formats ensure clean separation and prevent cross-chain replay attacks.',
  },
];

export default function FeatureCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Card width as percentage of container
  const cardWidthPercent = 0.75;

  // Update active index based on scroll position
  const updateActiveIndex = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const cardWidth = clientWidth * cardWidthPercent;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, features.length - 1));
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateActiveIndex);
      updateActiveIndex();
    }
    return () => container?.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const cardWidth = clientWidth * cardWidthPercent;
      containerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left'
      ? Math.max(0, activeIndex - 1)
      : Math.min(features.length - 1, activeIndex + 1);
    scrollToIndex(newIndex);
  };

  const canScrollLeft = activeIndex > 0;
  const canScrollRight = activeIndex < features.length - 1;

  return (
    <div id="features" className="mb-12 scroll-mt-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white font-dm-mono">Key Features</h2>

        {/* Navigation arrows */}
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-lg border transition-all ${
              canScrollLeft
                ? 'border-[rgba(0,240,255,0.25)] text-[#00f0ff] hover:bg-[#0c1017]'
                : 'border-[rgba(0,240,255,0.1)] text-white/30 cursor-not-allowed'
            }`}
            aria-label="Previous feature"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-lg border transition-all ${
              canScrollRight
                ? 'border-[rgba(0,240,255,0.25)] text-[#00f0ff] hover:bg-[#0c1017]'
                : 'border-[rgba(0,240,255,0.1)] text-white/30 cursor-not-allowed'
            }`}
            aria-label="Next feature"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel container - 75% width cards with preview */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`flex-shrink-0 w-3/4 snap-start transition-all duration-500 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
            }}
          >
            <div className={`bg-[#0c1017] p-8 rounded-lg border transition-all h-full ${
              index === activeIndex
                ? 'border-[rgba(0,240,255,0.3)] shadow-[0_0_30px_rgba(0,240,255,0.1)]'
                : 'border-[rgba(0,240,255,0.1)] opacity-60'
            }`}>
              <h3 className="text-2xl font-semibold text-white mb-4 font-dm-mono">
                {feature.title}
              </h3>
              <p className="text-white/80 font-dm-mono text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-[#00f0ff] w-6'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to feature ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
