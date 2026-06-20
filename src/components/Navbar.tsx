"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-panel py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-primary/40 group-hover:scale-110 transition-transform duration-300 bg-surface">
            <img 
              src="/images/WhatsApp Image 2026-06-20 at 1.17.33 PM.jpeg" 
              alt="RJ Fitness Logo" 
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-xl font-black tracking-tighter text-glow-primary text-primary">RJ FITNESS</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/#about" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/#programs" className="hover:text-primary transition-colors">Programs</Link>
          <Link href="/#memberships" className="hover:text-primary transition-colors">Memberships</Link>
          <Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact" className="bg-primary hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-bold transition-colors text-sm shadow-[0_0_15px_rgba(255,49,49,0.4)] uppercase tracking-wider">
            Book Session
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-white hover:text-primary transition-colors focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/5 overflow-hidden flex flex-col items-center justify-start pt-12 gap-8 z-50"
          >
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-2xl font-bold hover:text-primary transition-colors">Home</Link>
            <Link href="/#about" onClick={() => setMobileOpen(false)} className="text-2xl font-bold hover:text-primary transition-colors">About Us</Link>
            <Link href="/#programs" onClick={() => setMobileOpen(false)} className="text-2xl font-bold hover:text-primary transition-colors">Programs</Link>
            <Link href="/#memberships" onClick={() => setMobileOpen(false)} className="text-2xl font-bold hover:text-primary transition-colors">Memberships</Link>
            <Link href="/gallery" onClick={() => setMobileOpen(false)} className="text-2xl font-bold hover:text-primary transition-colors">Gallery</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-2xl font-bold hover:text-primary transition-colors">Contact</Link>
            
            <div className="flex flex-col items-center gap-6 mt-8">
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="bg-primary hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-colors text-lg shadow-[0_0_15px_rgba(255,49,49,0.4)] uppercase tracking-wider">
                Book Session
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
