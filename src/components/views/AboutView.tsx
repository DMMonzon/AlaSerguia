import React, { useState, useEffect } from 'react';
import { PageView } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AntiqueBookDivider } from '../AntiqueBookDivider';
import logoImg from '../../../assets/img/Logo.jpeg';
import alaImg from '../../../assets/img/Ala.png';
import serImg from '../../../assets/img/Ser.png';
import guiaImg from '../../../assets/img/Guia.png';

interface AboutViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setCurrentPage }) => {
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

  const nameBreakdown = [
    {
      title: 'Ala',
      meaning: 'Representa aquello que nos sostiene aunque no siempre podamos verlo. La espiritualidad, la intuición y la conexión que nos guía en cada paso.',
      illustration: alaImg
    },
    {
      title: 'Ser',
      meaning: 'Nuestra esencia, nuestra autenticidad. El permiso para ser quienes realmente somos y honrar nuestra luz única en el mundo.',
      illustration: serImg
    },
    {
      title: 'Guía',
      meaning: 'El acompañamiento en el camino, la certeza de que nadie tiene que recorrer su historia en soledad.',
      illustration: guiaImg
    }
  ];

  const timelineSteps = [
    { title: 'Nace una idea', desc: 'El deseo de acompañar a personas en su camino de transformación.' },
    { title: 'Aparecen los cuentos', desc: 'Historias que de a poco toman forma para hablar al corazón de grandes y pequeños.' },
    { title: 'Llegan Sofía y Kael', desc: 'Personajes que trajeron magia, enseñanza y un mensaje de amor para compartir.' },
    { title: 'Nacen los oráculos', desc: 'Herramientas lúdicas e intuitivas para guiar e inspirar la luz interior.' },
    { title: 'Las herramientas', desc: 'Ebooks, guías y recursos para acompañar procesos de crecimiento personal.' },
    { title: 'El acompañamiento', desc: 'Sesiones y espacios para caminar juntos cuando necesitamos ser escuchados.' },
    { title: 'El libro continúa...', desc: 'AlaSerguía sigue creciendo con cada historia y cada paso compartido.' }
  ];

  return (
    <div className="relative">
      {/* CAPA DE FONDO ESTÁTICA CON BLUR GRADUAL Y LENTO EN SCROLL */}
      <div className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0 overflow-hidden">
        <img
          src={logoImg}
          alt="AlaSerguía Fondo"
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
                <span>» Nuestra historia «</span>
              </div>

              {/* Main Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E120A] font-bold leading-tight tracking-wide drop-shadow-xs">
                El origen de AlaSerguía
              </h1>

              {/* Floating Heart & Fine Divider Ornament */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[#B35A5A]">
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
                <span className="text-sm font-bold leading-none select-none">♡</span>
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
              </div>

              {/* Descriptive Text */}
              <p className="font-serif text-base sm:text-lg text-[#2B1D11] leading-relaxed italic font-medium drop-shadow-xs">
                Todo gran viaje comienza con una pregunta. AlaSerguía nació del deseo de acompañar, de compartir herramientas que transforman y de recordar que siempre tenemos alas para volver a nosotros mismos.
              </p>

              {/* CTA Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setCurrentPage('portals')}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#8B5A2B] text-white font-serif text-sm font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center cursor-pointer"
                >
                  EXPLORAR PORTALES
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

          {/* SECTION 2: MEANING OF OUR NAME (Ala, Ser, Guía) */}
          <section id="significado-nombre" className="relative z-10 px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#382D2B]">
                El significado de nuestro nombre
              </h2>
              <p className="text-xs sm:text-sm text-[#6A5A4D] font-serif">
                AlaSerguía es la unión de tres palabras que representan nuestra esencia y propósito.
              </p>
              <div className="w-12 h-0.5 bg-[#C8B29B] mx-auto pt-1" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {nameBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF5EF]/90 rounded-2xl border-2 border-[#E2D5C5] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-row items-stretch min-h-[150px] group"
                >
                  <div className="w-1/3 min-w-[110px] max-w-[130px] p-2.5 flex items-center justify-center shrink-0 border-r-2 border-[#E2D5C5] bg-[#F4EBE1]/40">
                    <img
                      src={item.illustration}
                      alt={item.title}
                      className="w-full h-full max-h-[120px] object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col justify-center space-y-1.5 text-left flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6A5A4D] font-serif leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AntiqueBookDivider />

          {/* SECTION 3: TIMELINE ("Cómo nació AlaSerguía") */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="bg-[#FAF5EF]/90 rounded-3xl border-2 border-[#E2D5C5] p-6 sm:p-10 space-y-8 shadow-sm">
              <div className="text-center space-y-2">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#382D2B]">
                  Cómo nació AlaSerguía
                </h2>
                <p className="text-xs sm:text-sm text-[#6A5A4D] font-serif">
                  Un camino que fue tomando forma de a poco, guiado por la intuición y el corazón.
                </p>
                <div className="w-12 h-0.5 bg-[#C8B29B] mx-auto pt-1" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {timelineSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#F4EBE1] border border-[#D8C5B0] text-center space-y-2 flex flex-col justify-between"
                  >
                    <div className="w-7 h-7 mx-auto rounded-full bg-[#8B5A2B] text-white text-xs font-bold flex items-center justify-center font-cinzel">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-serif text-xs font-bold text-[#382D2B] leading-tight">
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-[#7A6B5D] mt-1 leading-tight font-serif">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <AntiqueBookDivider />

          {/* SECTION 4: SOBRE MÍ - FERNANDA */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-[#F4EBE1]/90 rounded-3xl border-2 border-[#D8C5B0] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
              <div className="lg:col-span-4 relative">
                <div className="relative mx-auto rounded-2xl overflow-hidden border-4 border-[#C8B29B] shadow-md max-w-sm">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
                    alt="Fernanda de AlaSerguía"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#382D2B]">
                  Sobre mí ♡
                </h3>
                <p className="font-serif text-lg font-semibold text-[#8B5A2B]">
                  Soy Fernanda.
                </p>
                <p className="text-xs sm:text-sm text-[#5C4D4B] leading-relaxed font-serif">
                  Como muchas personas, también atravesé momentos de búsqueda, preguntas y transformación. AlaSerguía nació de ese recorrido y sigue creciendo conmigo, con cada experiencia, cada aprendizaje y cada persona que decide caminar un tramo de este camino.
                </p>
                <p className="text-xs sm:text-sm text-[#5C4D4B] leading-relaxed font-serif">
                  Mi propósito es acompañarte a reconectar con tu esencia, con tu luz y con tu poder de crear la vida que soñas.
                </p>

                <p className="font-handwriting text-2xl text-[#8B5A2B] pt-2">
                  Gracias por estar acá. Este camino también es tuyo. ♡
                </p>
              </div>
            </div>
          </section>

          <AntiqueBookDivider />

          {/* BOTTOM CTA */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-[#FAF5EF]/90 rounded-2xl border border-[#D8C5B0] p-8 space-y-4 max-w-3xl mx-auto shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
                Esto es AlaSerguía
              </h3>
              <p className="text-xs text-[#6A5A4D] font-serif">
                Un espacio creado para inspirar, guiar y acompañar tu camino de regreso a vos. Gracias por ser parte de esta historia.
              </p>
              <button
                onClick={() => setCurrentPage('portals')}
                className="px-8 py-3 rounded-full bg-[#8B5A2B] text-white font-serif text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all inline-flex items-center justify-center cursor-pointer"
              >
                EXPLORAR LOS PORTALES
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};