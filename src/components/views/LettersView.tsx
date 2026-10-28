import React, { useState, useEffect, useRef } from 'react';
import { Letter } from '../../types';
import {
  Heart,
  Sparkles,
  Feather,
  Lock,
  Star,
  Compass,
  Flower2,
} from 'lucide-react';
import correoHeroImg from '../../../assets/img/CorreoHero.jpeg';

interface LettersViewProps {
  letters?: Letter[];
  onAddLetter: (letter: Letter) => void;
  onLikeLetter?: (letterId: string) => void;
}

// Disparadores iniciales e inspiradores según cada motivo de la carta
const CATEGORY_PROMPTS: Record<string, string> = {
  'Necesito desahogarme': 'Hoy necesito hacer espacio en mi pecho para decir que...',
  'Quiero agradecer': 'Hoy me tomo una pausa para agradecer de corazón por...',
  'Busco una opinión o consejo': 'Me encuentro en una encrucijada y me gustaría recibir una mirada sincera sobre...',
  'Estoy atravesando un cambio': 'Siento que una etapa se está transformando en mi vida y se trata de...',
  'Solo quería compartir algo lindo': 'En este grato espacio quiero aprovechar para contarte que...',
  'Prefiero escribir libremente': 'Hoy quiero decir que...',
};

const DEFAULT_PROMPT = 'Hoy quiero decir que...';

export const LettersView: React.FC<LettersViewProps> = ({
  onAddLetter,
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

  // Letter Form State
  const [selectedCategory, setSelectedCategory] = useState<string>('Necesito desahogarme');
  const [content, setContent] = useState<string>('');
  const [wantsResponse, setWantsResponse] = useState<boolean>(true);
  const [canShare, setCanShare] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSelectCategory = (categoryLabel: string) => {
    setSelectedCategory(categoryLabel);
    const prompt = CATEGORY_PROMPTS[categoryLabel] || DEFAULT_PROMPT;

    const isUntouched =
      !content.trim() ||
      Object.values(CATEGORY_PROMPTS).some(
        (p) => content.trim() === p.trim() || content.trim() === p.trim().replace(/\.+$/, '')
      );

    if (isUntouched) {
      const newContent = `${prompt} `;
      setContent(newContent);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(newContent.length, newContent.length);
        }
      }, 0);
    } else {
      textareaRef.current?.focus();
    }
  };

  const categories = [
    { label: 'Necesito desahogarme', icon: Heart, color: 'text-[#8B5A7A]' },
    { label: 'Quiero agradecer', icon: Sparkles, color: 'text-[#B88B6A]' },
    { label: 'Busco una opinión o consejo', icon: Star, color: 'text-[#C4975A]' },
    { label: 'Estoy atravesando un cambio', icon: Compass, color: 'text-[#8B7E6B]' },
    { label: 'Solo quería compartir algo lindo', icon: Flower2, color: 'text-[#A07085]' },
    { label: 'Prefiero escribir libremente', icon: Feather, color: 'text-[#7D6B58]' },
  ];

  const handleSubmitLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newLetter: Letter = {
      id: `let-${Date.now()}`,
      category: selectedCategory,
      content,
      wantsResponse: wantsResponse,
      canShareAnonymously: canShare,
      authorName: 'Anónimo',
      authorEmail: '',
      subject: '',
      createdAt: 'Hoy',
      heartsCount: 1,
      replies: [],
    };

    onAddLetter(newLetter);
    setSubmitted(true);
  };

  const resetForm = () => {
    setContent('');
    setSelectedCategory('Necesito desahogarme');
    setWantsResponse(true);
    setCanShare(true);
    setSubmitted(false);
  };

  return (
    <div className="relative">
      {/* CAPA DE FONDO ESTÁTICA CON BLUR GRADUAL Y LENTO EN SCROLL */}
      <div className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0 overflow-hidden">
        <img
          src={correoHeroImg}
          alt="Escribí tu carta"
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
                <span>» Buzón del Alma «</span>
              </div>

              {/* Main Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E120A] font-bold leading-tight tracking-wide drop-shadow-xs">
                Escribí tu carta ♡
              </h1>

              {/* Floating Heart & Fine Divider Ornament */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[#B35A5A]">
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
                <span className="text-sm font-bold leading-none select-none">♡</span>
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
              </div>

              {/* Descriptive Text */}
              <p className="font-serif text-base sm:text-lg text-[#2B1D11] leading-relaxed italic font-medium drop-shadow-xs">
                Este es tu espacio. Escribí con libertad. Dejá tus palabras, tus preguntas o aquello que tu corazón necesita soltar y confiar hoy.
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
          <filter id="ragged-sheet-edge" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.048 0.048" numOctaves="5" seed="24" result="sheetNoise" />
            <feDisplacementMap in="SourceGraphic" in2="sheetNoise" scale="14" xChannelSelector="R" yChannelSelector="G" result="sheetTorn" />
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

          {/* FORMULARIO DE CARTA DENTRO DEL PAPIRO */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            {submitted ? (
              <div className="max-w-2xl mx-auto bg-[#FAF5EF]/90 rounded-3xl border border-[#E2D7C5] p-8 sm:p-10 text-center space-y-6 shadow-md relative overflow-hidden">
                <div className="w-28 h-28 mx-auto">
                  <img
                    src="/img/letters/vintage_mailbox_flowers.png"
                    alt="Buzón"
                    className="w-full h-full object-contain drop-shadow-xs"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#382D2B]">
                    Gracias por confiarme estas palabras. ♡
                  </h3>
                  <p className="font-serif text-sm sm:text-base text-[#6A5A4D] leading-relaxed italic max-w-md mx-auto">
                    Tu carta ya encontró un lugar donde llegar. La leeré con el tiempo y la atención que merece. Gracias por permitir que este espacio sea parte de tu camino.
                  </p>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={resetForm}
                    className="px-8 py-3 rounded-full bg-[#6D5D7A] hover:bg-[#584964] text-white text-xs font-serif font-bold tracking-wide shadow-sm transition-all cursor-pointer"
                  >
                    ESCRIBIR OTRA CARTA
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitLetter} className="space-y-6 max-w-5xl mx-auto">
                {/* 1. FILA SUPERIOR: COLUMNA IZQUIERDA Y HOJA DE CARTA EMPAREJADAS EN ALTURA */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* COLUMNA IZQUIERDA: TEMÁTICAS + OPCIONES CON TOGGLES */}
                  <div className="lg:col-span-4 bg-[#FAF5EF]/90 rounded-2xl sm:rounded-3xl border border-[#EADBCE]/80 p-5 sm:p-6 space-y-5 shadow-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="text-center sm:text-left space-y-1">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#382D2B]">
                          ¿Qué te gustaría compartir hoy?
                        </h3>
                        <p className="text-[#8B6B88]/60 text-xs">♡</p>
                      </div>

                      {/* Botones de motivo */}
                      <div className="space-y-1.5">
                        {categories.map((cat) => {
                          const Icon = cat.icon;
                          const isSelected = selectedCategory === cat.label;
                          return (
                            <button
                              key={cat.label}
                              type="button"
                              onClick={() => handleSelectCategory(cat.label)}
                              className={`w-full text-left px-4 py-2.5 sm:py-3 rounded-2xl text-xs transition-all flex items-center gap-3 border-none cursor-pointer ${
                                isSelected
                                  ? 'bg-[#EFE6F0]/90 text-[#4E3955] font-semibold shadow-xs ring-1 ring-[#D8C7D8]/80'
                                  : 'bg-transparent hover:bg-[#F0E6D8]/70 text-[#5C4D4B]'
                              }`}
                            >
                              <Icon
                                className={`w-4 h-4 shrink-0 transition-transform ${
                                  isSelected ? 'text-[#6D5D7A] scale-110' : cat.color
                                }`}
                              />
                              <span className="font-serif text-[13px] leading-snug">
                                {cat.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Opciones con Toggle Buttons */}
                    <div className="pt-4 border-t border-[#EADBCE] space-y-3">
                      <div className="space-y-0.5">
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-[#382D2B] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#8B6B88]" />
                          Antes de enviar tu carta...
                        </h4>
                        <p className="text-[11px] text-[#7A6B5D] font-serif">
                          Personalizá cómo querés que recibamos tus palabras.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {/* Elección 1: Me gustaría recibir una respuesta */}
                        <div
                          onClick={() => setWantsResponse((prev) => !prev)}
                          className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none ${
                            wantsResponse
                              ? 'bg-[#EFE6F0]/90 border-[#C9B5CA] shadow-2xs'
                              : 'bg-[#F7F2EB]/70 border-[#EADBCE] hover:bg-[#F0E6D8]/60'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <p className="font-serif text-xs font-bold text-[#382D2B] leading-snug">
                              Me gustaría recibir una respuesta
                            </p>
                            <p className="text-[10px] text-[#7A6B5D] font-serif leading-snug">
                              Te responderé por correo cuando pueda.
                            </p>
                          </div>

                          {/* Toggle Switch */}
                          <button
                            type="button"
                            role="switch"
                            aria-checked={wantsResponse}
                            onClick={(e) => {
                              e.stopPropagation();
                              setWantsResponse((prev) => !prev);
                            }}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                              wantsResponse ? 'bg-[#6D5D7A]' : 'bg-[#D8C7B8]'
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                wantsResponse ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Elección 2: Deseo compartir mi historia */}
                        <div
                          onClick={() => setCanShare((prev) => !prev)}
                          className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none ${
                            canShare
                              ? 'bg-[#EFE6F0]/90 border-[#C9B5CA] shadow-2xs'
                              : 'bg-[#F7F2EB]/70 border-[#EADBCE] hover:bg-[#F0E6D8]/60'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <p className="font-serif text-xs font-bold text-[#382D2B] leading-snug">
                              Deseo compartir mi historia
                            </p>
                            <p className="text-[10px] text-[#7A6B5D] font-serif leading-snug">
                              Autorizo compartirla de forma anónima en la comunidad.
                            </p>
                          </div>

                          {/* Toggle Switch */}
                          <button
                            type="button"
                            role="switch"
                            aria-checked={canShare}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCanShare((prev) => !prev);
                            }}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                              canShare ? 'bg-[#6D5D7A]' : 'bg-[#D8C7B8]'
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                canShare ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* COLUMNA DERECHA: HOJA DE CARTA ANTIGUA (ALINEADA Y EMPAREJADA EN ALTURA) */}
                  <div className="lg:col-span-8 flex flex-col h-full">
                    <div className="relative p-6 sm:p-10 flex-1 min-h-[460px] sm:min-h-[500px] flex flex-col justify-between">
                      {/* Lámina de fondo de la hoja con bordes irregulares desgastados estilo papel */}
                      <div
                        className="absolute inset-0 z-0 pointer-events-none overflow-visible"
                        style={{
                          filter: 'drop-shadow(0 14px 24px rgba(45, 25, 15, 0.22)) drop-shadow(0 2px 6px rgba(45, 25, 15, 0.12))'
                        }}
                      >
                        <div
                          className="w-full h-full bg-[#FAF5EE] border border-[#D8C7B5]/80 relative overflow-hidden"
                          style={{ filter: 'url(#ragged-sheet-edge)' }}
                        >
                          {/* Suave sombra interna envejecida en los bordes de la hoja */}
                          <div
                            className="absolute inset-0"
                            style={{
                              boxShadow: 'inset 0 0 35px 8px rgba(160, 120, 80, 0.12), inset 0 0 10px 2px rgba(120, 80, 40, 0.08)'
                            }}
                          />
                        </div>
                      </div>

                      {/* Marco interior fino de papelería vintage */}
                      <div className="absolute inset-4 sm:inset-5 border border-[#E2D5C2]/60 rounded-xl pointer-events-none z-10" />

                      {/* Encabezado Manuscrito */}
                      <div className="space-y-1 relative z-10 mb-3">
                        <h2 className="font-cursive text-3xl sm:text-4xl text-[#5D4B66] tracking-wide">
                          Querida AlaSerguía...
                        </h2>
                        <div className="text-[#8B6B88]/60 text-xs pl-2">
                          ♡
                        </div>
                      </div>

                      {/* Textarea sin bordes nativos */}
                      <div className="relative z-10 flex-1 flex flex-col">
                        <textarea
                          ref={textareaRef}
                          rows={14}
                          required
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder={CATEGORY_PROMPTS[selectedCategory] || DEFAULT_PROMPT}
                          className="w-full flex-1 bg-transparent border-none outline-none focus:ring-0 text-[#3C2F2F] font-serif text-sm sm:text-base leading-relaxed placeholder:text-[#A89887]/80 resize-none pb-28 sm:pb-32"
                        />
                      </div>

                      {/* Ramita botánica en la esquina */}
                      <img
                        src="/img/letters/lavender_corner_branch.png"
                        alt=""
                        className="absolute bottom-2 right-2 w-44 sm:w-60 max-w-[55%] pointer-events-none select-none z-10 opacity-80"
                      />

                      {/* Contador sutil */}
                      <div className="relative z-10 text-[11px] text-[#A89887] font-serif pt-2 flex items-center justify-between">
                        <span>{content.length > 0 ? `${content.length} caracteres escritos` : ''}</span>
                        <span className="text-[10px] text-[#B8A695] italic font-serif">Buzón del Alma</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 2. BLOQUE FINAL DE ENVÍO CON EL CTA "CONFIAR ESTA CARTA" ENSANCHADO A LO ANCHO TOTAL */}
                <div className="w-full rounded-3xl bg-[#FAF5EF]/95 border-2 border-[#E2D5C5] p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8 shadow-sm">
                  <div className="shrink-0 flex items-center justify-center">
                    <img
                      src="/img/letters/vintage_mailbox_flowers.png"
                      alt="Buzón de cartas florecido"
                      className="w-20 sm:w-28 h-20 sm:h-28 object-contain select-none pointer-events-none drop-shadow-xs"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-1.5 font-serif">
                    <h4 className="text-base sm:text-lg font-bold text-[#382D2B]">
                      Gracias por confiarme estas palabras. ♡
                    </h4>
                    <p className="text-xs sm:text-sm text-[#6A5A4D] leading-relaxed">
                      Tu carta ya encontró un lugar donde llegar. La leeré con el tiempo y la atención que merece.
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] text-[#7A6B5D] pt-0.5">
                      <Lock className="w-3.5 h-3.5 text-[#8B6B88] shrink-0" />
                      <span>Tu identidad siempre estará protegida bajo confidencialidad.</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-center sm:items-end space-y-1.5">
                    <button
                      type="submit"
                      className="px-9 py-3.5 rounded-full bg-[#6D5D7A] hover:bg-[#584964] text-white font-serif text-sm font-semibold tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center cursor-pointer"
                    >
                      CONFIAR ESTA CARTA
                    </button>
                    <p className="text-[10px] text-[#8B7868] font-serif">
                      Tu carta será enviada de forma segura.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </section>

        </div>
      </div>
    </div>
  );
};
