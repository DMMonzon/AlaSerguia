import React, { useState, useEffect, useMemo } from 'react';
import { Product, Portal } from '../types';
import { X, ArrowRight } from 'lucide-react';
import portal1Img from '../../assets/img/Portal1_libro.jpeg';
import iconoEbooks from '../../assets/img/Icono_Ebooks.jpeg';
import iconoMiniguias from '../../assets/img/Icono_Miniguias.jpeg';
import iconoVideos from '../../assets/img/Icono_Videos.jpeg';
import iconoArticulos from '../../assets/img/Icono_Articulos.jpeg';
import iconoMeditaciones from '../../assets/img/Icono_Meditaciones.jpeg';
import medallaPortal1 from '../../assets/img/MedallaPortal1.jpeg';
import medallaPortal2 from '../../assets/img/MedallaPortal2.jpeg';
import medallaPortal3 from '../../assets/img/MedallaPortal3.jpeg';
import medallaPortal4 from '../../assets/img/MedallaPortal4.jpeg';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  portal?: Portal | null;
  product?: Product | null;
  onAddToCart?: (prod: Product) => void;
  onSelectPortal?: (portal: Portal) => void;
}

// Category Items for the 5 Medallions Grid
const CATEGORY_ITEMS = [
  {
    key: 'ebooks',
    title: 'Ebooks',
    description: 'Guías para tu crecimiento personal',
    imgSrc: iconoEbooks,
    defaultIcon: 'book',
  },
  {
    key: 'miniguias',
    title: 'Mini Guías',
    description: 'Herramientas prácticas para tu día a día',
    imgSrc: iconoMiniguias,
    defaultIcon: 'jar',
  },
  {
    key: 'videos',
    title: 'Videos',
    description: 'Contenido para inspirar y acompañar',
    imgSrc: iconoVideos,
    defaultIcon: 'video',
  },
  {
    key: 'articulos',
    title: 'Artículos',
    description: 'Reflexiones y recursos para tu camino',
    imgSrc: iconoArticulos,
    defaultIcon: 'article',
  },
  {
    key: 'meditaciones',
    title: 'Próximamente Meditaciones',
    description: 'Para conectar, soltar y renovar tu energía',
    imgSrc: iconoMeditaciones,
    defaultIcon: 'meditation',
  },
];

// SVG Icon components for medallions
const BookIconSVG = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#5C4D4B]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 36 V12 C10 9.5 14 8 18 10 C22 12 24 10 24 10 V34 C24 34 20 35 18 34 C14 33 10 36 10 36 Z" fill="#FDFBF7" fillOpacity="0.8" />
    <path d="M38 36 V12 C38 9.5 34 8 30 10 C26 12 24 10 24 10 V34 C24 34 26 35 30 34 C34 33 38 36 38 36 Z" fill="#FDFBF7" fillOpacity="0.8" />
    <path d="M18 16 C20 17 21 16 22 15.5" strokeWidth="1.2" />
    <path d="M30 16 C28 17 27 16 26 15.5" strokeWidth="1.2" />
    <path d="M24 6 V10" stroke="#6B7C62" strokeWidth="1.5" />
    <path d="M22 6 C20 4 21 2 24 3 C27 2 28 4 26 6 Z" fill="#7A8B6E" fillOpacity="0.4" stroke="#5C6E52" strokeWidth="1.2" />
  </svg>
);

const JarIconSVG = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#5C4D4B]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="19" y="10" width="10" height="4" rx="1" fill="#D9C8B4" />
    <path d="M19 14 C15 14, 13 18, 13 22 V35 C13 38 16 40 24 40 C32 40 35 38 35 35 V22 C35 18 33 14 29 14 Z" fill="#FDFBF7" fillOpacity="0.8" />
    <path d="M24 35 V23" stroke="#6B7C62" strokeWidth="1.5" />
    <path d="M24 28 C21 26 20 28 22 30 Z" fill="#7A8B6E" fillOpacity="0.6" stroke="#5C6E52" strokeWidth="1.2" />
    <path d="M24 25 C27 23 28 25 26 27 Z" fill="#7A8B6E" fillOpacity="0.6" stroke="#5C6E52" strokeWidth="1.2" />
    <circle cx="28" cy="18" r="1" fill="#D4AF37" />
  </svg>
);

const VideoIconSVG = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#5C4D4B]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="13" width="30" height="22" rx="6" fill="#7A8B6E" fillOpacity="0.75" stroke="#5C6E52" />
    <polygon points="21,18 30,24 21,30" fill="#FAF5EF" stroke="#FAF5EF" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const ArticleIconSVG = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#5C4D4B]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9 C14 7.5 15.5 6.5 18 6.5 H30 C32.5 6.5 34 7.5 34 9 V39 C34 40.5 32.5 41.5 30 41.5 H18 C15.5 41.5 14 40.5 14 39 Z" fill="#FDFBF7" fillOpacity="0.8" />
    <line x1="19" y1="14" x2="29" y2="14" strokeWidth="1.3" />
    <line x1="19" y1="20" x2="29" y2="20" strokeWidth="1.3" />
    <line x1="19" y1="26" x2="25" y2="26" strokeWidth="1.3" />
    <path d="M33 15 L27 31 L25 33 L26 30 Z" fill="#7A8B6E" stroke="#5C6E52" strokeWidth="1.2" />
  </svg>
);

const MeditationIconSVG = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#5C4D4B]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="14" r="3.5" fill="#7A8B6E" stroke="#5C6E52" />
    <path d="M24 18 C20 22, 16 25, 14 29 C12 33, 16 35, 24 35 C32 35, 36 33, 34 29 C32 25, 28 22, 24 18 Z" fill="#7A8B6E" fillOpacity="0.5" stroke="#5C6E52" />
    <circle cx="24" cy="7.5" r="1" fill="#D4AF37" />
    <circle cx="18" cy="9.5" r="0.8" fill="#D4AF37" />
    <circle cx="30" cy="9.5" r="0.8" fill="#D4AF37" />
  </svg>
);

const CategoryIconMedallion: React.FC<{ item: typeof CATEGORY_ITEMS[0] }> = ({ item }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F2E8DC] border-2 border-[#D9C4AA] flex items-center justify-center shadow-md mx-auto mb-2 transition-all hover:scale-105 hover:bg-[#EFE3D5] overflow-hidden">
      {item.imgSrc && !imgFailed ? (
        <img
          src={item.imgSrc}
          alt={item.title}
          className="w-full h-full object-cover rounded-full"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <>
          {item.defaultIcon === 'book' && <BookIconSVG />}
          {item.defaultIcon === 'jar' && <JarIconSVG />}
          {item.defaultIcon === 'video' && <VideoIconSVG />}
          {item.defaultIcon === 'article' && <ArticleIconSVG />}
          {item.defaultIcon === 'meditation' && <MeditationIconSVG />}
        </>
      )}
    </div>
  );
};

export const BookModal: React.FC<BookModalProps> = ({
  isOpen,
  onClose,
  portal,
  product,
  onAddToCart,
  onSelectPortal,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Dynamic preview carousel state for Product modal
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Compute preview images for product (with fallbacks)
  const previewImages = useMemo(() => {
    if (!product) return [];
    if (product.previewImages && product.previewImages.length > 0) {
      return product.previewImages;
    }
    const pageIllustrations = product.previewPages
      ?.map((p) => p.illustration)
      .filter((img): img is string => Boolean(img));
    if (pageIllustrations && pageIllustrations.length > 0) {
      return [product.coverImage, ...pageIllustrations];
    }
    return [
      product.coverImage,
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    ].filter(Boolean);
  }, [product]);

  // Reset active image index on product change or modal open
  useEffect(() => {
    setActiveImageIndex(0);
  }, [product?.id, isOpen]);

  // 3-second automatic cyclic carousel rotation for product preview
  useEffect(() => {
    if (!isOpen || !product || previewImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % previewImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen, product, previewImages.length]);

  if (!isOpen) return null;

  // =========================================================================
  // RESOLVED DATA FOR PORTAL OPEN BOOK SPREAD
  // =========================================================================
  const leftPageImage = portal?.illustration || portal1Img;
  const chapterTitleText = portal?.chapterTitle || 'CAPÍTULO I';
  const leftPageMainTitle = portal?.id === 'portal-1' || !portal
    ? 'El regreso\na vos'
    : portal.title;
  const leftPageMotto = portal?.chapterMotto || 'Toda transformación comienza cuando decidimos mirar hacia adentro.';
  const rightPageHeaderTitle = portal?.title || 'Energía y Consciencia';
  const rightPageDescription = portal?.description ||
    'Un espacio para reconectar con tu energía vital, liberar lo que ya no te pertenece y crear hábitos que te acerquen a la vida que realmente querés vivir.';

  const activePortalId = portal?.id || 'portal-1';
  const portalMedallionImage =
    activePortalId === 'portal-2' || (portal?.title && portal.title.toLowerCase().includes('luz interior'))
      ? medallaPortal2
      : activePortalId === 'portal-3' || (portal?.title && portal.title.toLowerCase().includes('sofía'))
      ? medallaPortal3
      : activePortalId === 'portal-4' || (portal?.title && portal.title.toLowerCase().includes('sesiones'))
      ? medallaPortal4
      : medallaPortal1;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#1A1412]/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
    >
      {/* ========================================================================= */}
      {/* 1. SINGLE-PAGE VERTICAL MODAL (FOR PRODUCTS / RESOURCES)                  */}
      {/* ========================================================================= */}
      {product ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-md sm:max-w-lg w-full max-h-[90vh] flex flex-col my-auto rounded-3xl border-4 border-[#C8B29B]/70 bg-[#FAF5EF] bg-parchment shadow-2xl p-5 sm:p-7 animate-fadeIn"
        >
          {/* Botón de cierre superior derecho (círculo oscuro ocre con cruz) */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#5C4333] hover:bg-[#433024] text-[#FAF5EF] flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none cursor-pointer"
            title="Cerrar modal"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Adornos esquineros botánicos sutiles estilo editorial manuscrito */}
          <svg className="absolute top-2 left-2 w-16 h-16 text-[#D5C2AB]/40 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M10 10 C35 20, 55 40, 65 70 M10 10 C30 30, 20 50, 35 65" />
            <path d="M20 15 C25 10, 30 12, 28 18 C22 20, 15 18, 20 15 Z" fill="currentColor" fillOpacity="0.2" />
          </svg>
          <svg className="absolute bottom-2 left-2 w-16 h-16 text-[#D5C2AB]/40 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M10 90 C30 70, 40 40, 30 10 M10 90 C20 60, 50 50, 70 40" />
            <path d="M15 80 C20 75, 25 77, 23 83 C17 85, 10 83, 15 80 Z" fill="currentColor" fillOpacity="0.2" />
          </svg>

          {/* ÁREA DE PREVIEW DINÁMICO (CARRUSEL AUTOMÁTICO CADA 3 SEGUNDOS) */}
          <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden border border-[#D8C5B0] shadow-inner bg-[#EAE0D3] shrink-0">
            {/* Carrusel de imágenes con transición suave fade */}
            {previewImages.map((imgSrc, idx) => (
              <img
                key={idx}
                src={imgSrc}
                alt={`${product.title} - Muestra ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  idx === activeImageIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
              />
            ))}

            {/* Sombra suave interna degradada para legibilidad */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-black/20" />

            {/* Indicadores discretos de posición en la parte inferior */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1A1412]/50 backdrop-blur-xs border border-[#FAF5EF]/15">
              {previewImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === activeImageIndex
                      ? 'w-4 h-1.5 bg-[#FAF5EF]'
                      : 'w-1.5 h-1.5 bg-[#FAF5EF]/50 hover:bg-[#FAF5EF]/90'
                  }`}
                  aria-label={`Ver muestra ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* DETALLES Y ACCIÓN COMERCIAL (DEBAJO DEL PREVIEW) */}
          <div className="flex flex-col items-center text-center flex-1 min-h-0 pt-3">
            {/* Categoría / Volanta */}
            <p className="text-[10px] font-cinzel tracking-widest text-[#A88F76] font-bold uppercase text-center shrink-0">
              {product.category === 'ebook'
                ? 'E-BOOK DIGITAL'
                : product.category === 'guia'
                ? 'MINI GUÍA ILUSTRADA'
                : product.category === 'oraculo'
                ? 'ORÁCULO DIGITAL'
                : product.category === 'afirmaciones'
                ? 'SET DE AFIRMACIONES'
                : product.category}
            </p>

            {/* Título */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#382D2B] leading-tight text-center mt-1 px-1 shrink-0">
              {product.title}
            </h2>

            {/* Divisor sutil en tono ocre */}
            <div className="flex items-center justify-center gap-2 text-[#C8B29B] my-2 shrink-0">
              <span className="h-[1px] w-10 bg-[#C8B29B]" />
              <span className="text-[#8B5A2B] text-xs">✦</span>
              <span className="h-[1px] w-10 bg-[#C8B29B]" />
            </div>

            {/* Bloque de Descripción con scroll vertical exclusivo si el contenido es extenso */}
            <div
              className="w-full flex-1 min-h-[44px] max-h-28 sm:max-h-36 overflow-y-auto px-3 py-0.5 my-1"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#C8B29B transparent',
              }}
            >
              <p className="text-xs sm:text-sm text-[#5C4D4B] font-serif leading-relaxed text-center px-1">
                {product.description}
              </p>
            </div>

            {/* Bloque de Compra / CTA (Siempre fijado y visible en la parte inferior) */}
            <div className="w-full mt-2 pt-3 border-t border-[#D8C5B0]/70 flex flex-col items-center shrink-0">
              {/* Precio destacado en gran tamaño y estilo numérico serif */}
              <p className="text-xl font-bold text-[#8B5A2B] font-serif text-center mb-2">
                ${product.price.toLocaleString('es-AR')} <span className="text-xs font-normal text-[#A88F76]">ARS</span>
              </p>

              {/* Botón principal de compra sin precio repetido */}
              <button
                type="button"
                onClick={() => {
                  if (onAddToCart) onAddToCart(product);
                  onClose();
                }}
                className="w-full py-3 px-6 rounded-full bg-[#8B5A2B] text-white font-serif text-sm font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>COMPRAR →</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. OPEN BOOK TWO-PAGE MODAL (FOR PORTALS)                                 */
        /* ========================================================================= */
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl my-auto rounded-[24px] sm:rounded-[32px] bg-[#E8DBCC] p-2 sm:p-3.5 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] border-2 border-[#C9B59D]"
        >
          {/* INNER BOOK PAGES FRAME */}
          <div className="relative w-full rounded-[20px] sm:rounded-[26px] bg-[#FAF5EF] border border-[#D5C2AB] overflow-hidden shadow-inner grid grid-cols-1 md:grid-cols-2">
            {/* CLOSE BUTTON (Floating in upper-right corner of right page) */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4A5D4E] text-white hover:bg-[#3B4C3E] flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none cursor-pointer"
              title="Cerrar libro"
              aria-label="Cerrar libro"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Pliegue central del libro (Lomo tridimensional suave) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-24 -ml-12 pointer-events-none z-20 bg-gradient-to-r from-transparent via-black/35 to-transparent" />

            {/* ==================== LEFT PAGE (FULL COVER ILLUSTRATION) ==================== */}
            <div className="relative w-full min-h-[480px] sm:min-h-[580px] md:min-h-[640px] flex flex-col justify-between p-6 sm:p-10 md:p-12 text-center select-none overflow-hidden">
              {/* Background Full Illustration */}
              <img
                src={leftPageImage}
                alt={leftPageMainTitle}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Subtle Gradient & Vignette Overlay for High Legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1F1915]/65 via-[#1F1915]/30 to-[#1F1915]/75 z-0" />

              {/* TOP: NÚMERO / ENCABEZADO DE CAPÍTULO */}
              <div className="relative z-10 space-y-1">
                <span className="text-[11px] sm:text-xs font-cinzel tracking-[0.25em] text-[#F3EAD8] uppercase drop-shadow">
                  {chapterTitleText}
                </span>
                {/* Leaf branch adornment */}
                <div className="flex items-center justify-center text-[#D4AF37] opacity-90 py-0.5">
                  <svg className="w-10 h-3" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 10 C 20 10, 40 10, 55 10" />
                    <path d="M20 10 C 17 5, 14 7, 12 10 C 14 13, 17 15, 20 10 Z" fill="currentColor" fillOpacity="0.4" />
                    <path d="M40 10 C 37 5, 34 7, 32 10 C 34 13, 37 15, 40 10 Z" fill="currentColor" fillOpacity="0.4" />
                  </svg>
                </div>
              </div>

              {/* CENTER: TÍTULO PRINCIPAL EN EL CENTRO DE LA PÁGINA */}
              <div className="relative z-10 max-w-md mx-auto my-auto py-4">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF] font-normal leading-tight tracking-wide drop-shadow-lg whitespace-pre-line">
                  {leftPageMainTitle}
                </h2>
              </div>

              {/* BOTTOM: FRASE CONCEPTUAL EN LA PARTE INFERIOR DE LA PÁGINA */}
              <div className="relative z-10 max-w-md mx-auto space-y-3 pb-2">
                {/* Star Divider */}
                <div className="flex items-center justify-center gap-2 text-[#D4AF37] text-xs opacity-80">
                  <span>✦</span>
                </div>

                {/* Conceptual Subtitle / Phrase */}
                <p className="font-serif italic text-xs sm:text-sm md:text-base text-[#F5ECE0] leading-relaxed max-w-xs sm:max-w-sm mx-auto drop-shadow">
                  &ldquo;{leftPageMotto}&rdquo;
                </p>

                {/* Lotus Medallion Adornment */}
                <div className="pt-1 flex justify-center">
                  <svg className="w-7 h-7 text-[#D4AF37] opacity-95 drop-shadow" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M32 12 C37 22, 42 32, 32 48 C22 32, 27 22, 32 12 Z" fill="#D4AF37" fillOpacity="0.25" />
                    <path d="M32 24 C44 24, 54 36, 48 48 C38 48, 34 38, 32 24 Z" />
                    <path d="M32 24 C20 24, 10 36, 16 48 C26 48, 30 38, 32 24 Z" />
                    <path d="M14 44 C22 52, 42 52, 50 44" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ==================== RIGHT PAGE (CONTENT & ICON MEDALLIONS) ==================== */}
            <div className="relative w-full min-h-[480px] sm:min-h-[580px] md:min-h-[640px] bg-[#FAF5EF] p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-parchment overflow-hidden">
              {/* BOTANICAL FLORAL CORNER DECORATIONS */}
              <svg className="absolute top-2 right-2 w-24 h-24 sm:w-28 sm:h-28 text-[#D5C2AB]/40 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M90 10 C65 20, 45 40, 35 70 M90 10 C70 30, 80 50, 65 65" />
                <path d="M80 15 C75 10, 70 12, 72 18 C78 20, 85 18, 80 15 Z" fill="currentColor" fillOpacity="0.2" />
                <path d="M65 25 C60 20, 55 22, 57 28 C63 30, 70 28, 65 25 Z" fill="currentColor" fillOpacity="0.2" />
              </svg>

              <svg className="absolute bottom-2 right-2 w-24 h-24 sm:w-32 sm:h-32 text-[#D5C2AB]/40 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M90 90 C70 70, 60 40, 70 10 M90 90 C80 60, 50 50, 30 40" />
                <path d="M85 80 C80 75, 75 77, 77 83 C83 85, 90 83, 85 80 Z" fill="currentColor" fillOpacity="0.2" />
                <path d="M75 60 C70 55, 65 57, 67 63 C73 65, 80 63, 75 60 Z" fill="currentColor" fillOpacity="0.2" />
              </svg>

              {/* HEADER AREA */}
              <div className="relative z-10 text-center space-y-3">
                {/* Featured Portal Medallion Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D9C4AA] bg-[#FDFBF7] flex items-center justify-center shadow-md mx-auto mb-2 overflow-hidden">
                  <img
                    src={portalMedallionImage}
                    alt={rightPageHeaderTitle}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Portal Header Title */}
                <h3 className="font-serif text-2xl sm:text-3xl text-[#3A2E2B] font-normal tracking-wide">
                  {rightPageHeaderTitle}
                </h3>

                {/* Star Divider */}
                <div className="flex items-center justify-center text-[#A88B58] text-xs opacity-70 my-1">
                  <span>✦</span>
                </div>

                {/* Brief Portal Description */}
                <p className="font-serif text-xs sm:text-sm text-[#5C4D4B] leading-relaxed max-w-md mx-auto px-2">
                  {rightPageDescription}
                </p>
              </div>

              {/* SECTION SUBTITLE WITH DOUBLE ANGLE QUOTES */}
              <div className="relative z-10 text-center my-4 sm:my-6">
                <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#8B6E4E] uppercase">
                  » ¿QUÉ ENCONTRARÁS AQUÍ? «
                </span>
              </div>

              {/* 5 CATEGORY ICON MEDALLIONS GRID */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 my-2">
                {CATEGORY_ITEMS.map((item) => (
                  <div key={item.key} className="flex flex-col items-center text-center group cursor-pointer">
                    <CategoryIconMedallion item={item} />
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#382D2B] mb-0.5 leading-tight group-hover:text-[#8B5A2B] transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-serif text-[10px] sm:text-[11px] text-[#7A6B5D] leading-tight max-w-[120px]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CALL TO ACTION BUTTON (BOTTOM CENTER) */}
              <div className="relative z-10 pt-4 sm:pt-6 text-center">
                <button
                  type="button"
                  onClick={() => {
                    if (portal && onSelectPortal) {
                      onSelectPortal(portal);
                    }
                    onClose();
                  }}
                  className="w-full max-w-sm mx-auto py-3 sm:py-3.5 px-6 rounded-full bg-[#4A5D4E] hover:bg-[#3C4A3E] text-white text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer"
                >
                  EXPLORAR ESTE PORTAL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
