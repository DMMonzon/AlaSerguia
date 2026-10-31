import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { ShoppingBag, Eye, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { AntiqueBookDivider } from '../AntiqueBookDivider';
import storeHeroImg from '../../../assets/img/TiendaHero.jpeg';

interface StoreViewProps {
  products: Product[];
  onOpenBookModal: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const StoreView: React.FC<StoreViewProps> = ({
  products,
  onOpenBookModal,
  onAddToCart,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const categories = [
    { id: 'all', label: 'TODOS LOS RECURSOS' },
    { id: 'ebook', label: 'E-BOOKS' },
    { id: 'guia', label: 'MINI GUÍAS' },
    { id: 'oraculo', label: 'ORÁCULOS' },
    { id: 'afirmaciones', label: 'AFIRMACIONES' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative">
      {/* CAPA DE FONDO ESTÁTICA CON BLUR GRADUAL Y LENTO EN SCROLL */}
      <div className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0 overflow-hidden">
        <img
          src={storeHeroImg}
          alt="Recursos para el Alma"
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
              {/* Top Pill / Detail */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE0D3]/80 border border-[#C8B29B] text-xs font-cinzel text-[#8B5A2B] tracking-[0.2em] uppercase font-bold shadow-xs backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>» Tienda Holística & Digital «</span>
              </div>

              {/* Main Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E120A] font-bold leading-tight tracking-wide drop-shadow-xs">
                Recursos para el Alma
              </h1>

              {/* Floating Heart & Fine Divider Ornament */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[#B35A5A]">
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
                <span className="text-sm font-bold leading-none select-none">♡</span>
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
              </div>

              {/* Descriptive Text */}
              <p className="font-serif text-base sm:text-lg text-[#2B1D11] leading-relaxed italic font-medium drop-shadow-xs">
                Catálogo exclusivo de e-books, mini guías ilustradas, oráculos y juegos de afirmaciones listos para descargar y disfrutar en tu camino de transformación.
              </p>
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

          {/* Category Pills Filter */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 border-b border-[#D8C5B0]/80 pb-6 max-w-3xl mx-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#8B5A2B] text-white shadow-xs'
                      : 'bg-[#FAF5EF]/90 text-[#5C4D4B] border border-[#D8C5B0] hover:bg-[#EAE0D3]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </section>

          {/* Product Cards Grid */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="group bg-[#FAF5EF]/90 rounded-2xl sm:rounded-3xl border border-[#E2D5C5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-stretch"
                >
                  {/* Columna Izquierda: Imagen del producto */}
                  <div className="relative w-full sm:w-2/5 h-56 sm:h-auto min-h-[220px] sm:min-h-full overflow-hidden rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl sm:rounded-l-3xl bg-[#EAE0D3] shrink-0">
                    <img
                      src={prod.coverImage}
                      alt={prod.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {prod.badge && (
                      <span className="absolute top-3 left-3 z-10 bg-[#8B5A2B] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-xs">
                        {prod.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 z-10 bg-white/90 backdrop-blur-xs text-[#382D2B] text-[10px] font-serif px-2 py-0.5 rounded-md shadow-xs">
                      {prod.pagesCount} Páginas
                    </span>
                  </div>

                  {/* Columna Derecha: Detalles y Acciones */}
                  <div className="w-full sm:w-3/5 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-cinzel tracking-widest text-[#A88F76] font-bold uppercase">
                        {prod.category}
                      </p>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#382D2B] leading-snug line-clamp-2">
                        {prod.title}
                      </h3>
                      <p className="text-xs text-[#6A5A4D] font-serif leading-relaxed line-clamp-3">
                        {prod.description}
                      </p>
                    </div>

                    {/* Acciones y Precio estilo Medallas/Talismanes */}
                    <div className="pt-3 border-t border-[#E2D5C5]/70 flex items-center justify-between gap-3">
                      <div>
                        <span className="block text-[9px] font-cinzel uppercase tracking-wider text-[#A88F76] font-semibold">
                          Inversión
                        </span>
                        <p className="text-base sm:text-lg font-bold text-[#8B5A2B] font-serif whitespace-nowrap">
                          ${prod.price.toLocaleString('es-AR')} <span className="text-xs font-normal">ARS</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Botón Ver / Vista Previa */}
                        <button
                          type="button"
                          onClick={() => onOpenBookModal(prod)}
                          title="Vista previa"
                          aria-label="Vista previa de hojas"
                          className="group/eye relative px-3.5 py-2 rounded-full flex items-center justify-center bg-[#F4EBE1] border border-[#C8B29B] text-[#382D2B] hover:bg-[#8B5A2B] hover:text-white hover:border-[#8B5A2B] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                        >
                          <span className="text-[11px] font-cinzel uppercase font-bold tracking-wider">
                            VER
                          </span>
                        </button>

                        {/* Botón Comprar / Añadir al carrito */}
                        <button
                          type="button"
                          onClick={() => onAddToCart(prod)}
                          title="Añadir al carrito"
                          aria-label="Añadir al carrito"
                          className="group/buy relative h-10 px-4 rounded-full flex items-center justify-center bg-[#8B5A2B] text-white hover:bg-[#6A4320] shadow-md hover:shadow-lg hover:shadow-[#8B5A2B]/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                        >
                          <span className="text-[11px] font-cinzel uppercase font-bold tracking-wider">
                            COMPRAR
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AntiqueBookDivider />

          {/* Guarantees Footer Bar */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF5EF]/90 rounded-2xl border border-[#D8C5B0] p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center max-w-4xl mx-auto shadow-sm">
              <div className="flex items-center justify-center gap-3">
                <Download className="w-5 h-5 text-[#8B5A2B]" />
                <div className="text-left text-xs">
                  <p className="font-bold text-[#382D2B]">Descarga Inmediata</p>
                  <p className="text-[#7A6B5D]">PDF de alta calidad en tu dispositivo</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-5 h-5 text-[#8B5A2B]" />
                <div className="text-left text-xs">
                  <p className="font-bold text-[#382D2B]">Acceso De Por Vida</p>
                  <p className="text-[#7A6B5D]">Imprimí o leé cuando quieras</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8B5A2B]" />
                <div className="text-left text-xs">
                  <p className="font-bold text-[#382D2B]">Pago Seguro</p>
                  <p className="text-[#7A6B5D]">MercadoPago, Tarjeta o Transferencia</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
