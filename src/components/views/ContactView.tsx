import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, MapPin, Clock, HelpCircle, Sparkles } from 'lucide-react';
import { AntiqueBookDivider } from '../AntiqueBookDivider';
import portal3HomeImg from '../../../assets/img/Portal3_Home.jpeg';

export const ContactView: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const faqs = [
    {
      q: '¿Cómo recibo mis e-books y mini guías tras la compra?',
      a: 'Inmediatamente después de realizar tu pago, el sistema te mostrará los botones de descarga directa en pantalla y además recibirás un correo electrónico con los enlaces permanentes en tu casilla de correo.'
    },
    {
      q: '¿Las sesiones de Tarot, Reiki y Akáshicos son online?',
      a: 'Sí, todas nuestras sesiones individuales se realizan a distancia mediante videollamada de Google Meet o Zoom, asegurando un entorno cómodo y privado desde el lugar donde te encuentres.'
    },
    {
      q: '¿Puedo regalar un e-book o una sesión a otra persona?',
      a: '¡Por supuesto! Durante el proceso de compra puedes indicarnos el nombre y correo de la persona agasajada para enviarle una tarjeta de regalo personalizada con un mensaje especial.'
    },
    {
      q: '¿En qué formato vienen las cartas y oráculos?',
      a: 'Vienen en formato digital PDF de alta resolución listo para descargar, visualizar en tablet/móvil o imprimir en alta calidad para tenerlas en formato físico.'
    }
  ];

  return (
    <div className="relative">
      {/* CAPA DE FONDO ESTÁTICA CON BLUR GRADUAL Y LENTO EN SCROLL */}
      <div className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0 overflow-hidden">
        <img
          src={portal3HomeImg}
          alt="Contacto Hero"
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
                <span>» Sigamos en contacto «</span>
              </div>

              {/* Main Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E120A] font-bold leading-tight tracking-wide drop-shadow-xs">
                Escríbeme un mensaje
              </h1>

              {/* Floating Heart & Fine Divider Ornament */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[#B35A5A]">
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
                <span className="text-sm font-bold leading-none select-none">♡</span>
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
              </div>

              {/* Descriptive Text */}
              <p className="font-serif text-base sm:text-lg text-[#2B1D11] leading-relaxed italic font-medium drop-shadow-xs">
                Si tienes dudas sobre las sesiones, los e-books o deseas consultarnos sobre algo específico, estamos aquí para responderte con amor.
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

          {/* CONTENIDO INTERNO: INFORMACIÓN DE CONTACTO, FAQ Y FORMULARIO */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">

              {/* Left Column: Contact Info & FAQ */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#FAF5EF]/95 rounded-3xl border-2 border-[#E2D5C5] p-6 space-y-4 shadow-sm">
                  <h3 className="font-serif text-xl font-bold text-[#382D2B]">
                    Información de Contacto
                  </h3>

                  <div className="space-y-3 text-xs text-[#5C4D4B]">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5]">
                      <Mail className="w-4 h-4 text-[#8B5A2B]" />
                      <div>
                        <p className="font-bold text-[#382D2B]">Correo Electrónico</p>
                        <p className="text-[#6A5A4D]">hola@alaserguia.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5]">
                      <MapPin className="w-4 h-4 text-[#8B5A2B]" />
                      <div>
                        <p className="font-bold text-[#382D2B]">Modalidad de Atención</p>
                        <p className="text-[#6A5A4D]">Online global • Envíos digitales inmediatos</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5]">
                      <Clock className="w-4 h-4 text-[#8B5A2B]" />
                      <div>
                        <p className="font-bold text-[#382D2B]">Horario de Respuesta</p>
                        <p className="text-[#6A5A4D]">Lunes a Viernes de 9 a 18 hs</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Accordion */}
                <div className="bg-[#FAF5EF]/95 rounded-3xl border-2 border-[#E2D5C5] p-6 space-y-4 shadow-sm">
                  <h3 className="font-serif text-xl font-bold text-[#382D2B] flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#8B5A2B]" />
                    Preguntas Frecuentes
                  </h3>

                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-[#E2D5C5] rounded-xl overflow-hidden bg-[#F4EBE1]">
                        <button
                          onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                          className="w-full p-3 text-left font-serif text-xs font-bold text-[#382D2B] flex items-center justify-between hover:bg-[#EAE0D3] cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <span className="font-bold">{openFaq === idx ? '−' : '+'}</span>
                        </button>
                        {openFaq === idx && (
                          <div className="p-3 pt-0 text-xs text-[#6A5A4D] font-serif leading-relaxed border-t border-[#E2D5C5] bg-[#FAF5EF]">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7 bg-[#FAF5EF]/95 rounded-3xl border-2 border-[#C8B29B] p-6 sm:p-10 space-y-6 shadow-md relative">
                <div className="border-b border-[#E2D5C5] pb-3">
                  <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
                    Formulario de Mensaje
                  </h3>
                  <p className="text-xs text-[#7A6B5D] font-serif mt-1">
                    Completa los datos a continuación y nos pondremos en contacto contigo a la brevedad.
                  </p>
                </div>

                {sent ? (
                  <div className="text-center py-12 space-y-3 animate-fadeIn">
                    <CheckCircle2 className="w-12 h-12 text-[#4A7C59] mx-auto" />
                    <h4 className="font-serif text-2xl font-bold text-[#382D2B]">
                      ¡Mensaje Enviado!
                    </h4>
                    <p className="text-xs text-[#6A5A4D] max-w-sm mx-auto">
                      Gracias {formData.name}. Te responderemos pronto al correo <strong>{formData.email}</strong>.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="px-6 py-2 rounded-full bg-[#8B5A2B] text-white text-xs font-bold hover:bg-[#6A4320] cursor-pointer"
                    >
                      ENVIAR OTRO MENSAJE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#5C4D4B]">Tu Nombre *</label>
                        <input
                          type="text"
                          required
                          placeholder="Tu nombre"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#5C4D4B]">Tu Correo Electrónico *</label>
                        <input
                          type="email"
                          required
                          placeholder="correo@ejemplo.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#5C4D4B]">Asunto del Mensaje *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Consulta sobre E-books o Sesiones"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#5C4D4B]">Tu Consulta o Mensaje *</label>
                      <textarea
                        rows={6}
                        required
                        placeholder="Escribe tu mensaje aquí con total libertad..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3.5 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF] leading-relaxed font-serif"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center cursor-pointer"
                    >
                      ENVIAR MENSAJE MANUSCRITO
                    </button>
                  </form>
                )}
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
