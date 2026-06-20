"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Eye, Dumbbell, Sparkles } from "lucide-react";

interface GalleryImage {
  id: number;
  url: string;
  category: "Strength Zone" | "Cardio Studio" | "CrossFit Arena" | "Amenities";
  title: string;
  desc: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    url: "/images/unnamed.webp",
    category: "Strength Zone",
    title: "Premium Heavy Weights",
    desc: "Olympic-grade barbells and plates for heavy lifts."
  },
  {
    id: 2,
    url: "/images/unnamed (1).webp",
    category: "Strength Zone",
    title: "Strength Isolation Area",
    desc: "State-of-the-art chest and leg press machines."
  },
  {
    id: 3,
    url: "/images/unnamed (2).webp",
    category: "Strength Zone",
    title: "Free Weight Racks",
    desc: "Complete dumbbell sets for progressive overload."
  },
  {
    id: 4,
    url: "/images/unnamed (3).webp",
    category: "Strength Zone",
    title: "Power Rigs",
    desc: "Custom heavy-duty squat racks and platform beds."
  },
  {
    id: 5,
    url: "/images/unnamed (4).webp",
    category: "Cardio Studio",
    title: "Endurance Lineup",
    desc: "Premium commercial treadmills with personalized metrics."
  },
  {
    id: 6,
    url: "/images/unnamed (5).webp",
    category: "Cardio Studio",
    title: "Ellipticals & Bikes",
    desc: "Low impact high-intensity cardiovascular station."
  },
  {
    id: 7,
    url: "/images/unnamed (6).webp",
    category: "Cardio Studio",
    title: "High-Speed Spin Studio",
    desc: "Equipped for our rhythm cycling and group events."
  },
  {
    id: 8,
    url: "/images/unnamed (7).webp",
    category: "Cardio Studio",
    title: "Stair Climbers",
    desc: "Intense glute and heart building station."
  },
  {
    id: 9,
    url: "/images/unnamed (8).webp",
    category: "CrossFit Arena",
    title: "Functional Training Rig",
    desc: "Multi-grip pull-up bars, rings, and suspension trainers."
  },
  {
    id: 10,
    url: "/images/unnamed (9).webp",
    category: "CrossFit Arena",
    title: "Kettlebell & Slam Ball Section",
    desc: "High-grade equipment for dynamic metabolic conditioning."
  },
  {
    id: 11,
    url: "/images/unnamed (10).webp",
    category: "CrossFit Arena",
    title: "Rowing Machines",
    desc: "Full-body ergometers for conditioning and intervals."
  },
  {
    id: 12,
    url: "/images/unnamed (11).webp",
    category: "CrossFit Arena",
    title: "Battle Ropes Zone",
    desc: "High intensity functional strength and fat burn station."
  },
  {
    id: 13,
    url: "/images/unnamed (12).webp",
    category: "Amenities",
    title: "A/C Chill Zone",
    desc: "Clean air conditioning circulating crisp clean air."
  },
  {
    id: 14,
    url: "/images/unnamed (13).webp",
    category: "Amenities",
    title: "Gents & Ladies Locker Rooms",
    desc: "Premium secure storage with individual lockers."
  },
  {
    id: 15,
    url: "/images/unnamed (14).webp",
    category: "Amenities",
    title: "Recovery Stations",
    desc: "Rehydrate with premium dynamic protein & energy options."
  },
  {
    id: 16,
    url: "/images/unnamed (15).webp",
    category: "Amenities",
    title: "Certified Consulting Cabin",
    desc: "Speak with coaches on body measurements and custom diets."
  }
];

type CategoryFilter = "All" | "Strength Zone" | "Cardio Studio" | "CrossFit Arena" | "Amenities";

const basePath = process.env.NODE_ENV === 'production' ? '/rj-fitness' : '';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === "All"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const categories: CategoryFilter[] = ["All", "Strength Zone", "Cardio Studio", "CrossFit Arena", "Amenities"];

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    const currentId = filteredImages[selectedImageIndex].id;
    const nextFilteredIndex = filteredImages.findIndex((img, idx) => {
      // Find the next index in filtered set
      return idx > selectedImageIndex;
    });

    if (nextFilteredIndex !== -1) {
      setSelectedImageIndex(nextFilteredIndex);
    } else {
      // Loop back to start
      setSelectedImageIndex(0);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else {
      // Loop to end
      setSelectedImageIndex(filteredImages.length - 1);
    }
  };

  return (
    <main className="bg-background text-foreground min-h-screen pt-28 pb-20 relative overflow-x-hidden">
      <Navbar />
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-primary font-bold text-xs uppercase tracking-widest">
              Visual Tour
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight"
          >
            INSIDE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-glow-primary">RJ FITNESS</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            Take a visual tour of Kuttanad's first premium A/C training facility. Modern biomechanical gear, clean amenities, and dynamic workout zones.
          </motion.p>
        </div>

        {/* Filter categories */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16 border-b border-white/5 pb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedImageIndex(null);
              }}
              className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(255,49,49,0.4)] scale-105"
                  : "glass-panel text-gray-400 hover:text-white hover:bg-white/5 border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => {
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={img.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-surface shadow-lg hover:shadow-2xl cursor-pointer hover:border-primary/50 transition-all duration-300"
                >
                  <img
                    src={`${basePath}${img.url}`}
                    alt={img.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-accent mb-2 flex items-center gap-1.5">
                      <Dumbbell className="w-3.5 h-3.5" />
                      {img.category}
                    </span>
                    <h3 className="text-white text-lg font-black tracking-tight mb-1">{img.title}</h3>
                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">{img.desc}</p>
                    <div className="absolute top-4 right-4 p-2.5 rounded-full bg-primary/90 text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-gray-500 text-lg">
            No images found in this category.
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
              aria-label="Close image details"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Slider container */}
            <div className="relative w-full max-w-5xl aspect-[4/3] max-h-[75vh] flex items-center justify-center">
              {/* Prev button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Central image card */}
              <motion.div 
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative rounded-3xl overflow-hidden border border-white/10 bg-surface flex items-center justify-center"
              >
                <img
                  src={`${basePath}${filteredImages[selectedImageIndex].url}`}
                  alt={filteredImages[selectedImageIndex].title}
                  className="w-full h-full object-contain"
                />
                
                {/* Bottom Overlay bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/20 p-6 md:p-8 flex flex-col justify-end">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-accent mb-2">
                    {filteredImages[selectedImageIndex].category}
                  </span>
                  <h2 className="text-white text-xl md:text-3xl font-black mb-2 leading-tight">
                    {filteredImages[selectedImageIndex].title}
                  </h2>
                  <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed">
                    {filteredImages[selectedImageIndex].desc}
                  </p>
                </div>
              </motion.div>

              {/* Next button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {/* Index counter */}
            <div className="text-gray-400 mt-6 font-medium">
              Image {selectedImageIndex + 1} of {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 mt-20 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} RJ Fitness. Premium Athlete Development Ecosystem in Kuttanad.</p>
      </footer>
    </main>
  );
}
