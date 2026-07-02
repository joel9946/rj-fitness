"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, User, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleMobileNavClick = (id: string, e: React.MouseEvent) => {
    setMobileOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const basePath = '';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-panel py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a 
          href={`${basePath}/`} 
          onClick={handleHomeClick} 
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-primary/40 group-hover:scale-110 transition-transform duration-300 bg-surface">
            <img 
              src={`${basePath}/images/WhatsApp Image 2026-06-20 at 1.17.33 PM.jpeg`} 
              alt="RJ Fitness Logo" 
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-xl font-black tracking-tighter text-glow-primary text-primary">RJ FITNESS</span>
        </a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase">
          <a 
            href={`${basePath}/`} 
            onClick={handleHomeClick} 
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Home
          </a>
          <a 
            href={`${basePath}/#about`} 
            onClick={(e) => handleNavClick("about", e)} 
            className="hover:text-primary transition-colors cursor-pointer"
          >
            About Us
          </a>
          <a 
            href={`${basePath}/#programs`} 
            onClick={(e) => handleNavClick("programs", e)} 
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Programs
          </a>
          <a 
            href={`${basePath}/#memberships`} 
            onClick={(e) => handleNavClick("memberships", e)} 
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Memberships
          </a>
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
            <a 
              href={`${basePath}/`} 
              onClick={(e) => { setMobileOpen(false); handleHomeClick(e); }} 
              className="text-2xl font-bold hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </a>
            <a 
              href={`${basePath}/#about`} 
              onClick={(e) => handleMobileNavClick("about", e)} 
              className="text-2xl font-bold hover:text-primary transition-colors cursor-pointer"
            >
              About Us
            </a>
            <a 
              href={`${basePath}/#programs`} 
              onClick={(e) => handleMobileNavClick("programs", e)} 
              className="text-2xl font-bold hover:text-primary transition-colors cursor-pointer"
            >
              Programs
            </a>
            <a 
              href={`${basePath}/#memberships`} 
              onClick={(e) => handleMobileNavClick("memberships", e)} 
              className="text-2xl font-bold hover:text-primary transition-colors cursor-pointer"
            >
              Memberships
            </a>
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
