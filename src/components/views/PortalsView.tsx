import React, { useState } from 'react';
import { Portal } from '../../types';
import { Sparkles, BookOpen, Sun, Heart, Feather, ArrowRight, Eye } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-10 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest flex items-center justify-center gap-1">
          <span>»»</span> Santuarios de Sabiduría <span>««</span>
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#382D2B] font-bold">
          Portales de Luz y Consciencia
        </h1>
        <div className="w-16 h-0.5 bg-[#C8B29B] mx-auto" />
        <p className="font-serif text-sm sm:text-base text-[#6A5A4D] leading-relaxed">
          Cada portal es una puerta de entrada a un universo temático diseñado para acompañarte en distintas etapas de tu vida.
        </p>
      </div>

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
                className="w-full py-3 px-4 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                ABRIR LIBRO DE PORTAL
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
