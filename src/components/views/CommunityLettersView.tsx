import React, { useState, useEffect } from 'react';
import { Letter, PageView } from '../../types';
import {
  Heart,
  Sparkles,
  Feather,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { AntiqueBookDivider } from '../AntiqueBookDivider';
import correoHeroImg from '../../../assets/img/CorreoHero.jpeg';

interface CommunityLettersViewProps {
  letters: Letter[];
  onLikeLetter?: (letterId: string) => void;
  setCurrentPage: (page: PageView) => void;
}

export const CommunityLettersView: React.FC<CommunityLettersViewProps> = ({
  letters,
  onLikeLetter,
  setCurrentPage,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('Todas');
  const [likedLetterIds, setLikedLetterIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const blurProgress = Math.min(1, Math.max(0, scrollY / 700));
  const currentBlur = (blurProgress * 12).toFixed(1);
  const currentScale = (1 + blurProgress * 0.05).toFixed(3);
  const currentBrightness = (1 - blurProgress * 0.12).toFixed(2);
  const currentOverlayOpacity = (blurProgress * 0.18).toFixed(2);

  // Filter letters that can be shared publicly
  const publicLetters = letters.filter(
    (letter) => letter.canShareAnonymously !== false
  );

  // Extract unique categories
  const categories = ['Todas', ...Array.from(new Set(publicLetters.map((l) => l.category)))];

  const filteredLetters =
    selectedFilter === 'Todas'
      ? publicLetters
      : publicLetters.filter((l) => l.category === selectedFilter);

  const handleLike = (letterId: string) => {
    if (!likedLetterIds.has(letterId)) {
      setLikedLetterIds((prev) => new Set(prev).add(letterId));
      onLikeLetter?.(letterId);
    }
  };

  return (
    <div className="relative">
      {/* CAPA DE FONDO ESTÁTICA CON BLUR GRADUAL Y LENTO EN SCROLL */}
      <div className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0 overflow-hidden">
        <img
          src={correoHeroImg}
          alt="Cartas de la comunidad"
          className="w-full h-full object-cover object-center will-change-transform"
          style={{
            filter: `blur(${currentBlur}px) brightness(${currentBrightness})`,
            transform: `scale(${currentScale})`,
            transition: 'filter 0.15s ease-out, transform 0.15s ease-out'
          }}
        />
        <div
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-150"
          style={{ opacity: Number(currentOverlayOpacity) }}
        />
      </div>

      {/* SECCIÓN HERO CON RECUADRO ESMERILADO A LA IZQUIERDA (GLASS CARD) */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-start pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-transparent z-10">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          <div className="lg:col-span-6 z-10 animate-fadeIn">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF5EF]/85 backdrop-blur-md border-2 border-[#8B5A2B]/35 shadow-xl space-y-6 text-center lg:text-left">
              {/* Top Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE0D3]/80 border border-[#C8B29B] text-xs font-cinzel text-[#8B5A2B] tracking-[0.2em] uppercase font-bold shadow-xs backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>» Cartas compartidas «</span>
              </div>

              {/* Main Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E120A] font-bold leading-tight tracking-wide drop-shadow-xs">
                Voces de nuestra comunidad ♡
              </h1>

              {/* Floating Heart & Fine Divider Ornament */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[#B35A5A]">
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
                <span className="text-sm font-bold leading-none select-none">♡</span>
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
              </div>

              {/* Descriptive Text */}
              <p className="font-serif text-base sm:text-lg text-[#2B1D11] leading-relaxed italic font-medium drop-shadow-xs">
                Un rincón íntimo donde resuenan las palabras sinceras de quienes abrieron su corazón. Leer a otros es recordar que en nuestros miedos, anhelos y aprendizajes nunca estamos solos.
              </p>

              {/* Quick Action Button */}
              <div className="pt-2 flex justify-center lg:justify-start">
                <button
                  onClick={() => {
                    setCurrentPage('letters');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#8B5A2B] text-white font-serif text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center cursor-pointer"
                >
                  ESCRIBIR MI CARTA
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEFINICIÓN DEL FILTRO SVG DE BORDE RESQUEBRAJADO ORGÁNICO */}
      <svg className="hidden" width="0" height="0" aria-hidden="true">
        <defs>
          <filter id="ragged-parchment-edge" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045 0.045" numOctaves="5" seed="12" result="roughNoise" />
            <feDisplacementMap in="SourceGraphic" in2="roughNoise" scale="18" xChannelSelector="R" yChannelSelector="G" result="tornShape" />
          </filter>
        </defs>
      </svg>

      {/* ENVOLVENTE CON SEPARACIÓN LATERAL DEL PAPIRO */}
      <div className="relative z-20 px-3 sm:px-6 md:px-10 lg:px-14 pt-8 pb-20">
        <div className="relative max-w-7xl mx-auto pt-16 pb-20 space-y-12">

          {/* LÁMINA ÚNICA DE PAPIRO RESQUEBRAJADO (SIN COSTURAS) */}
          <div
            className="absolute inset-1 sm:inset-2 z-0 pointer-events-none overflow-visible"
            style={{
              filter: 'drop-shadow(0 18px 28px rgba(25, 12, 5, 0.45)) drop-shadow(0 4px 10px rgba(25, 12, 5, 0.25))'
            }}
          >
            <div
              className="w-full h-full bg-[#EFE3D3] relative overflow-hidden"
              style={{ filter: 'url(#ragged-parchment-edge)' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  boxShadow: 'inset 0 0 65px 18px rgba(120, 72, 28, 0.28), inset 0 0 18px 4px rgba(90, 50, 15, 0.22)'
                }}
              />
              <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-multiply">
                <filter id="parchment-grain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" stitchTiles="stitch" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.52   0 0 0 0 0.33   0 0 0 0 0.16  0 0 0 0.45 0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#parchment-grain)" />
              </svg>
            </div>
          </div>

          {/* Section Header & Category Filters */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D8C5B0]/80 pb-6 max-w-5xl mx-auto">
              <div className="space-y-1">
                <span className="text-xs font-cinzel uppercase tracking-widest text-[#8B5A2B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Cartas Abiertas
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#382D2B] font-bold">
                  Ecos del corazón
                </h2>
                <p className="text-xs sm:text-sm text-[#7A6B5D] italic">
                  {publicLetters.length} {publicLetters.length === 1 ? 'carta compartida' : 'cartas compartidas con amor'}
                </p>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-all cursor-pointer whitespace-nowrap ${
                      selectedFilter === cat
                        ? 'bg-[#8B5A2B] text-white font-medium shadow-xs'
                        : 'bg-[#FAF5EF]/90 text-[#4A3E3D] border border-[#D8C5B0] hover:bg-[#EAE0D3]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Letters Grid */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            {filteredLetters.length === 0 ? (
              <div className="text-center py-16 px-4 bg-[#FAF5EF]/80 rounded-3xl border border-dashed border-[#C8B29B] space-y-4 max-w-2xl mx-auto">
                <Feather className="w-10 h-10 text-[#A88F76] mx-auto opacity-60" />
                <p className="font-serif text-lg text-[#382D2B] italic">
                  Aún no hay cartas compartidas en esta categoría.
                </p>
                <button
                  onClick={() => setSelectedFilter('Todas')}
                  className="text-xs font-serif text-[#8B5A2B] underline cursor-pointer"
                >
                  Ver todas las cartas
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {filteredLetters.map((letter) => {
                  const isLiked = likedLetterIds.has(letter.id);
                  return (
                    <article
                      key={letter.id}
                      className="bg-[#FAF5EF]/95 rounded-2xl border-2 border-[#E2D5C5] p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between group"
                    >
                      {/* Corner Vintage Fold */}
                      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                        <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#EFE5D9] rotate-45 border-b border-l border-[#C8B29B]/50" />
                      </div>

                      <div className="space-y-4">
                        {/* Category Pill and Date */}
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE0D3]/80 border border-[#C8B29B] text-[11px] font-serif text-[#8B5A2B] font-medium">
                            <span>♡</span>
                            <span>{letter.category}</span>
                          </span>

                          <div className="flex items-center gap-1.5 text-xs text-[#8A7968] italic font-serif">
                            <Calendar className="w-3.5 h-3.5 opacity-60" />
                            <span>{letter.createdAt}</span>
                          </div>
                        </div>

                        {/* Letter Content */}
                        <div className="pt-2">
                          <p className="font-serif text-[#382D2B] text-base sm:text-lg leading-relaxed italic whitespace-pre-line">
                            "{letter.content}"
                          </p>
                        </div>

                        {/* Author Signature */}
                        <div className="text-right pt-2">
                          <span className="font-serif text-sm font-semibold text-[#8B5A2B] tracking-wide">
                            — {letter.authorName || 'Anónimo'}
                          </span>
                        </div>
                      </div>

                      {/* Replies & Actions Section */}
                      <div className="mt-6 pt-4 border-t border-[#EAE0D3] space-y-4">
                        {/* Editorial Response from AlaSerguía if present */}
                        {letter.replies && letter.replies.length > 0 && (
                          <div className="p-4 rounded-xl bg-[#F4EBE1]/90 border border-[#E2D5C5] space-y-2">
                            <div className="flex items-center gap-1.5 text-[11px] font-cinzel text-[#8B5A2B] font-bold uppercase tracking-wider">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Respuesta de AlaSerguía</span>
                            </div>
                            {letter.replies.map((reply, idx) => (
                              <p
                                key={idx}
                                className="font-serif text-xs sm:text-sm text-[#4A3E3D] italic leading-relaxed"
                              >
                                "{reply}"
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Card Footer: Likes Counter and Interaction */}
                        <div className="flex items-center justify-between pt-1">
                          <button
                            onClick={() => handleLike(letter.id)}
                            className={`inline-flex items-center gap-1.5 text-xs font-serif transition-colors cursor-pointer py-1 px-2.5 rounded-full ${
                              isLiked
                                ? 'text-[#B35A5A] bg-[#B35A5A]/10 font-bold'
                                : 'text-[#8A7968] hover:text-[#B35A5A] hover:bg-[#FAF5EF]'
                            }`}
                            title="Enviar amor a esta carta"
                          >
                            <Heart
                              className={`w-4 h-4 transition-transform ${
                                isLiked ? 'fill-[#B35A5A] text-[#B35A5A] scale-110' : ''
                              }`}
                            />
                            <span>{letter.heartsCount} {letter.heartsCount === 1 ? 'corazón' : 'corazones'}</span>
                          </button>

                          <div className="text-[11px] text-[#A88F76] font-serif italic">
                            Buzón del Alma
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <AntiqueBookDivider />

          {/* BANNER INFERIOR DE INVITACIÓN */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl mx-auto p-8 sm:p-12 bg-[#FAF5EF]/90 rounded-3xl border-2 border-[#D8C5B0] text-center space-y-6 shadow-md relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0D3]/80 border border-[#C8B29B] text-xs font-serif text-[#8B5A2B]">
                <Feather className="w-3.5 h-3.5" />
                <span>Tu voz también cuenta</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#1E120A] font-bold">
                ¿Sentís ganas de compartir tu historia?
              </h3>

              <p className="font-serif text-base text-[#4A3E3D] max-w-xl mx-auto italic leading-relaxed">
                Las palabras sanan cuando se dejan salir al mundo. Si hay algo que hoy late en tu pecho, dejalo en nuestro buzón. Podés elegir que sea anónimo o solo para ser leído en privado.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setCurrentPage('letters');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#8B5A2B] text-white font-serif text-sm font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all cursor-pointer"
                >
                  ESCRIBIR MI CARTA
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
