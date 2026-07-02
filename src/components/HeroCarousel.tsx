"use client";

import { useEffect, useState } from "react";

export default function HeroCarousel() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const TOTAL_FRAMES = 80;

  const getImageUrl = (index: number) => {
    const paddedIndex = index.toString().padStart(3, '0');
    const basePath = '';
    return `${basePath}/hero/Whisk_qjmkvdmyity4mdzm1cmhzwytctnxqtlwidz50im_${paddedIndex}.jpg`;
  };

  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    // Preload all images in the background
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getImageUrl(i);
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };
      images.push(img);
    }

    // Safeguard fallback: activate after 4 seconds regardless
    const fallbackTimeout = setTimeout(() => {
      setIsReady(true);
    }, 4000);

    return () => {
      clearTimeout(fallbackTimeout);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const interval = 41; // ~24 FPS playback speed

    const animate = (time: number) => {
      const delta = time - lastTime;
      if (delta >= interval) {
        setFrameIndex((prevIndex) => (prevIndex + 1) % TOTAL_FRAMES);
        lastTime = time - (delta % interval);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReady]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 mix-blend-screen scale-110 object-cover overflow-hidden bg-black transition-opacity duration-500">
      <img
        src={getImageUrl(isReady ? frameIndex : 0)}
        alt="Animated Hero Sequence"
        className="w-full h-full object-cover select-none pointer-events-none"
      />
    </div>
  );
}
