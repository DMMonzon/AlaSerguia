import React, { useState, useEffect } from 'react';
import { PageView, SessionService } from '../../types';
import { Sparkles, ArrowRight, CheckCircle2, X, Eye } from 'lucide-react';
import { AntiqueBookDivider } from '../AntiqueBookDivider';
import portal4HomeImg from '../../../assets/img/Portal4_Home.jpeg';
import tarotImg from '../../../assets/img/Tarot.png';
import reikiImg from '../../../assets/img/Reiki.png';
import registrosImg from '../../../assets/img/Registros.png';

const getSessionImage = (session: SessionService) => {
  if (session.id === 'sess-tarot' || session.title.toLowerCase().includes('tarot')) {
    return tarotImg;
  }
  if (session.id === 'sess-reiki' || session.title.toLowerCase().includes('reiki')) {
    return reikiImg;
  }
  if (session.id === 'sess-akashicos' || session.title.toLowerCase().includes('registro') || session.title.toLowerCase().includes('akáshico')) {
    return registrosImg;
  }
  return session.illustration || tarotImg;
};

interface ServicesViewProps {
  sessions: SessionService[];
  setCurrentPage: (page: PageView) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ sessions, setCurrentPage }) => {
  const [scrollY, setScrollY] = useState(0);
  const [detailSession, setDetailSession] = useState<SessionService | null>(null);
  const [selectedSession, setSelectedSession] = useState<SessionService | null>(null);
  const [bookingForm, setBookingForm] = useState({ date: '', time: '15:00', name: '', email: '', notes: '' });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

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

  const handleOpenBooking = (session: SessionService) => {
    setSelectedSession(session);
    setBookingConfirmed(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div className="relative">
      {/* CAPA DE FONDO ESTÁTICA CON BLUR GRADUAL Y LENTO EN SCROLL */}
      <div className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0 overflow-hidden">
        <img
          src={portal4HomeImg}
          alt="Acompañamiento Hero"
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
                <span>» PORTAL ACOMPAÑAMIENTO «</span>
              </div>

              {/* Main Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E120A] font-bold leading-tight tracking-wide drop-shadow-xs">
                Espacio de Acompañamiento
              </h1>

              {/* Floating Heart & Fine Divider Ornament */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[#B35A5A]">
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
                <span className="text-sm font-bold leading-none select-none">♡</span>
                <span className="h-[1px] w-12 bg-[#8B5A2B]/60" />
              </div>

              {/* Descriptive Text */}
              <p className="font-serif text-base sm:text-lg text-[#2B1D11] leading-relaxed italic font-medium drop-shadow-xs">
                Hay caminos que podemos recorrer solos. Y hay otros en los que sentir una presencia al lado hace toda la diferencia. Un espacio de escucha, reflexión y conexión sagrada.
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

          {/* "¿Cómo puedo acompañarte hoy?" GRID */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest">
                »» Servicios & Sesiones ««
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#382D2B] font-bold">
                ¿Cómo puedo acompañarte hoy?
              </h2>
              <div className="w-12 h-0.5 bg-[#C8B29B] mx-auto pt-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {sessions.slice(0, 3).map((sess) => (
                <div
                  key={sess.id}
                  className="bg-[#FAF5EF]/90 rounded-2xl border-2 border-[#E2D5C5] p-6 sm:p-7 space-y-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="h-32 sm:h-36 w-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={getSessionImage(sess)}
                        alt={sess.title}
                        className="max-h-full max-w-[200px] sm:max-w-[220px] w-auto h-auto object-contain drop-shadow-sm"
                      />
                    </div>

                    <div className="text-center space-y-1">
                      <h3 className="font-serif text-2xl font-bold text-[#382D2B]">{sess.title}</h3>
                      <p className="text-[11px] text-[#8B5A2B] font-cinzel uppercase font-bold tracking-wider">{sess.subtitle}</p>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#6A5A4D] font-serif leading-relaxed text-center">
                      {sess.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#E2D5C5]/70">
                    <button
                      type="button"
                      onClick={() => setDetailSession(sess)}
                      title="Ver detalles"
                      className="group/eye relative px-3.5 py-2.5 rounded-xl flex items-center justify-center bg-[#F4EBE1] border border-[#C8B29B] text-[#382D2B] hover:bg-[#8B5A2B] hover:text-white hover:border-[#8B5A2B] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      <span className="text-[11px] font-cinzel uppercase font-bold tracking-wider">
                        VER
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenBooking(sess)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center"
                    >
                      <span>AGENDAR</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AntiqueBookDivider />

          {/* BANNER INFERIOR ("INVITACIÓN A ESCRIBIR UNA CARTA") */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl mx-auto bg-[#FAF5EF]/90 rounded-3xl border border-[#E2D5C5] p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#382D2B] font-bold">
                  ¿Y si todavía no sabés qué necesitás? ♡
                </h3>

                <p className="font-serif text-sm sm:text-base text-[#6A5A4D] max-w-2xl mx-auto leading-relaxed my-4">
                  No hace falta decidir ahora. Podés empezar escribiéndome una carta. A veces poner en palabras lo que sentimos ya es el primer paso.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage('letters');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3 rounded-full bg-[#8B5A2B] text-white font-serif text-sm font-bold tracking-wider hover:bg-[#6A4320] shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center cursor-pointer group"
                >
                  <span>ESCRIBIR UNA CARTA</span>
                </button>
              </div>
            </div>
          </section>

          <AntiqueBookDivider />

          {/* INFOGRAPHIC: "¿Cómo son los encuentros?" */}
          <section className="relative z-10 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest">
                »» Proceso & Preparación ««
              </p>
              <h2 className="font-serif text-3xl font-bold text-[#382D2B]">
                ¿Cómo son los encuentros?
              </h2>
              <div className="w-12 h-0.5 bg-[#C8B29B] mx-auto pt-1" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {[
                { step: 'A distancia', desc: 'Todos los encuentros se realizan de forma online, desde donde estés.' },
                { step: 'Duración', desc: 'Cada sesión tiene una duración aproximada de 60 a 75 minutos.' },
                { step: 'Agendamos juntas', desc: 'Elegimos el día y horario que mejor se adapte a tu momento.' },
                { step: 'Después del encuentro', desc: 'Recibirás por correo electrónico la información y material.' },
                { step: 'Preparación', desc: 'Te enviaré indicaciones sencillas para prepararte si es necesario.' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF5EF]/90 border border-[#E2D5C5] text-center space-y-2 shadow-xs">
                  <span className="text-xs font-cinzel font-bold text-[#8B5A2B]">0{idx + 1}</span>
                  <h4 className="font-serif text-sm font-bold text-[#382D2B]">{item.step}</h4>
                  <p className="text-[10px] text-[#7A6B5D] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* BOOKING MODAL */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B231F]/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#FAF5EF] rounded-2xl shadow-2xl border-2 border-[#D8C5B0] overflow-hidden p-6 space-y-5 my-auto">
            <button
              onClick={() => setSelectedSession(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#5C4D4B] hover:bg-[#EAE0D3] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingConfirmed ? (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
                    Reserva: Sesión de {selectedSession.title}
                  </h3>
                  <p className="text-xs text-[#8B5A2B] font-medium">
                    {selectedSession.duration} • {selectedSession.modality}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5] text-xs space-y-1">
                  <p className="font-bold text-[#382D2B]">Beneficios clave:</p>
                  <ul className="list-disc list-inside text-[#6A5A4D] space-y-0.5">
                    {selectedSession.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#5C4D4B]">Fecha preferida</label>
                      <input
                        type="date"
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8C5B0] bg-[#FAF5EF]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#5C4D4B]">Horario</label>
                      <select
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8C5B0] bg-[#FAF5EF]"
                      >
                        <option value="10:00">10:00 hs</option>
                        <option value="15:00">15:00 hs</option>
                        <option value="18:00">18:00 hs</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#5C4D4B]">Tu Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8C5B0] bg-[#FAF5EF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#5C4D4B]">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="correo@ejemplo.com"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8C5B0] bg-[#FAF5EF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#5C4D4B]">¿Querés dejar algún mensaje? (Opcional)</label>
                    <textarea
                      rows={2}
                      placeholder="Comentarios sobre lo que buscas consultar..."
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8C5B0] bg-[#FAF5EF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all cursor-pointer"
                  >
                    CONFIRMAR SOLICITUD DE RESERVA (${selectedSession.price.toLocaleString('es-AR')} ARS)
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4 animate-fadeIn">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#EAE0D3] text-[#4A7C59] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
                  ¡Solicitud Enviada con Éxito!
                </h3>

                <p className="text-xs text-[#6A5A4D]">
                  Gracias {bookingForm.name}. Te contactaremos a <strong>{bookingForm.email}</strong> para coordinar los detalles del encuentro y enviarte el enlace de acceso.
                </p>

                <button
                  onClick={() => setSelectedSession(null)}
                  className="w-full py-2.5 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold hover:bg-[#6A4320] cursor-pointer"
                >
                  ENTENDIDO
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SESSION DETAIL MODAL (al hacer clic en "Ver") */}
      {detailSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B231F]/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#FAF5EF] rounded-2xl shadow-2xl border-2 border-[#D8C5B0] overflow-hidden p-6 space-y-5 my-auto">
            <button
              onClick={() => setDetailSession(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#5C4D4B] hover:bg-[#EAE0D3] cursor-pointer"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3">
              <div className="h-32 sm:h-36 w-full flex items-center justify-center mx-auto">
                <img
                  src={getSessionImage(detailSession)}
                  alt={detailSession.title}
                  className="max-h-full max-w-[200px] sm:max-w-[220px] w-auto h-auto object-contain drop-shadow-sm"
                />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
                  {detailSession.title}
                </h3>
                <p className="text-xs text-[#8B5A2B] font-cinzel font-bold uppercase tracking-wider mt-0.5">
                  {detailSession.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#6A5A4D] font-serif leading-relaxed">
                {detailSession.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5] text-xs text-[#5C4D4B] space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <p><strong className="text-[#382D2B]">Duración:</strong> {detailSession.duration}</p>
                <p><strong className="text-[#382D2B]">Modalidad:</strong> {detailSession.modality}</p>
              </div>
              <p><strong className="text-[#382D2B]">Inversión:</strong> ${detailSession.price.toLocaleString('es-AR')} ARS</p>

              <div className="pt-2 border-t border-[#D8C5B0]/60 space-y-1">
                <p className="font-bold text-[#382D2B]">Beneficios clave:</p>
                <ul className="list-disc list-inside text-[#6A5A4D] space-y-0.5">
                  {detailSession.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDetailSession(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#C8B29B] bg-[#F4EBE1] text-[#382D2B] text-xs font-serif font-bold hover:bg-[#EAE0D3] cursor-pointer"
              >
                VOLVER
              </button>
              <button
                type="button"
                onClick={() => {
                  const s = detailSession;
                  setDetailSession(null);
                  handleOpenBooking(s);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md cursor-pointer flex items-center justify-center"
              >
                <span>AGENDAR ESTA SESIÓN</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
