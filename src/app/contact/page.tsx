"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Send, 
  Star, 
  User, 
  CheckCircle2,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "Personal Training",
    message: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const programParam = params.get("program");
      if (programParam) {
        setFormData((prev) => ({ ...prev, program: programParam }));
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messageText = `Hello RJ Fitness Kuttanad! I would like to reserve a VIP entry.\n\nHere are my details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProgram Interest: ${formData.program}\nGoals/Message: ${formData.message}`;
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/917356914004?text=${encodeURIComponent(messageText)}`, "_blank");
    setFormSubmitted(true);
  };

  return (
    <main className="bg-background text-foreground min-h-screen pt-28 pb-20 relative overflow-x-hidden">
      <Navbar />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/20 mb-6"
          >
            <Clock className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-primary font-bold text-xs uppercase tracking-widest">
              Get in Touch Today
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight"
          >
            CONTACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-glow-primary">RJ FITNESS</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            Ready to take the first step towards a premium fitness experience? Connect with our founders and trainers, or drop by during operating hours.
          </motion.p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          
          {/* Card 1: Call Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-4 bg-background/60 rounded-2xl border border-white/5 mb-6 text-primary group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Call or WhatsApp</h3>
            <p className="text-gray-400 mb-6 text-sm">Direct lines to our trainers and staff for immediate assistance.</p>
            <div className="space-y-2">
              <a href="tel:7356914004" className="block text-lg font-black text-accent hover:underline">+91 73569 14004</a>
              <a href="tel:8129160134" className="block text-lg font-black text-accent hover:underline">+91 81291 60134</a>
            </div>
          </motion.div>

          {/* Card 2: Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-4 bg-background/60 rounded-2xl border border-white/5 mb-6 text-accent group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Our Address</h3>
            <p className="text-gray-400 mb-4 text-sm">Find us right above Shymas Honda Showroom near Pallikuttumma Bridge.</p>
            <p className="text-gray-300 font-semibold text-sm leading-relaxed">
              1st Floor, Moolayil Complex, AC Road,<br />
              Pallikuttumma Bridge, Kuttanad,<br />
              Kerala 688504
            </p>
          </motion.div>

          {/* Card 3: Timings & Rating */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-yellow-400/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-4 bg-background/60 rounded-2xl border border-white/5 mb-6 text-yellow-400 group-hover:scale-110 transition-transform">
              <Star className="w-8 h-8 fill-yellow-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Opening Hours</h3>
            <p className="text-gray-300 text-base font-black mb-1">Mon - Sun: 5:00 PM - 9:30 PM</p>
            <p className="text-gray-400 text-xs mb-4">Peak hours: Mon-Fri 7:00 PM</p>
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 text-sm font-bold mt-2">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span>4.8 Rating (39 Google Reviews)</span>
            </div>
          </motion.div>

        </div>

        {/* Lower Content Grid: Map & Form */}
        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Map & Socials - 5 Cols */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Embedded interactive map */}
            <div className="glass-panel border-white/5 rounded-3xl p-4 overflow-hidden h-[360px] relative shadow-xl">
              <iframe
                title="RJ Fitness Location Map"
                src="https://maps.google.com/maps?q=RJ%20Fitness%20Moolayil%20Complex%20AC%20Road%20Pallikuttumma%20Bridge%20Kuttanad&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="border-0 rounded-2xl opacity-90 grayscale invert filter"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Founders & Socials */}
            <div className="glass-panel border-white/5 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-black text-white border-b border-white/5 pb-4">GYM OWNERSHIP</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-primary font-black">
                    RV
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Rijo Varghese</h4>
                    <p className="text-gray-400 text-xs">Certified Personal Trainer & Founder</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-accent font-black">
                    JP
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Jino Pathil</h4>
                    <p className="text-gray-400 text-xs">Certified Personal Trainer & Co-Founder</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 flex flex-col gap-4">
                <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400">Social Connections</h4>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/rj_fitness4life"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-white/5 text-gray-300 hover:text-pink-400 transition-colors border-white/10 text-xs font-bold"
                  >
                    <Instagram className="w-4 h-4 text-pink-400" />
                    @rj_fitness4life
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-white/5 text-gray-300 hover:text-blue-400 transition-colors border-white/10 text-xs font-bold"
                  >
                    <Facebook className="w-4 h-4 text-blue-400" />
                    Rijo Varghese
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form - 7 Cols */}
          <div className="lg:col-span-7">
            <div className="glass-panel border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
              
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-black mb-2 text-white">RESERVE A VIP ENTRY</h3>
                    <p className="text-gray-400 mb-8 text-sm">Fill in your details below, and one of our founders will get back to you to schedule your custom consultation.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Your Name</label>
                          <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            required
                            className="w-full bg-background/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-primary/50 transition-colors text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Email Address</label>
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            required
                            className="w-full bg-background/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-primary/50 transition-colors text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Phone Number</label>
                          <input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="9998887776"
                            required
                            className="w-full bg-background/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-primary/50 transition-colors text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="program" className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Program Interest</label>
                          <div className="relative">
                            <select
                              id="program"
                              value={formData.program}
                              onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                              className="w-full bg-[#121212] border border-white/30 hover:border-primary rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 text-sm appearance-none cursor-pointer pr-10"
                            >
                              <option className="bg-[#121212] text-white" value="Crossfit">CrossFit Arena</option>
                              <option className="bg-[#121212] text-white" value="Aerobics">Aerobics</option>
                              <option className="bg-[#121212] text-white" value="Cycling">Cycling & Spin</option>
                              <option className="bg-[#121212] text-white" value="Zumba">Dance Fitness & Zumba</option>
                              <option className="bg-[#121212] text-white" value="Yoga">Yoga Classes</option>
                              <option className="bg-[#121212] text-white" value="Personal Training">Personal Training</option>
                              <option className="bg-[#121212] text-white" value="Adult Sports">Adult Sports</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                              <ChevronDown className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Message / Goals</label>
                        <textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your fitness targets..."
                          className="w-full bg-background/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-primary/50 transition-colors text-sm resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-red-600 text-white font-bold uppercase tracking-wider py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,49,49,0.3)] hover:shadow-[0_0_30px_rgba(255,49,49,0.5)]"
                      >
                        Send Reservation Request
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 flex flex-col items-center justify-center"
                  >
                    <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 mb-6 animate-bounce">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3">REQUEST SUBMITTED!</h3>
                    <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-8">
                      Thank you, <span className="text-white font-bold">{formData.name}</span>. Rijo Varghese or Jino Pathil will reach out via phone ({formData.phone}) or email within the next 24 hours to schedule your VIP session.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", program: "Personal Training", message: "" });
                      }}
                      className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-300 text-sm font-bold"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 mt-20 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} RJ Fitness. Premium Athlete Development Ecosystem in Kuttanad.</p>
      </footer>
    </main>
  );
}
