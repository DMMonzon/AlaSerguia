import React, { useState, useEffect } from 'react';
import { Product, Portal } from '../types';
import { X, ArrowRight } from 'lucide-react';
import portal1Img from '../../assets/img/Portal1_Home.jpeg';
import iconoEbooks from '../../assets/img/Icono_Ebooks.jpeg';
import iconoMiniguias from '../../assets/img/Icono_Miniguias.jpeg';
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
    imgSrc: '../../assets/img/Icono_Ebooks.jpeg',
    defaultIcon: 'book',
  },
  {
    key: 'miniguias',
    title: 'Mini Guías',
    description: 'Herramientas prácticas para tu día a día',
    imgSrc: '../../assets/img/Icono_Miniguias.jpeg',
    defaultIcon: 'jar',
  },
  {
    key: 'videos',
    title: 'Videos',
    description: 'Contenido para inspirar y acompañar',
    imgSrc: '../../assets/img/Icono_Videos.jpeg',
    defaultIcon: 'video',
  },
  {
    key: 'articulos',
    title: 'Artículos',
    description: 'Reflexiones y recursos para tu camino',
    imgSrc: '../../assets/img/Icono_Articulos.jpeg',
    defaultIcon: 'article',
  },
  {
    key: 'meditaciones',
    title: 'Próximamente Meditaciones',
    description: 'Para conectar, soltar y renovar tu energía',
    imgSrc: '../../assets/img/Icono_Meditaciones.jpeg',
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

  if (!isOpen) return null;

  const isProductMode = !!product;

  // Resolved dynamic values with defaults matching reference design
  const leftPageImage = isProductMode
    ? product?.coverImage || portal1Img
    : portal?.illustration || portal1Img;

  const chapterTitleText = isProductMode
    ? product?.badge || 'VISTA PREVIA DE EBOOK'
    : portal?.chapterTitle || 'CAPÍTULO I';

  const leftPageMainTitle = isProductMode
    ? product?.title
    : portal?.id === 'portal-1' || !portal
      ? 'El regreso\na vos'
      : portal.title;

  const leftPageMotto = isProductMode
    ? product?.description
    : portal?.chapterMotto || 'Toda transformación comienza cuando decidimos mirar hacia adentro.';

  const rightPageHeaderTitle = isProductMode
    ? product?.title
    : portal?.title || 'Energía y Consciencia';

  const rightPageDescription = isProductMode
    ? product?.description
    : portal?.description ||
    'Un espacio para reconectar con tu energía vital, liberar lo que ya no te pertenece y crear hábitos que te acerquen a la vida que realmente querés vivir.';

  // Resolve header medallion image based on selected portal ID or title
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#1A1412]/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* BOOK OUTER WRAPPER (Open Book structure) */}
      <div className="relative w-full max-w-5xl my-auto rounded-[24px] sm:rounded-[32px] bg-[#E8DBCC] p-2 sm:p-3.5 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] border-2 border-[#C9B59D]">

        {/* INNER BOOK PAGES FRAME */}
        <div className="relative w-full rounded-[20px] sm:rounded-[26px] bg-[#FAF5EF] border border-[#D5C2AB] overflow-hidden shadow-inner grid grid-cols-1 md:grid-cols-2">

          {/* CLOSE BUTTON (Floating in upper-right corner of right page) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4A5D4E] text-white hover:bg-[#3B4C3E] flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none"
            title="Cerrar libro"
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
            {/* Top Right Floral Line Art */}
            <svg className="absolute top-2 right-2 w-24 h-24 sm:w-28 sm:h-28 text-[#D5C2AB]/40 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M90 10 C65 20, 45 40, 35 70 M90 10 C70 30, 80 50, 65 65" />
              <path d="M80 15 C75 10, 70 12, 72 18 C78 20, 85 18, 80 15 Z" fill="currentColor" fillOpacity="0.2" />
              <path d="M65 25 C60 20, 55 22, 57 28 C63 30, 70 28, 65 25 Z" fill="currentColor" fillOpacity="0.2" />
            </svg>

            {/* Bottom Right Floral Line Art */}
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
                  {/* Circular Medallion */}
                  <CategoryIconMedallion item={item} />
                  {/* Short Bold Title */}
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#382D2B] mb-0.5 leading-tight group-hover:text-[#8B5A2B] transition-colors">
                    {item.title}
                  </h4>
                  {/* Small Description */}
                  <p className="font-serif text-[10px] sm:text-[11px] text-[#7A6B5D] leading-tight max-w-[120px]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CALL TO ACTION BUTTON (BOTTOM CENTER) */}
            <div className="relative z-10 pt-4 sm:pt-6 text-center">
              {isProductMode && product && onAddToCart ? (
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="w-full max-w-sm mx-auto py-3 sm:py-3.5 px-6 rounded-full bg-[#4A5D4E] hover:bg-[#3C4A3E] text-white text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>ADQUIRIR EBOOK (${product.price.toLocaleString('es-AR')})</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (portal && onSelectPortal) {
                      onSelectPortal(portal);
                    } else if (onSelectPortal) {
                      // Fallback if portal is null
                    }
                    onClose();
                  }}
                  className="w-full max-w-sm mx-auto py-3 sm:py-3.5 px-6 rounded-full bg-[#4A5D4E] hover:bg-[#3C4A3E] text-white text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>EXPLORAR ESTE PORTAL</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

