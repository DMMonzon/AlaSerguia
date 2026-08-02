import React, { useState } from 'react';
import { PageView, SessionService } from '../../types';
import { Sparkles, Calendar, Clock, Video, Heart, ArrowRight, CheckCircle2, X } from 'lucide-react';

interface ServicesViewProps {
  sessions: SessionService[];
  setCurrentPage: (page: PageView) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ sessions, setCurrentPage }) => {
  const [selectedSession, setSelectedSession] = useState<SessionService | null>(null);
  const [bookingForm, setBookingForm] = useState({ date: '', time: '15:00', name: '', email: '', notes: '' });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleOpenBooking = (session: SessionService) => {
    setSelectedSession(session);
    setBookingConfirmed(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-10 animate-fadeIn">

      {/* HEADER WITH WOODEN DIRECTION SIGN ILLUSTRATION */}
      <section className="bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center book-shadow">

        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1">
            <span>♡</span> PORTAL ACOMPAÑAMIENTO <span>♡</span>
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#382D2B] font-bold">
            Acompañamiento ♡
          </h1>
          <div className="w-16 h-0.5 bg-[#C8B29B] mx-auto lg:mx-0" />

          <p className="font-serif text-base sm:text-lg text-[#2B1D11] leading-relaxed italic font-medium drop-shadow-xs">
            Hay caminos que podemos recorrer solos. Y hay otros en los que sentir una presencia al lado hace toda la diferencia.
          </p>

          <p className="text-xs text-[#5C4D4B] font-serif leading-relaxed">
            Este Portal reúne espacios de escucha, reflexión y conexión para acompañarte en el momento que estés viviendo.
          </p>
        </div>

        {/* Direction Signs Box */}
        <div className="lg:col-span-5 bg-[#F4EBE1] p-6 rounded-2xl border-2 border-[#D8C5B0] space-y-2 text-center">
          <p className="text-xs font-cinzel font-bold text-[#8B5A2B] uppercase tracking-wider mb-3">
            Principios de Encuentro
          </p>
          {['Escucha sin juicio', 'Conexión sagrada', 'Comprensión mutua', 'Transformación amorosa', 'Presencia plena'].map((sign, i) => (
            <div
              key={i}
              className="py-1.5 px-4 rounded-lg bg-[#FAF5EF] border border-[#C8B29B] text-xs font-serif font-bold text-[#382D2B] shadow-xs hover:bg-[#8B5A2B] hover:text-white transition-colors cursor-default"
            >
              {sign}
            </div>
          ))}
        </div>

      </section>

      {/* "¿Cómo puedo acompañarte hoy?" GRID */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest">
            »» Servicios & Sesiones ««
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#382D2B] font-bold">
            ¿Cómo puedo acompañarte hoy?
          </h2>
          <div className="w-12 h-0.5 bg-[#C8B29B] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className="bg-[#FAF5EF] rounded-2xl border-2 border-[#E2D5C5] p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between book-shadow"
            >
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-[#C8B29B] shadow-inner">
                  <img src={sess.illustration} alt={sess.title} className="w-full h-full object-cover" />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-[#382D2B]">{sess.title}</h3>
                  <p className="text-[10px] text-[#8B5A2B] font-cinzel uppercase font-bold">{sess.subtitle}</p>
                </div>

                <p className="text-xs text-[#6A5A4D] font-serif leading-relaxed text-center">
                  {sess.description}
                </p>

                <div className="p-3 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5] text-[11px] text-[#5C4D4B] space-y-1">
                  <p><strong className="text-[#382D2B]">Duración:</strong> {sess.duration}</p>
                  <p><strong className="text-[#382D2B]">Modalidad:</strong> {sess.modality}</p>
                  <p><strong className="text-[#382D2B]">Inversión:</strong> ${sess.price.toLocaleString('es-AR')} ARS</p>
                </div>
              </div>

              <button
                onClick={() => handleOpenBooking(sess)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-sm transition-all"
              >
                Conocer más / Agendar →
              </button>
            </div>
          ))}

          {/* 4th Card: Letters trigger */}
          <div className="bg-[#F4EBE1] rounded-2xl border-2 border-[#D8C5B0] p-6 space-y-4 shadow-sm flex flex-col justify-between text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF5EF] border border-[#C8B29B] flex items-center justify-center text-[#B35A5A]">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#382D2B]">Cartas para AlaSerguía</h3>
              <p className="text-xs text-[#6A5A4D] font-serif leading-relaxed">
                Un espacio seguro para escribir lo que sentís, compartir tu historia, hacer una pregunta o simplemente poner en palabras lo que vivís.
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('letters')}
              className="w-full py-2.5 px-4 rounded-xl border-2 border-[#8B5A2B] text-[#8B5A2B] text-xs font-bold tracking-wider hover:bg-[#8B5A2B] hover:text-white transition-all"
            >
              Escribir una carta ♡
            </button>
          </div>
        </div>
      </section>

      {/* "¿Y si todavía no sabés qué necesitás?" CTA */}
      <section className="bg-[#FAF5EF] rounded-2xl border-2 border-[#E2D5C5] p-8 text-center space-y-3 max-w-2xl mx-auto">
        <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
          ¿Y si todavía no sabés qué necesitás? ♡
        </h3>
        <p className="text-xs text-[#6A5A4D] font-serif leading-relaxed">
          No hace falta decidir ahora. Podés empezar escribiéndome una carta. A veces poner en palabras lo que sentimos ya es el primer paso.
        </p>
        <button
          onClick={() => setCurrentPage('letters')}
          className="px-6 py-2.5 rounded-full bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] inline-flex items-center gap-2"
        >
          <span>Escribir una carta ♡</span>
        </button>
      </section>

      {/* INFOGRAPHIC: "¿Cómo son los encuentros?" */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest">
            »» Proceso & Preparación ««
          </p>
          <h2 className="font-serif text-3xl font-bold text-[#382D2B]">
            ¿Cómo son los encuentros?
          </h2>
          <div className="w-12 h-0.5 bg-[#C8B29B] mx-auto" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { step: 'A distancia', desc: 'Todos los encuentros se realizan de forma online, desde donde estés.' },
            { step: 'Duración', desc: 'Cada sesión tiene una duración aproximada de 60 a 75 minutos.' },
            { step: 'Agendamos juntas', desc: 'Elegimos el día y horario que mejor se adapte a tu momento.' },
            { step: 'Después del encuentro', desc: 'Recibirás por correo electrónico la información y material.' },
            { step: 'Preparación', desc: 'Te enviaré indicaciones sencillas para prepararte si es necesario.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#FAF5EF] border border-[#E2D5C5] text-center space-y-2">
              <span className="text-xs font-cinzel font-bold text-[#8B5A2B]">0{idx + 1}</span>
              <h4 className="font-serif text-sm font-bold text-[#382D2B]">{item.step}</h4>
              <p className="text-[10px] text-[#7A6B5D] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING MODAL */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B231F]/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#FAF5EF] rounded-2xl shadow-2xl border-2 border-[#D8C5B0] overflow-hidden p-6 space-y-5 my-auto">
            <button
              onClick={() => setSelectedSession(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#5C4D4B] hover:bg-[#EAE0D3]"
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
                    className="w-full py-3 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all"
                  >
                    Confirmar Solicitud de Reserva (${selectedSession.price.toLocaleString('es-AR')} ARS)
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
                  className="w-full py-2.5 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold hover:bg-[#6A4320]"
                >
                  Entendido
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
