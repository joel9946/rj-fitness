"use client";

import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Shield, 
  Target, 
  Flame, 
  Dumbbell, 
  Activity, 
  Heart, 
  UserCheck, 
  Trophy, 
  Sparkles,
  Star,
  MapPin,
  Phone
} from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  const aboutY = useTransform(scrollYProgress, [0.1, 0.3], ["10%", "0%"]);
  const aboutOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  const programsY = useTransform(scrollYProgress, [0.25, 0.45], ["10%", "0%"]);
  
  const handleQuickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const phone = data.get("phone") as string;
    const message = `Hello RJ Fitness Kuttanad! I am interested in joining the gym.\n\nHere are my details:\nName: ${name}\nPhone: ${phone}`;
    window.open(`https://wa.me/917356914004?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Custom RJ Fitness program data
  const programs = [
    {
      title: "Crossfit",
      desc: "High-intensity interval training blending gymnastics, weightlifting, and cardio in a competitive, heart-pounding environment.",
      icon: <Zap className="w-10 h-10 text-yellow-400" />,
      color: "hover:border-yellow-400/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]"
    },
    {
      title: "Aerobics",
      desc: "High-energy choreographed cardio sessions designed to burn fat, boost heart health, and build stamina.",
      icon: <Activity className="w-10 h-10 text-red-500" />,
      color: "hover:border-red-500/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]"
    },
    {
      title: "Cycling & Spin",
      desc: "Incredible simulated indoor bike races led by coaches, pushing cardiovascular endurance to the absolute limit.",
      icon: <Flame className="w-10 h-10 text-orange-500" />,
      color: "hover:border-orange-500/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]"
    },
    {
      title: "Dance Fitness & Zumba",
      desc: "Rhythmic full-body workout fusing Latin dance steps with aerobic movements for maximum fun and weight loss.",
      icon: <Sparkles className="w-10 h-10 text-purple-400" />,
      color: "hover:border-purple-400/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(192,132,252,0.2)]"
    },
    {
      title: "Yoga Classes",
      desc: "Improve core strength, posture, flexibility, and dynamic mental balance through curated breathing and postures.",
      icon: <Heart className="w-10 h-10 text-emerald-400" />,
      color: "hover:border-emerald-400/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]"
    },
    {
      title: "Personal Training",
      desc: "1-on-1 sessions with elite level certified coaches focusing on biomechanics, target planning, and custom diets.",
      icon: <UserCheck className="w-10 h-10 text-cyan-400" />,
      color: "hover:border-cyan-400/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
    },
    {
      title: "Adult Sports",
      desc: "Recreational sports conditioning, agility drills, and physical training designed specifically for adults.",
      icon: <Trophy className="w-10 h-10 text-blue-400" />,
      color: "hover:border-blue-400/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]"
    },
    {
      title: "Co-Ed & Ladies Slots",
      desc: "Convenient combined and ladies-only timing options guided by certified male and female training experts.",
      icon: <Shield className="w-10 h-10 text-pink-400" />,
      color: "hover:border-pink-400/50",
      glow: "group-hover:shadow-[0_0_30px_rgba(244,114,182,0.2)]"
    }
  ];

  return (
    <main ref={containerRef} className="bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* 1. Hero Section (Parallax Background) */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full z-0">
          <HeroCarousel />
        </motion.div>
        
        <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-12 items-center z-10 relative mt-16 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel w-fit border-primary/20">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-primary font-bold text-sm tracking-wider uppercase">
                4.8 Google Rated Premium Gym
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter">
              RJ FITNESS <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-glow-primary">
                KUTTANAD
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 font-medium leading-relaxed max-w-lg">
              The first premium A/C GYM in Kuttanad. Experience state-of-the-art facilities, certified trainers, and dedicated ladies & gents slots.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4 w-full">
              <Link 
                href="/contact"
                className="w-full sm:w-auto bg-primary hover:bg-white hover:text-primary text-white px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(255,49,49,0.3)] hover:shadow-[0_0_40px_rgba(255,49,49,0.6)] hover:scale-105 text-center"
              >
                Book Session
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button 
                onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto glass-panel px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Explore Programs
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      </section>

      {/* 2. About Us Section */}
      <section id="about" className="py-32 relative z-20 bg-background min-h-[80vh] flex items-center">
        <motion.div 
          style={{ y: aboutY, opacity: aboutOpacity }}
          className="container mx-auto px-6 max-w-7xl"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tighter">
                FORGED IN <span className="text-primary text-glow-primary">PASSION & STRENGTH</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg mb-8">
                RJ Fitness is Kuttanad's pioneer premium A/C workout hub. Owned and operated by certified professionals, we offer tailored workout environments for both gents and ladies with top-notch training tools and clean, spacious interiors.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Fully Air-Conditioned Spaces",
                  "Certified Male & Female Trainers",
                  "Ladies Dedicated Timings",
                  "High-End Functional Rigs",
                  "Comprehensive Group Workouts",
                  "Custom Diet & Meal Planners"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent h-5 w-5 flex-shrink-0" />
                    <span className="text-base font-semibold text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-surface border border-white/5 overflow-hidden relative shadow-2xl glass-panel flex items-center justify-center group pl-8">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                 <motion.img 
                   src="/images/cyber_kettlebell.png" 
                   alt="RJ Fitness Strength Kettlebell"
                   className="w-[85%] h-[85%] object-contain relative z-10 drop-shadow-[0_0_40px_rgba(255,49,49,0.5)]"
                   animate={{ 
                     y: [0, -20, 0],
                     rotate: [0, 4, -4, 0]
                   }}
                   transition={{ 
                     repeat: Infinity, 
                     duration: 5, 
                     ease: "easeInOut" 
                   }}
                 />
              </div>
              <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 glass-panel p-6 md:p-8 rounded-2xl border border-primary/20 backdrop-blur-xl scale-75 md:scale-100 origin-bottom-left">
                 <p className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter">4.8 ★</p>
                 <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">39+ Google Reviews</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Programs Section */}
      <section id="programs" className="py-32 relative z-20 bg-surface">
        <motion.div 
          style={{ y: programsY }}
          className="container mx-auto px-6 max-w-7xl"
        >
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4">
              CHOOSE YOUR <span className="text-accent text-glow-accent">WEAPON</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Our structured regimes designed to accelerate your transformations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((prog, index) => (
              <ClassCard 
                key={index}
                icon={prog.icon}
                title={prog.title}
                desc={prog.desc}
                color={prog.color}
                glow={prog.glow}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. Memberships Section */}
      <section id="memberships" className="py-32 bg-background relative z-20">
         <div className="container mx-auto px-6 max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6">
                CLAIM YOUR <span className="text-primary text-glow-primary">TIER</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-xl mb-16">
                Flexible memberships for standard strength or all-inclusive group classes.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Standard */}
                <div className="glass-panel p-8 rounded-3xl border border-white/5 text-left hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">RJ Core</h3>
                  <div className="text-4xl font-black mb-6">₹1,999<span className="text-lg text-gray-400 font-medium">/mo</span></div>
                  <ul className="space-y-4 mb-8 text-gray-400">
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent"/> Full Gym Floor Access</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent"/> Standard Cardio & Strength</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent"/> Locker Room Usage</li>
                    <li className="flex items-center gap-3 opacity-50"><CheckCircle2 className="w-5 h-5"/> Group Classes Excluded</li>
                  </ul>
                  <Link href="/contact?program=Adult%20Sports" className="block w-full text-center py-4 rounded-full font-bold bg-white/5 hover:bg-white/10 transition-colors uppercase tracking-wider text-xs">Inquire Now</Link>
                </div>

                {/* Pro (Highlighted) */}
                <div className="glass-panel p-8 rounded-3xl border border-primary/50 text-left transform md:-translate-y-4 shadow-[0_0_30px_rgba(255,49,49,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">Best Value</div>
                  <h3 className="text-2xl font-bold mb-2 text-primary">RJ Active</h3>
                  <div className="text-4xl font-black mb-6">₹2,999<span className="text-lg text-gray-400 font-medium">/mo</span></div>
                  <ul className="space-y-4 mb-8 text-white">
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> All RJ Core Privileges</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> All Group Workouts (Zumba, Spin)</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> CrossFit & Yoga Arenas</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Trainer Support on Floor</li>
                  </ul>
                  <Link href="/contact?program=Crossfit" className="block w-full text-center py-4 rounded-full font-bold bg-primary hover:bg-red-600 text-white transition-colors shadow-[0_0_15px_rgba(255,49,49,0.3)] uppercase tracking-wider text-xs">Start Trial</Link>
                </div>

                {/* Elite */}
                <div className="glass-panel p-8 rounded-3xl border border-white/5 text-left hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">RJ Elite PT</h3>
                  <div className="text-4xl font-black mb-6">₹5,999<span className="text-lg text-gray-400 font-medium">/mo</span></div>
                  <ul className="space-y-4 mb-8 text-gray-400">
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent"/> All RJ Active Privileges</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent"/> 8 Personal Training Sessions</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent"/> Nutrition & Diet Coaching</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent"/> Custom Progress Tracking</li>
                  </ul>
                  <Link href="/contact?program=Personal%20Training" className="block w-full text-center py-4 rounded-full font-bold bg-white/5 hover:bg-white/10 transition-colors uppercase tracking-wider text-xs">Inquire Now</Link>
                </div>
              </div>
            </motion.div>
         </div>
      </section>

      {/* 5. Gallery Teaser Section */}
      <section className="py-32 bg-surface border-t border-white/5 relative z-20">
         <div className="container mx-auto px-6 max-w-7xl text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
               INSIDE <span className="text-accent text-glow-accent">RJ FITNESS</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-16">
               Get a glimpse of our premium equipment, workout zones, and team.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
               {[
                 "/images/unnamed.webp",
                 "/images/unnamed (1).webp",
                 "/images/unnamed (2).webp",
                 "/images/unnamed (3).webp"
               ].map((imgUrl, i) => (
                  <div key={i} className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black">
                     <img 
                       src={imgUrl} 
                       alt="RJ Fitness interior preview" 
                       className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 justify-center">
                        <span className="text-xs uppercase font-bold tracking-widest text-accent">View Zoomed</span>
                     </div>
                  </div>
               ))}
            </div>

            <Link 
              href="/gallery"
              className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105"
            >
               Explore Full Gallery
               <ArrowRight className="w-5 h-5" />
            </Link>
         </div>
      </section>

      {/* 6. Quick Location & Contact Teaser */}
      <section className="py-24 bg-background border-t border-white/5 relative z-20">
         <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
            <div>
               <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">FIND US</h2>
               <div className="space-y-6 text-gray-300">
                  <div className="flex items-start gap-4">
                     <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                     <p className="text-lg leading-relaxed">
                        FIRST FLOOR, MOOLAYIL COMPLEX, AC ROAD,<br />
                        Pallikuttumma Bridge, above SHYMAS HONDA SHOWROOM,<br />
                        Kuttanad Taluk, Kerala 688504
                     </p>
                  </div>
                  <div className="flex items-center gap-4">
                     <Phone className="w-6 h-6 text-accent flex-shrink-0" />
                     <p className="text-lg font-bold">
                        +91 7356914004 / +91 8129160134
                     </p>
                  </div>
               </div>
               <div className="mt-8 flex gap-4">
                  <Link 
                    href="/contact"
                    className="bg-primary hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold transition-colors"
                  >
                     View Map & Hours
                  </Link>
               </div>
            </div>
            
            <div className="glass-panel border-white/5 rounded-3xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-4">READY TO COMMIT?</h3>
              <p className="text-gray-400 mb-6">Enter your name and number. We'll connect with you on WhatsApp right away.</p>
              
              <form className="flex flex-col gap-4" onSubmit={handleQuickSubmit}>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  className="bg-background/50 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  required
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Your Phone Number" 
                  className="bg-background/50 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  required
                />
                <button type="submit" className="bg-white text-black font-bold uppercase tracking-wider py-4 rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  Message on WhatsApp
                </button>
              </form>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-white/5 relative z-20 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} RJ Fitness. Premium Fitness and Health Ecosystem in Kuttanad.</p>
      </footer>

    </main>
  );
}

function ClassCard({ icon, title, desc, color, glow }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`glass-panel p-8 rounded-3xl border border-white/5 transition-all duration-500 group flex flex-col items-center text-center ${color} ${glow} hover:-translate-y-2`}
    >
      <div className="mb-6 p-4 bg-background/50 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
