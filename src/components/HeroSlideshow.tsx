import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Trees,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  BookOpen,
} from 'lucide-react';

interface HeroSlideshowProps {
  onNavigate: (route: PageRoute, params?: any) => void;
}

interface SlideItem {
  id: string;
  badge: string;
  badgeIcon: React.ReactNode;
  title: string;
  titleHighlight: string;
  subtitle: string;
  bgGradient: string;
  borderColor: string;
  imageSrc: string;
  ctaText: string;
  ctaRoute: PageRoute;
  secondaryCtaText?: string;
  secondaryCtaRoute?: PageRoute;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: SlideItem[] = [
    {
      id: 'slide-1',
      badge: 'POWER ELECTRONICS & WIDE-BANDGAP SEMICONDUCTORS',
      badgeIcon: <Cpu className="w-3.5 h-3.5 text-cyan-400" />,
      title: 'Gallium Nitride (GaN)',
      titleHighlight: '& High-Frequency Solar Inverters',
      subtitle: 'Designing 5kW GaN-on-SiC solar micro-inverters with 98.6% peak efficiency, thermal benchmarking, and active gate driving.',
      bgGradient: 'from-slate-950 via-cyan-950/40 to-slate-900',
      borderColor: 'border-cyan-500/30',
      imageSrc: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      ctaText: 'Explore GaN Research Project',
      ctaRoute: 'projects',
      secondaryCtaText: 'Academic Background',
      secondaryCtaRoute: 'about',
    },
    {
      id: 'slide-2',
      badge: 'FORESTRY GIS & REMOTE SENSING TELEMETRY',
      badgeIcon: <Trees className="w-3.5 h-3.5 text-emerald-400" />,
      title: 'Satellite Remote Sensing',
      titleHighlight: '& Coastal Bio-Shield Ecosystems',
      subtitle: 'Multispectral NDVI telemetry, Sentinel-2 canopy density modeling, and hydrodynamic wave attenuation in estuarine mangrove belts.',
      bgGradient: 'from-slate-950 via-emerald-950/40 to-slate-900',
      borderColor: 'border-emerald-500/30',
      imageSrc: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      ctaText: 'View Forestry Research',
      ctaRoute: 'projects',
      secondaryCtaText: 'Read Research Papers',
      secondaryCtaRoute: 'blogs',
    },
    {
      id: 'slide-3',
      badge: 'ACADEMIC RESOURCES & STUDY VAULT',
      badgeIcon: <GraduationCap className="w-3.5 h-3.5 text-purple-400" />,
      title: 'EEE, Forestry & CSE',
      titleHighlight: 'Educational Books & Drive Links',
      subtitle: 'Direct access to curated engineering textbooks, reference manuals, and lecture notes with human verification security protection.',
      bgGradient: 'from-slate-950 via-purple-950/40 to-slate-900',
      borderColor: 'border-purple-500/30',
      imageSrc: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
      ctaText: 'Open Study Materials Vault',
      ctaRoute: 'study-materials',
      secondaryCtaText: 'Contact Engr. Ayman',
      secondaryCtaRoute: 'contact',
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const slide = slides[currentSlide];

  return (
    <div
      className="relative rounded-3xl overflow-hidden border backdrop-blur-2xl transition-all duration-700 shadow-2xl group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Dynamic Background Container */}
      <div className={`relative p-5 sm:p-10 lg:p-12 bg-gradient-to-br ${slide.bgGradient} ${slide.borderColor}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 font-mono text-[11px] sm:text-xs font-bold shadow-md max-w-full truncate">
              {slide.badgeIcon}
              <span className="truncate">{slide.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {slide.title} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                {slide.titleHighlight}
              </span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-slate-300 font-sans leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate(slide.ctaRoute)}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white font-mono text-xs font-bold transition-all transform hover:scale-105 shadow-lg shadow-pink-500/20 cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {slide.secondaryCtaText && slide.secondaryCtaRoute && (
                <button
                  onClick={() => onNavigate(slide.secondaryCtaRoute)}
                  className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center min-h-[44px]"
                >
                  {slide.secondaryCtaText}
                </button>
              )}
            </div>
          </div>

          {/* Right Featured Banner Image Card */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group/img">
              <img
                src={slide.imageSrc}
                alt={slide.title}
                className="w-full h-48 sm:h-64 lg:h-72 object-cover transition-transform duration-700 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/90 border border-slate-800/80 backdrop-blur-md text-[11px] font-mono text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-cyan-300 font-bold truncate">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Interactive Portfolio Highlight</span>
                </span>
                <span className="text-[10px] text-slate-400 shrink-0 ml-2">AYMAN ULLAH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-all hover:scale-110 cursor-pointer shadow-lg z-20 min-w-[40px] min-h-[40px] flex items-center justify-center"
          title="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-all hover:scale-110 cursor-pointer shadow-lg z-20 min-w-[40px] min-h-[40px] flex items-center justify-center"
          title="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-pink-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
