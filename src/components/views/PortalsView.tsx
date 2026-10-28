import React, { useState } from 'react';
import { Portal } from '../../types';
import { Sparkles, BookOpen, Sun, Heart, Feather, ArrowRight, Eye } from 'lucide-react';
import portal1HomeImg from '../../../assets/img/Portal1_Home.jpeg';

interface PortalsViewProps {
  portals: Portal[];
  onOpenBookModal: (portal: Portal) => void;
  selectedPortalId?: string;
}

export const PortalsView: React.FC<PortalsViewProps> = ({
  portals,
  onOpenBookModal,
  selectedPortalId,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(selectedPortalId || 'all');

  const filteredPortals = activeFilter === 'all'
    ? portals
    : portals.filter((p) => p.id === activeFilter);

  return (
    <div className="bg-[#FAF5EF] min-h-[100dvh]">
      {/* Fondo estático de la imagen con overlay lateral */}
      <div className="fixed top-0 right-0 w-full lg:w-3/5 h-[100dvh] pointer-events-none z-0 overflow-hidden">
        <img
          src={portal1HomeImg}
          alt="Portales Hero"
          className="w-full h-full object-cover object-right opacity-90"
        />
        {/* Mobile vertical gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5EF]/90 via-[#FAF5EF]/60 to-transparent lg:hidden pointer-events-none z-10" />
        {/* Desktop horizontal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF5EF] via-[#FAF5EF]/85 sm:via-[#FAF5EF]/70 to-transparent pointer-events-none z-10" />
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-start pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left max-w-xl mx-auto lg:mx-0 relative z-10 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE0D3]/90 border border-[#C8B29B] text-xs font-cinzel text-[#8B5A2B] tracking-[0.2em] uppercase font-bold shadow-xs backdrop-blur-xs">
              <span>»</span> Santuarios de Sabiduría <span>«</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1E120A] font-bold leading-tight tracking-wide drop-shadow-xs">
              Portales de Luz y Consciencia
            </h1>

            <div className="flex items-center justify-center lg:justify-start gap-3 text-[#B35A5A]">
              <span className="h-[1px] w-12 bg-[#C8B29B]" />
              <span className="text-lg">♡</span>
              <span className="h-[1px] w-12 bg-[#C8B29B]" />
            </div>

            <p className="font-serif text-base sm:text-lg text-[#382D2B] leading-relaxed italic font-medium drop-shadow-xs">
              Cada portal es una puerta de entrada a un universo temático diseñado para acompañarte en distintas etapas de tu vida.
            </p>
          </div>
        </div>
      </section>

      {/* SUBSEQUENT SECTIONS WRAPPER FOR PARALLAX SLIDE-OVER EFFECT */}
      <div className="relative z-10 bg-[#FAF5EF] pt-16 pb-20 border-t border-[#E2D5C5] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-[#E2CEB8] pb-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#8B5A2B] text-white shadow-xs'
                  : 'bg-[#FAF5EF] text-[#5C4D4B] border border-[#D8C5B0] hover:bg-[#EAE0D3]'
              }`}
            >
              TODOS LOS PORTALES
            </button>

            {portals.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveFilter(p.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all ${
                  activeFilter === p.id
                    ? 'bg-[#8B5A2B] text-white shadow-xs'
                    : 'bg-[#FAF5EF] text-[#5C4D4B] border border-[#D8C5B0] hover:bg-[#EAE0D3]'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Portals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPortals.map((portal) => (
              <div
                key={portal.id}
                className="bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between book-shadow"
              >
                <div>
                  {/* Image & Chapter Motto */}
                  <div className="relative h-60 overflow-hidden border-b border-[#E2D5C5]">
                    <img
                      src={portal.illustration}
                      alt={portal.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="text-[10px] font-cinzel text-[#EAE0D3] uppercase tracking-widest">
                        {portal.chapterTitle}
                      </span>
                      <h3 className="font-serif text-2xl font-bold">
                        {portal.title}
                      </h3>
                    </div>
                  </div>

                  {/* Portal Info */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-[#6A5A4D] font-serif leading-relaxed italic">
                      &ldquo;{portal.chapterMotto}&rdquo;
                    </p>
                    <p className="text-xs text-[#5C4D4B] font-serif leading-relaxed">
                      {portal.description}
                    </p>

                    {/* Features Pills */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {portal.features.map((f, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5] text-xs space-y-0.5"
                        >
                          <p className="font-bold text-[#382D2B]">{f.title}</p>
                          <p className="text-[10px] text-[#7A6B5D]">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onOpenBookModal(portal)}
                    className="w-full py-3 px-4 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center cursor-pointer"
                  >
                    ABRIR LIBRO DE PORTAL
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

