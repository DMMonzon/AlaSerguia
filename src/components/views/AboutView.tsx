import React from 'react';
import { PageView } from '../../types';
import { ArrowRight } from 'lucide-react';
import logoImg from '../../../Logo.jpeg';

interface AboutViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setCurrentPage }) => {
  const nameBreakdown = [
    {
      title: 'Ala',
      meaning: 'Representa aquello que nos sostiene aunque no siempre podamos verlo. La espiritualidad, la intuición y la conexión que nos guía en cada paso.',
      illustration: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Ser',
      meaning: 'Nuestra esencia, nuestra autenticidad. El permiso para ser quienes realmente somos y honrar nuestra luz única en el mundo.',
      illustration: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Guía',
      meaning: 'El acompañamiento en el camino, la certeza de que nadie tiene que recorrer su historia en soledad.',
      illustration: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400'
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
    <div className="bg-[#FAF5EF]">
      {/* Fondo estático solo en la mitad derecha con difuminado suave en el borde izquierdo */}
      <div className="fixed top-0 right-0 w-full lg:w-1/2 h-[100dvh] pointer-events-none z-0 overflow-hidden">
        {/* Capa de Imagen */}
        <div
          className="w-full h-full bg-no-repeat bg-right bg-contain"
          style={{
            backgroundImage: `url(${logoImg})`,
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 45%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 45%)'
          }}
        />
        {/* Gradiente de difuminado directo sobre el lateral izquierdo de la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF5EF] via-[#FAF5EF]/70 via-35% to-transparent pointer-events-none z-10" />
      </div>

      {/* SECTION 1: HERO "QUIÉNES SOMOS" */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-transparent">
        {/* HERO CONTAINER & LEFT TEXT COLUMN */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

          <div className="lg:col-span-6 space-y-6 text-center lg:text-left max-w-xl mx-auto lg:mx-0 relative z-10 animate-fadeIn">

            {/* Top Pill / Detail */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE0D3]/90 border border-[#C8B29B] text-xs font-cinzel text-[#8B5A2B] tracking-[0.2em] uppercase font-bold shadow-xs backdrop-blur-xs">
              <span>»</span> Nuestra historia <span>«</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1E120A] font-bold leading-tight tracking-wide drop-shadow-xs">
              El origen de AlaSerguía
            </h1>

            {/* Floating Heart & Fine Divider Ornament */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-[#B35A5A]">
              <span className="h-[1px] w-12 bg-[#C8B29B]" />
              <span className="text-lg">♡</span>
              <span className="h-[1px] w-12 bg-[#C8B29B]" />
            </div>

            {/* Descriptive Text */}
            <p className="font-serif text-base sm:text-lg text-[#2B1D11] leading-relaxed italic font-medium drop-shadow-xs">
              Todo gran viaje comienza con una pregunta. AlaSerguía nació del deseo de acompañar, de compartir herramientas que transforman y de recordar que siempre tenemos alas para volver a nosotros mismos.
            </p>

          </div>

        </div>

      </section>

      {/* SUBSEQUENT SECTIONS WRAPPER FOR PARALLAX SLIDE-OVER EFFECT */}
      <div className="relative z-10 bg-[#FAF5EF] pt-16 pb-16 space-y-16 border-t border-[#E2D5C5] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* SECTION 2: MEANING OF OUR NAME (Ala, Ser, Guía) */}
          <section id="significado-nombre" className="space-y-8 scroll-mt-24">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#382D2B]">
                El significado de nuestro nombre
              </h2>
              <p className="text-xs sm:text-sm text-[#6A5A4D] font-serif">
                AlaSerguía es la unión de tres palabras que representan nuestra esencia y propósito.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {nameBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF5EF] rounded-2xl border-2 border-[#E2D5C5] overflow-hidden shadow-sm hover:shadow-md transition-all book-shadow flex flex-row items-stretch min-h-[150px]"
                >
                  <div className="w-1/3 min-w-[120px] relative shrink-0 border-r-2 border-[#E2D5C5] overflow-hidden">
                    <img
                      src={item.illustration}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col justify-center space-y-1.5 text-left flex-1">
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

          {/* SECTION 3: TIMELINE ("Cómo nació AlaSerguía") */}
          <section className="bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 sm:p-10 space-y-8 book-shadow">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#382D2B]">
                Cómo nació AlaSerguía
              </h2>
              <p className="text-xs sm:text-sm text-[#6A5A4D] font-serif">
                Un camino que fue tomando forma de a poco, guiado por la intuición y el corazón.
              </p>
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
          </section>

          {/* SECTION 4: SOBRE MÍ - FERNANDA */}
          <section className="bg-[#F4EBE1] rounded-3xl border-2 border-[#D8C5B0] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center book-shadow">
            <div className="lg:col-span-4 relative">
              <div className="relative mx-auto rounded-2xl overflow-hidden border-4 border-[#C8B29B] shadow-md">
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
          </section>

          {/* BOTTOM CTA */}
          <section className="text-center bg-[#FAF5EF] rounded-2xl border border-[#D8C5B0] p-8 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
              Esto es AlaSerguía
            </h3>
            <p className="text-xs text-[#6A5A4D] font-serif">
              Un espacio creado para inspirar, guiar y acompañar tu camino de regreso a vos. Gracias por ser parte de esta historia.
            </p>
            <button
              onClick={() => setCurrentPage('portals')}
              className="px-8 py-3 rounded-full bg-[#8B5A2B] text-white font-serif text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>EXPLORAR LOS PORTALES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>

        </div>
      </div>
    </div>
  );
};