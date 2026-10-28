import React, { useState, useEffect } from 'react';
import { PageView, Portal, Product } from '../../types';
import {
  ArrowRight,
  Sparkles,
  Heart,
  MessageCircle,
  Eye
} from 'lucide-react';
import { AntiqueBookDivider } from '../AntiqueBookDivider';
import sofiaKaelImg from '../../../assets/img/Portal3_libro.jpeg';
import iconoVideos from '../../../assets/img/Icono_Videos.jpeg';
import iconoArticulos from '../../../assets/img/Icono_Articulos.jpeg';
import iconoMeditaciones from '../../../assets/img/Icono_Meditaciones.jpeg';
import iconoMiniguias from '../../../assets/img/Icono_Miniguias.jpeg';
import portal1HomeImg from '../../../assets/img/Portal1_Home.jpeg';
import portal2HomeImg from '../../../assets/img/Portal2_Home.jpeg';
import portal3HomeImg from '../../../assets/img/Portal3_Home.jpeg';
import portal4HomeImg from '../../../assets/img/Portal4_Home.jpeg';

const getPortalHomeImage = (portalId: string, fallback: string) => {
  switch (portalId) {
    case 'portal-1':
      return portal1HomeImg;
    case 'portal-2':
      return portal2HomeImg;
    case 'portal-3':
      return portal3HomeImg;
    case 'portal-4':
      return portal4HomeImg;
    default:
      return fallback;
  }
};

interface PortalDetailViewProps {
  portal: Portal;
  portals: Portal[];
  products: Product[];
  setCurrentPage: (page: PageView) => void;
  onSelectPortal: (portal: Portal) => void;
  onOpenBookModal: (portal?: Portal, product?: Product) => void;
  onAddToCart: (prod: Product) => void;
}

export const PortalDetailView: React.FC<PortalDetailViewProps> = ({
  portal,
  portals,
  products,
  setCurrentPage,
  onSelectPortal,
  onOpenBookModal,
  onAddToCart,
}) => {
  const [scrollY, setScrollY] = useState(0);

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

  // Filter other portals for bottom recommendation grid
  const otherPortals = portals.filter((p) => p.id !== portal.id);

  // Sample portal products or fallbacks from products list
  const portalFeaturedProducts = products.slice(0, 3);

  const upcomingResources = [
    { title: 'Videos', imgSrc: iconoVideos, desc: 'Clases y reflexiones en video' },
    { title: 'Reflexiones', imgSrc: iconoArticulos, desc: 'Lecturas para pausar y pensar' },
    { title: 'Meditaciones', imgSrc: iconoMeditaciones, desc: 'Audios guiados de paz' },
    { title: 'Ejercicios', imgSrc: iconoMiniguias, desc: 'Guías de práctica diaria' },
  ];

  const heroImage = getPortalHomeImage(portal.id, portal.illustration);

  return (
    <div className="relative">
      {/* CAPA DE FONDO ESTÁTICA CON BLUR GRADUAL Y LENTO EN SCROLL */}
      <div className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0 overflow-hidden">
        <img
          src={heroImage}
          alt={portal.title}
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
              {/* Volanta/Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE0D3]/80 border border-[#C8B29B] text-xs font-cinzel text-[#8B5A2B] tracking-[0.2em] uppercase font-bold shadow-xs backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>» {portal.chapterTitle || 'CAPÍTULO I'} «</span>
              </div>

              {/* Main Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E120A] font-bold leading-tight tracking-wide drop-shadow-xs">
                {portal.title}
              </h1>

              {/* Floating Heart & Fine Divider Ornament */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[#B35A5A]">
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
                <span className="text-sm font-bold leading-none select-none">♡</span>
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
              </div>

              {/* Descriptive Text */}
              <p className="font-serif text-base sm:text-lg text-[#2B1D11] leading-relaxed italic font-medium drop-shadow-xs">
                {portal.description}
              </p>

              {/* Conceptual Motto */}
              {portal.chapterMotto && (
                <p className="font-serif italic text-base sm:text-lg text-[#8B5A2B] leading-relaxed font-semibold">
                  &ldquo;{portal.chapterMotto}&rdquo;
                </p>
              )}

              {/* CTA Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onOpenBookModal(portal, undefined)}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#8B5A2B] text-white font-serif text-sm font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center cursor-pointer"
                >
                  HOJEAR LIBRO DEL PORTAL
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

          {/* SECCIÓN "Comenzá por donde sientas" (RECURSOS DESTACADOS EN FILA) */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest">
                Recursos disponibles
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#382D2B] font-bold">
                » Comenzá por donde sientas «
              </h2>
              <p className="text-xs sm:text-sm text-[#6A5A4D] font-serif">
                Elegí la herramienta que más resuene con tu momento actual para comenzar tu proceso.
              </p>
              <div className="w-12 h-0.5 bg-[#C8B29B] mx-auto pt-1" />
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portalFeaturedProducts.map((prod, idx) => {
                const tagLabel = idx === 0 ? 'EBOOK' : idx === 1 ? 'MINI GUÍA' : 'GUÍA + CUADERNO';
                return (
                  <div
                    key={prod.id}
                    className="bg-[#FAF5EF]/90 rounded-2xl border-2 border-[#E2D5C5] p-5 flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-all duration-300 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Left Side: Product Cover */}
                      <div className="w-full sm:w-2/5 h-44 sm:h-36 rounded-xl overflow-hidden border border-[#D8C5B0] relative shrink-0 bg-[#EAE0D3]">
                        <img
                          src={prod.coverImage}
                          alt={prod.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-[#8B5A2B] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                          {tagLabel}
                        </span>
                      </div>

                      {/* Right Side: Information */}
                      <div className="w-full sm:w-3/5 space-y-2 flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] font-cinzel uppercase text-[#A88F76] font-bold tracking-widest">
                            {prod.category} • ${prod.price.toLocaleString('es-AR')}
                          </p>
                          <h3 className="font-serif text-base font-bold text-[#382D2B] line-clamp-2 leading-tight">
                            {prod.title}
                          </h3>
                          <p className="text-xs text-[#6A5A4D] font-serif leading-relaxed line-clamp-3 mt-1">
                            {prod.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-2 border-t border-[#E2D5C5]/60 flex items-center gap-2">
                      <button
                        onClick={() => onOpenBookModal(undefined, prod)}
                        className="flex-1 py-2 px-3 rounded-xl border border-[#C8B29B] bg-[#F4EBE1] text-[#382D2B] text-xs font-serif font-bold hover:bg-[#EAE0D3] transition-colors flex items-center justify-center cursor-pointer"
                      >
                        VISTA PREVIA
                      </button>

                      <button
                        onClick={() => onAddToCart(prod)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#8B5A2B] text-white text-xs font-serif font-bold hover:bg-[#6A4320] transition-colors shadow-xs flex items-center justify-center cursor-pointer"
                      >
                        COMPRAR
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <AntiqueBookDivider />

          {/* SECCIÓN "Este Portal sigue creciendo" (RECURSOS PRÓXIMOS) */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-[#F4EBE1]/90 rounded-3xl border-2 border-[#D8C5B0] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
              {/* Left Column Description */}
              <div className="lg:col-span-5 space-y-3 text-center lg:text-left">
                <span className="text-xs font-cinzel font-bold text-[#8B5A2B] uppercase tracking-widest">
                  En constante expansión
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#382D2B]">
                  Este Portal sigue creciendo
                </h3>
                <p className="font-serif text-sm sm:text-base text-[#5C4D4B] leading-relaxed">
                  Poco a poco irán apareciendo nuevos contenidos para profundizar tu camino. Todo llega en el momento justo.
                </p>
              </div>

              {/* Right Column Upcoming Icons Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {upcomingResources.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAF5EF] rounded-2xl border border-[#D8C5B0] p-4 text-center space-y-2 flex flex-col justify-between items-center shadow-xs hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D9C4AA] bg-[#EAE0D3] shadow-xs flex items-center justify-center shrink-0">
                      <img
                        src={item.imgSrc}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xs text-[#382D2B]">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#7A6B5D] font-serif leading-tight mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-[9px] font-cinzel font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EAE0D3] text-[#8B5A2B]">
                      Próximamente
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <AntiqueBookDivider />

          {/* BANNER INSPIRACIONAL (CITA DESTACADA CON ILUSTRACIÓN) */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF5EF]/90 rounded-3xl border-2 border-[#E2D5C5] p-8 sm:p-12 relative shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                  <span className="text-4xl text-[#C8B29B] font-serif leading-none block">“</span>
                  <blockquote className="font-serif italic text-xl sm:text-2xl text-[#382D2B] leading-relaxed">
                    Cuando cuidás tu energía, todo en tu vida empieza a alinearse. Volvé a vos. Esa es tu mayor transformación. ♡
                  </blockquote>
                  <p className="font-serif text-xs text-[#8B5A2B] font-bold tracking-wider uppercase">
                    — AlaSerguía
                  </p>
                </div>

                <div className="lg:col-span-4 relative flex justify-center">
                  <div className="w-48 h-48 rounded-full border-4 border-[#C8B29B] overflow-hidden shadow-md">
                    <img
                      src={sofiaKaelImg}
                      alt="Sofía y Kael de AlaSerguía"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <AntiqueBookDivider />

          {/* SECCIÓN "Explorá otros Portales" */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest">
                Seguí recorriendo
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#382D2B] font-bold">
                Explorá otros Portales
              </h2>
              <div className="w-12 h-0.5 bg-[#C8B29B] mx-auto pt-1" />
            </div>

            {/* Portals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPortals.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#FAF5EF]/90 rounded-2xl border-2 border-[#E2D5C5] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1 h-[420px]"
                >
                  <div className="relative h-[65%] overflow-hidden border-b border-[#E2D5C5]">
                    <img
                      src={getPortalHomeImage(p.id, p.illustration)}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>

                  <div className="h-[35%] p-4 flex flex-col justify-between text-center bg-[#FAF5EF]">
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-[#382D2B] group-hover:text-[#8B5A2B] transition-colors line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-xs text-[#6A5A4D] font-serif leading-relaxed line-clamp-2">
                        {p.subtitle}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onSelectPortal(p);
                        }}
                        className="flex-1 py-2 px-2 rounded-xl border border-[#C8B29B] bg-[#F4EBE1] text-[#382D2B] text-xs font-serif font-bold tracking-wider hover:bg-[#8B5A2B] hover:text-white transition-all flex items-center justify-center cursor-pointer"
                      >
                        VER PORTAL
                      </button>
                      <button
                        onClick={() => {
                          onOpenBookModal(p, undefined);
                        }}
                        className="p-2 rounded-xl border border-[#C8B29B] bg-[#F4EBE1] text-[#8B5A2B] hover:bg-[#EAE0D3] transition-all cursor-pointer"
                        title="Hojear libro"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AntiqueBookDivider />

          {/* BUZÓN DE ALASERGUÍA FOOTER BANNER */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF5EF]/90 rounded-2xl border-2 border-[#E2D5C5] p-6 sm:p-8 text-center space-y-4 max-w-3xl mx-auto shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#EAE0D3] text-[#8B5A2B] flex items-center justify-center shadow-xs">
                <MessageCircle className="w-5 h-5" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#382D2B]">
                ¿Tenés algo en tu corazón que querés contarme?
              </h3>

              <p className="text-xs sm:text-sm text-[#6A5A4D] font-serif leading-relaxed max-w-xl mx-auto">
                Escribime de manera anónima en el Buzón de AlaSerguía. Este es un espacio seguro para compartir lo que sientes sin juzgar.
              </p>

              <button
                onClick={() => setCurrentPage('letters')}
                className="px-6 py-2.5 rounded-full bg-[#8B5A2B] text-white font-serif text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all inline-flex items-center justify-center cursor-pointer"
              >
                IR AL BUZÓN
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
