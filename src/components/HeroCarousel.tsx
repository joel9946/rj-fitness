"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function HeroCarousel() {
  const [frameIndex, setFrameIndex] = useState(0);
  const TOTAL_FRAMES = 80;

  useEffect(() => {
    // 24 frames per second = ~41ms interval
    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % TOTAL_FRAMES);
    }, 41);

    return () => clearInterval(interval);
  }, []);

  // Format the index to match the filename structure: Whisk_..._000.jpg to _079.jpg
  // e.g. 0 -> "000", 12 -> "012"
  const getImageUrl = (index: number) => {
    const paddedIndex = index.toString().padStart(3, '0');
    const basePath = process.env.NODE_ENV === 'production' ? '/rj-fitness' : '';
    return `${basePath}/hero/Whisk_qjmkvdmyity4mdzm1cmhzwytctnxqtlwidz50im_${paddedIndex}.jpg`;
  };

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 mix-blend-screen scale-110 object-cover overflow-hidden">
      {/* 
        We use a standard img tag here rather than full Next/Image optimization loop 
        because cycling 80 optimized images rapidly can crash the browser. We want 
        raw speed for a video-like effect. 
      */}
      <img
        src={getImageUrl(frameIndex)}
        alt="Animated Hero Sequence"
        className="w-full h-full object-cover select-none pointer-events-none"
      />
    </div>
  );
}
