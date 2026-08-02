import React, { useState } from 'react';
import { PageView, Product, Portal, Article } from '../../types';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Sun,
  Heart,
  Feather,
  Compass,
  Check,
  Send,
  Eye
} from 'lucide-react';
import homeHeroImg from '../../../assets/img/HomeHero.jpeg';

interface HomeViewProps {
  setCurrentPage: (page: PageView) => void;
  portals: Portal[];
  products: Product[];
  articles: Article[];
  onOpenBookModal: (portal?: Portal, product?: Product) => void;
  onAddToCart: (prod: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentPage,
  portals,
  products,
  articles,
  onOpenBookModal,
  onAddToCart,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <div>

      {/* HERO BANNER SECTION */}
      <section
        className="relative w-full min-h-[100dvh] flex flex-col justify-center pt-28 pb-12 sm:pt-36 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2CEB8] bg-cover bg-bottom bg-fixed bg-no-repeat bg-transparent"
        style={{ backgroundImage: `url(${homeHeroImg})` }}
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

          {/* Hero Left Text Column */}
          <div className="lg:col-span-6 z-10 animate-fadeIn">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF]/20 backdrop-blur-md border-2 border-[#8B5A2B]/30 shadow-lg space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0D3]/60 border border-[#C8B29B] text-xs font-serif text-[#8B5A2B] backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Un santuario para tu crecimiento interior</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E120A] font-bold leading-tight drop-shadow-xs">
                Hay momentos que cambian un camino.
              </h1>

              <p className="font-serif text-base sm:text-lg text-[#2B1D11] font-medium italic leading-relaxed drop-shadow-xs">
                Bienvenido a <strong className="text-[#1E120A] not-italic font-bold">AlaSerguía</strong>. Un espacio sagrado para reconectar con tu esencia, nutrir tu intuición y desplegar la luz que habita en ti.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#8B5A2B] text-white font-serif text-sm font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>CONOCÉ MÁS</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => setCurrentPage('portals')}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#FAF5EF] border-2 border-[#D8C5B0] text-[#382D2B] font-serif text-sm font-bold tracking-wider hover:bg-[#EAE0D3] transition-all cursor-pointer"
                >
                  EXPLORAR PORTALES
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Subsequent Sections Wrapper for Parallax Slide-Over Effect */}
      <div className="relative z-10 bg-[#F4EBE1] pt-16 pb-16 space-y-16 border-t border-[#E2CEB8] shadow-2xl">
        {/* PORTALS SECTION ("Elegí tu portal: ¿Qué necesitas hoy?") */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest flex items-center justify-center gap-1">
              Elegí tu portal
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#382D2B] font-bold">
              ¿Qué necesitas hoy?
            </h2>
            <div className="w-12 h-0.5 bg-[#C8B29B] mx-auto" />
          </div>

          {/* Portals 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portals.map((p) => (
              <div
                key={p.id}
                className="bg-[#FAF5EF] rounded-2xl border-2 border-[#E2D5C5] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1 h-[540px]"
              >
                {/* 70% Height Image Section */}
                <div className="relative h-[70%] overflow-hidden border-b border-[#E2D5C5]">
                  <img
                    src={p.illustration}
                    alt={p.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* 30% Height Content Section */}
                <div className="h-[30%] p-4 flex flex-col justify-between text-center bg-[#FAF5EF]">
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#382D2B] group-hover:text-[#8B5A2B] transition-colors line-clamp-1">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-[#6A5A4D] font-serif leading-relaxed line-clamp-2">
                      {p.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenBookModal(p, undefined)}
                    className="w-full py-2 px-4 rounded-xl border border-[#C8B29B] bg-[#F4EBE1] text-[#382D2B] text-xs font-bold tracking-wider hover:bg-[#8B5A2B] hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>EXPLORAR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED COLLECTIONS / STORE SECTION */}
        <section className="bg-[#FAF5EF] py-12 border-y border-[#E2CEB8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

            <div className="text-center space-y-2 max-w-xl mx-auto">
              <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest">
                Descubrí nuestras colecciones
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#382D2B] font-bold">
                Recursos para tu camino
              </h2>
              <div className="w-12 h-0.5 bg-[#C8B29B] mx-auto" />
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#F4EBE1] rounded-2xl border border-[#D8C5B0] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-[#EAE0D3]">
                      <img
                        src={prod.coverImage}
                        alt={prod.title}
                        className="w-full h-full object-cover"
                      />
                      {prod.badge && (
                        <span className="absolute top-3 left-3 bg-[#8B5A2B] text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
                          {prod.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-4 space-y-2">
                      <p className="text-[10px] font-cinzel uppercase text-[#A88F76] font-bold tracking-widest">
                        {prod.category}
                      </p>
                      <h3 className="font-serif text-lg font-bold text-[#382D2B] line-clamp-1">
                        {prod.title}
                      </h3>
                      <p className="text-xs text-[#6A5A4D] line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>
                      <p className="text-sm font-bold text-[#8B5A2B] pt-1">
                        ${prod.price.toLocaleString('es-AR')}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 space-y-2">
                    <button
                      onClick={() => onOpenBookModal(undefined, prod)}
                      className="w-full py-1.5 px-3 rounded-lg border border-[#C8B29B] bg-[#FAF5EF] text-[#382D2B] text-xs font-medium hover:bg-[#EAE0D3] transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#8B5A2B]" />
                      Vista previa
                    </button>

                    <button
                      onClick={() => onAddToCart(prod)}
                      className="w-full py-2 px-3 rounded-lg bg-[#8B5A2B] text-white text-xs font-bold hover:bg-[#6A4320] transition-colors shadow-xs"
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setCurrentPage('store')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#EAE0D3] text-[#382D2B] font-serif text-xs font-bold tracking-wider hover:bg-[#8B5A2B] hover:text-white transition-all border border-[#C8B29B]"
              >
                IR A LA TIENDA COMPLETA →
              </button>
            </div>

          </div>
        </section>

        {/* LATEST ARTICLES & NEWSLETTER GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Hola, soy Fernanda */}
          <div className="lg:col-span-7 bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center book-shadow">
            <div className="w-full md:w-2/5 relative">
              <div className="relative mx-auto max-w-xs rounded-2xl overflow-hidden border-4 border-[#C8B29B] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
                  alt="Fernanda de AlaSerguía"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-[#FAF5EF]/90 backdrop-blur-xs p-1.5 rounded-lg border border-[#D8C5B0] text-center">
                  <p className="font-serif font-bold text-xs text-[#382D2B]">Fernanda</p>
                  <p className="text-[9px] text-[#7A6B5D] font-serif italic">Creadora de AlaSerguía</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/5 space-y-3 text-center md:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#382D2B] font-bold">
                Hola, soy Fernanda
              </h3>
              <div className="w-12 h-0.5 bg-[#8B5A2B] mx-auto md:mx-0" />

              <p className="font-serif text-xs sm:text-sm text-[#5C4D4B] leading-relaxed">
                AlaSerguía nació de mi propio camino de transformación. Hoy, mi misión es acompañarte a vos en el tuyo, a través de herramientas que te ayuden a reconectar con tu esencia y recordar la luz que ya sos.
              </p>

              <blockquote className="italic font-serif text-[11px] text-[#8B5A2B] bg-[#F4EBE1] p-2.5 rounded-lg border-l-2 border-[#8B5A2B]">
                &ldquo;No estamos aquí para arreglar nada roto, sino para recordar la plenitud que habitaba en nosotros desde el inicio.&rdquo;
              </blockquote>

              <div className="pt-1">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="px-5 py-2 rounded-full border-2 border-[#8B5A2B] text-[#8B5A2B] font-serif text-[11px] font-bold tracking-wider hover:bg-[#8B5A2B] hover:text-white transition-all cursor-pointer"
                >
                  CONOCÉ MI HISTORIA
                </button>
              </div>
            </div>
          </div>

          {/* Right: Newsletter Note Card */}
          <div className="lg:col-span-5 bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 sm:p-8 space-y-4 relative book-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#EAE0D3] text-[#8B5A2B] flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
                Recibí inspiración
              </h3>

              <p className="text-xs text-[#6A5A4D] font-serif leading-relaxed">
                Suscribite al newsletter y recibí contenido exclusivo, reflexiones semanales, novedades y recursos gratuitos directamente en tu correo.
              </p>
            </div>

            {newsletterSuccess ? (
              <div className="p-4 rounded-xl bg-[#E2EEDD] border border-[#A8C9A0] text-xs text-[#3E6333] space-y-1 animate-fadeIn">
                <p className="font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" /> ¡Suscripción confirmada!
                </p>
                <p>Gracias por sumarte a nuestra comunidad. Pronto recibirás noticias nuestras.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3 pt-2">
                <input
                  type="email"
                  required
                  placeholder="Tu correo electrónico"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-[#C8B29B] bg-[#FAF5EF] text-[#382D2B] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>SUSCRIBIRME</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <p className="text-[10px] text-[#A88F76] font-serif italic text-center pt-2">
              * Sin spam. Solo cartas escritas desde el corazón.
            </p>
          </div>

        </section>

      </div>
    </div>
  );
};
