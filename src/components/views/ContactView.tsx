import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MapPin, Clock, MessageSquare, HelpCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-10 animate-fadeIn">

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest flex items-center justify-center gap-1">
          <span>»»</span> Sigamos en contacto <span>««</span>
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#382D2B] font-bold">
          Escríbeme un mensaje
        </h1>
        <div className="w-16 h-0.5 bg-[#C8B29B] mx-auto" />
        <p className="font-serif text-base sm:text-lg text-[#2B1D11] leading-relaxed italic font-medium drop-shadow-xs">
          Si tienes dudas sobre las sesiones, los e-books o deseas consultarnos sobre algo específico, estamos aquí para responderte con amor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left: Contact Info & FAQ */}
        <div className="lg:col-span-5 space-y-6">

          <div className="bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 space-y-4 book-shadow">
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
          <div className="bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 space-y-4 book-shadow">
            <h3 className="font-serif text-xl font-bold text-[#382D2B] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#8B5A2B]" />
              Preguntas Frecuentes
            </h3>

            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-[#E2D5C5] rounded-xl overflow-hidden bg-[#F4EBE1]">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-3 text-left font-serif text-xs font-bold text-[#382D2B] flex items-center justify-between hover:bg-[#EAE0D3]"
                  >
                    <span>{faq.q}</span>
                    <span>{openFaq === idx ? '−' : '+'}</span>
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

        {/* Right: Contact Form (Handwritten Manuscript Aesthetics) */}
        <div className="lg:col-span-7 bg-parchment rounded-3xl border-4 border-[#C8B29B] p-6 sm:p-10 space-y-6 book-shadow relative">

          <div className="border-b border-[#E2D5C5] pb-3">
            <h3 className="font-handwriting text-3xl text-[#382D2B]">
              Formulario de Mensaje
            </h3>
            <p className="text-xs text-[#7A6B5D] font-serif">
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
                className="px-6 py-2 rounded-full bg-[#8B5A2B] text-white text-xs font-bold hover:bg-[#6A4320]"
              >
                Enviar otro mensaje
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
                className="w-full py-3 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>ENVIAR MENSAJE MANUSCRITO</span>
                <Send className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
