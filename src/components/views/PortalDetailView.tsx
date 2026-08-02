import React from 'react';
import { PageView, Portal, Product } from '../../types';
import {
  ArrowRight,
  Sparkles,
  Video,
  FileText,
  Volume2,
  Heart,
  MessageCircle,
  Eye
} from 'lucide-react';
import sofiaKaelImg from '../../../assets/img/Portal3_Home.jpeg';

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
  // Filter other portals for bottom recommendation grid
  const otherPortals = portals.filter((p) => p.id !== portal.id);

  // Sample portal products or fallbacks from products list
  const portalFeaturedProducts = products.slice(0, 3);

  const upcomingResources = [
    { title: 'Videos', icon: Video, desc: 'Clases y reflexiones en video' },
    { title: 'Reflexiones', icon: FileText, desc: 'Lecturas para pausar y pensar' },
    { title: 'Meditaciones', icon: Volume2, desc: 'Audios guiados de paz' },
    { title: 'Ejercicios', icon: Sparkles, desc: 'Guías de práctica diaria' },
  ];

  return (
    <div className="bg-[#FAF5EF]">

      {/* 1. CAPA DE FONDO FIJA PARA LA IMAGEN A LA DERECHA */}
      <div className="fixed top-0 right-0 w-full lg:w-3/5 h-[100dvh] pointer-events-none z-0 overflow-hidden">
        {/* Capa de Imagen */}
        <img
          src={portal.illustration}
          alt={portal.title}
          className="w-full h-full object-cover object-right"
        />
        {/* Gradiente de difuminado directo sobre el lateral izquierdo de la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF5EF] via-[#FAF5EF]/70 via-35% to-transparent pointer-events-none z-10" />
      </div>

      {/* 2. SECTION 1: HERO DEL PORTAL (ESTRUCTURA ABIERTA Y ETÉREA) */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-transparent">

        {/* HERO CONTAINER & LEFT TEXT COLUMN */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

          <div className="lg:col-span-6 space-y-6 text-center lg:text-left max-w-xl mx-auto lg:mx-0 relative z-10 animate-fadeIn">

            {/* Top Pill / Detail */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE0D3]/90 border border-[#C8B29B] text-xs font-cinzel text-[#8B5A2B] tracking-[0.2em] uppercase font-bold shadow-xs backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>» {portal.chapterTitle || 'CAPÍTULO I'} «</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1E120A] font-bold leading-tight tracking-wide drop-shadow-xs">
              {portal.title}
            </h1>

            {/* Floating Heart & Fine Divider Ornament */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-[#B35A5A]">
              <span className="h-[1px] w-12 bg-[#C8B29B]" />
              <span className="text-lg">♡</span>
              <span className="h-[1px] w-12 bg-[#C8B29B]" />
            </div>

            {/* Descriptive Text */}
            <p className="font-serif text-base sm:text-lg lg:text-xl text-[#3A2A1A] leading-relaxed font-medium">
              {portal.description}
            </p>

            {/* Conceptual Motto */}
            {portal.chapterMotto && (
              <p className="font-serif italic text-base sm:text-lg text-[#8B5A2B] leading-relaxed font-medium pt-1">
                &ldquo;{portal.chapterMotto}&rdquo;
              </p>
            )}

          </div>

        </div>

      </section>

      {/* 3. SUBSEQUENT SECTIONS WRAPPER FOR PARALLAX SLIDE-OVER EFFECT */}
      <div className="relative z-20 bg-[#FAF5EF] pt-16 pb-16 space-y-16 border-t border-[#E2D5C5] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* SECCIÓN "Comenzá por donde sientas" (RECURSOS DESTACADOS EN FILA) */}
          <section className="space-y-8">

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
                    className="bg-[#FAF5EF] rounded-2xl border-2 border-[#E2D5C5] p-5 flex flex-col justify-between book-shadow hover:-translate-y-1 transition-all duration-300 space-y-4"
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
                        className="flex-1 py-2 px-3 rounded-xl border border-[#C8B29B] bg-[#F4EBE1] text-[#382D2B] text-xs font-serif font-medium hover:bg-[#EAE0D3] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#8B5A2B]" />
                        Vista previa
                      </button>

                      <button
                        onClick={() => onAddToCart(prod)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#8B5A2B] text-white text-xs font-serif font-bold hover:bg-[#6A4320] transition-colors shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Comprar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </section>

          {/* SECCIÓN "Este Portal sigue creciendo" (RECURSOS PRÓXIMOS) */}
          <section className="bg-[#F4EBE1] rounded-3xl border-2 border-[#D8C5B0] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center book-shadow">

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
              {upcomingResources.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#FAF5EF] rounded-2xl border border-[#D8C5B0] p-4 text-center space-y-2 flex flex-col justify-between items-center shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EAE0D3] text-[#8B5A2B] flex items-center justify-center shadow-xs">
                      <IconComp className="w-5 h-5" />
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
                );
              })}
            </div>

          </section>

          {/* BANNER INSPIRACIONAL (CITA DESTACADA CON ILUSTRACIÓN) */}
          <section className="bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-8 sm:p-12 relative book-shadow overflow-hidden">
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
          </section>

          {/* SECCIÓN "Explorá otros Portales" */}
          <section className="space-y-8">

            <div className="text-center space-y-2 max-w-xl mx-auto">
              <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest">
                Seguí recorriendo
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#382D2B] font-bold">
                Explorá otros Portales
              </h2>
              <div className="w-12 h-0.5 bg-[#C8B29B] mx-auto" />
            </div>

            {/* Portals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPortals.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#FAF5EF] rounded-2xl border-2 border-[#E2D5C5] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1 h-[420px]"
                >
                  <div className="relative h-[65%] overflow-hidden border-b border-[#E2D5C5]">
                    <img
                      src={p.illustration}
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

                    <button
                      onClick={() => {
                        onOpenBookModal(p, undefined);
                      }}
                      className="w-full py-2 px-4 rounded-xl border border-[#C8B29B] bg-[#F4EBE1] text-[#382D2B] text-xs font-serif font-bold tracking-wider hover:bg-[#8B5A2B] hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>ABRIR ESTE PORTAL</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* BUZÓN DE ALASERGUÍA FOOTER BANNER */}
            <div className="bg-[#FAF5EF] rounded-2xl border-2 border-[#E2D5C5] p-6 sm:p-8 text-center space-y-4 book-shadow max-w-3xl mx-auto">
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
                className="px-6 py-2.5 rounded-full bg-[#8B5A2B] text-white font-serif text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Ir al Buzón</span>
              </button>
            </div>

          </section>

        </div>
      </div>
    </div>
  );
};
