import React, { useState } from 'react';
import { Letter } from '../../types';
import { Heart, Send, Sparkles, Feather, ShieldCheck, Mail, CheckCircle2, MessageCircle } from 'lucide-react';

interface LettersViewProps {
  letters: Letter[];
  onAddLetter: (letter: Letter) => void;
  onLikeLetter: (letterId: string) => void;
}

export const LettersView: React.FC<LettersViewProps> = ({
  letters,
  onAddLetter,
  onLikeLetter,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'write' | 'mailbox'>('write');

  // Letter Form State
  const [selectedCategory, setSelectedCategory] = useState<string>('Necesito desahogarme');
  const [content, setContent] = useState<string>('');
  const [responseChoice, setResponseChoice] = useState<'respond' | 'no-respond'>('respond');
  const [canShare, setCanShare] = useState<boolean>(true);
  const [authorName, setAuthorName] = useState<string>('');
  const [authorEmail, setAuthorEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const categories = [
    { label: 'Necesito desahogarme', icon: '❤️' },
    { label: 'Quiero agradecer', icon: '🌸' },
    { label: 'Busco una opinión o consejo', icon: '⭐' },
    { label: 'Estoy atravesando un cambio', icon: '🍃' },
    { label: 'Solo quería compartir algo lindo', icon: '🌺' },
    { label: 'Prefiero escribir libremente', icon: '🪶' },
  ];

  const handleSubmitLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newLetter: Letter = {
      id: `let-${Date.now()}`,
      category: selectedCategory,
      content,
      wantsResponse: responseChoice === 'respond',
      canShareAnonymously: canShare,
      authorName: authorName || 'Anónimo',
      authorEmail,
      subject,
      createdAt: 'Hoy',
      heartsCount: 1,
      replies: [],
    };

    onAddLetter(newLetter);
    setSubmitted(true);
  };

  const resetForm = () => {
    setContent('');
    setAuthorName('');
    setAuthorEmail('');
    setSubject('');
    setSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-10 animate-fadeIn">

      {/* HEADER SWITCH TABS */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest flex items-center justify-center gap-1">
          <span>♡</span> BUZÓN DE ALASERGUÍA <span>♡</span>
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#382D2B] font-bold">
          Cartas para AlaSerguía
        </h1>
        <div className="w-16 h-0.5 bg-[#C8B29B] mx-auto" />

        {/* Subtab Toggle: Escribir Carta vs Buzón Comunitario */}
        <div className="inline-flex rounded-full border-2 border-[#D8C5B0] bg-[#FAF5EF] p-1 text-xs">
          <button
            onClick={() => setActiveSubTab('write')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeSubTab === 'write'
              ? 'bg-[#8B5A2B] text-white shadow-xs'
              : 'text-[#5C4D4B] hover:bg-[#EAE0D3]'
              }`}
          >
            ✍️ Escribir tu carta
          </button>
          <button
            onClick={() => setActiveSubTab('mailbox')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeSubTab === 'mailbox'
              ? 'bg-[#8B5A2B] text-white shadow-xs'
              : 'text-[#5C4D4B] hover:bg-[#EAE0D3]'
              }`}
          >
            📬 Buzón Comunitario ({letters.filter((l) => l.canShareAnonymously).length})
          </button>
        </div>
      </div>

      {/* SUBTAB 1: ESCRIBIR TU CARTA */}
      {activeSubTab === 'write' && (
        <div className="space-y-8 animate-fadeIn">

          {submitted ? (
            <div className="max-w-2xl mx-auto bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-8 text-center space-y-4 book-shadow">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#EAE0D3] text-[#8B5A2B] flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-[#4A7C59]" />
              </div>

              <h3 className="font-serif text-3xl font-bold text-[#382D2B]">
                Gracias por confiarme estas palabras. ♡
              </h3>

              <p className="font-serif text-sm text-[#6A5A4D] leading-relaxed italic max-w-md mx-auto">
                Tu carta ya encontró un lugar donde llegar. La leeré con el tiempo y la atención que merece. Gracias por permitir que este espacio sea parte de tu camino.
              </p>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-full bg-[#8B5A2B] text-white text-xs font-bold hover:bg-[#6A4320]"
                >
                  Escribir otra carta
                </button>
                <button
                  onClick={() => setActiveSubTab('mailbox')}
                  className="px-6 py-2.5 rounded-full border border-[#D8C5B0] text-[#382D2B] text-xs font-bold hover:bg-[#EAE0D3]"
                >
                  Ver Buzón Comunitario
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitLetter} className="space-y-8">

              {/* Main Writing Area Spread */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Options Panel */}
                <div className="lg:col-span-4 bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 space-y-4 book-shadow">
                  <h3 className="font-serif text-lg font-bold text-[#382D2B] border-b border-[#EFE5D9] pb-2">
                    ¿Qué te gustaría compartir hoy?
                  </h3>

                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.label}
                        type="button"
                        onClick={() => setSelectedCategory(cat.label)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 ${selectedCategory === cat.label
                          ? 'bg-[#8B5A2B] text-white font-bold shadow-xs'
                          : 'bg-[#F4EBE1] text-[#5C4D4B] hover:bg-[#EAE0D3]'
                          }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5] text-xs text-[#7A6B5D] font-serif italic text-center space-y-1">
                    <p className="font-bold text-[#382D2B] not-italic">Recordatorio amoroso:</p>
                    <p>No hay palabras correctas para escribir una carta. Solo lo que necesitás expresar hoy.</p>
                  </div>
                </div>

                {/* Center Parchment Letter Body */}
                <div className="lg:col-span-8 bg-parchment rounded-3xl border-4 border-[#C8B29B] p-6 sm:p-10 space-y-4 book-shadow relative">

                  <div className="border-b border-[#E2D5C5] pb-3 flex items-center justify-between">
                    <span className="font-handwriting text-2xl text-[#382D2B]">
                      Querida AlaSerguía...
                    </span>
                    <Feather className="w-5 h-5 text-[#8B5A2B]" />
                  </div>

                  <p className="text-xs text-[#7A6B5D] font-serif italic">
                    Contás acá tu historia, lo que sentís, lo que necesitás compartir...
                  </p>

                  <textarea
                    rows={12}
                    required
                    placeholder="Escribí aquí tus pensamientos libremente..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-4 rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]/90 text-sm font-serif text-[#382D2B] leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B] resize-y"
                  />

                  <div className="text-right text-[10px] text-[#A88F76] font-serif">
                    {content.length} caracteres escritos
                  </div>
                </div>

              </div>

              {/* Bottom Preferences Section ("Antes de enviar tu carta...") */}
              <div className="bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 sm:p-8 space-y-6 book-shadow">

                <h3 className="font-serif text-lg font-bold text-[#382D2B] border-b border-[#EFE5D9] pb-2">
                  Antes de enviar tu carta...
                </h3>

                {/* Preference Choices */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">

                  <div
                    onClick={() => setResponseChoice('respond')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${responseChoice === 'respond'
                      ? 'bg-[#EAE0D3] border-[#8B5A2B] font-bold'
                      : 'bg-[#F4EBE1] border-[#E2D5C5]'
                      }`}
                  >
                    <p className="text-[#382D2B] font-bold">Me gustaría recibir una respuesta</p>
                    <p className="text-[11px] text-[#7A6B5D] mt-1">Te responderé por correo cuando pueda.</p>
                  </div>

                  <div
                    onClick={() => setResponseChoice('no-respond')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${responseChoice === 'no-respond'
                      ? 'bg-[#EAE0D3] border-[#8B5A2B] font-bold'
                      : 'bg-[#F4EBE1] border-[#E2D5C5]'
                      }`}
                  >
                    <p className="text-[#382D2B] font-bold">No hace falta responder</p>
                    <p className="text-[11px] text-[#7A6B5D] mt-1">Solo necesito dejar estas palabras.</p>
                  </div>

                  <div
                    onClick={() => setCanShare(!canShare)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${canShare
                      ? 'bg-[#EAE0D3] border-[#8B5A2B] font-bold'
                      : 'bg-[#F4EBE1] border-[#E2D5C5]'
                      }`}
                  >
                    <p className="text-[#382D2B] font-bold flex items-center gap-1">
                      <input type="checkbox" checked={canShare} readOnly className="rounded text-[#8B5A2B]" />
                      Autorizo compartir de forma anónima
                    </p>
                    <p className="text-[11px] text-[#7A6B5D] mt-1">Puede inspirar y acompañar a otras personas.</p>
                  </div>

                </div>

                <div className="p-3 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5] text-[11px] text-[#7A6B5D] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B5A2B] flex-shrink-0" />
                  <span>Tu identidad siempre estará protegida. Tu carta será leída con respeto, amor y confidencialidad.</span>
                </div>

                {/* Optional Contact Inputs */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-[#382D2B] font-serif">
                    Opcional: contanos cómo querés que te contactemos ♡
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Tu nombre (opcional)"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="px-3.5 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]"
                    />

                    <input
                      type="email"
                      placeholder="Tu correo electrónico (opcional)"
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      className="px-3.5 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]"
                    />

                    <input
                      type="text"
                      placeholder="Asunto de tu carta (opcional)"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="px-3.5 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 flex items-center justify-between">
                  <p className="text-xs text-[#7A6B5D] font-serif italic">
                    Gracias por confiarme estas palabras. ♡
                  </p>

                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Confiar esta carta</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </form>
          )}

        </div>
      )}

      {/* SUBTAB 2: BUZÓN COMUNITARIO DE CARTAS */}
      {activeSubTab === 'mailbox' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
              Reflexiones y Cartas Compartidas
            </h3>
            <p className="text-xs text-[#6A5A4D] font-serif">
              Historias anónimas escritas por la comunidad para recordar que no estamos solos en el camino.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {letters
              .filter((l) => l.canShareAnonymously)
              .map((letter) => (
                <div
                  key={letter.id}
                  className="bg-[#FAF5EF] rounded-2xl border-2 border-[#E2D5C5] p-6 space-y-4 shadow-sm hover:shadow-md transition-all book-shadow relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#8B5A2B] font-cinzel border-b border-[#EFE5D9] pb-2">
                      <span className="font-bold">{letter.category}</span>
                      <span>{letter.createdAt}</span>
                    </div>

                    <p className="font-serif text-sm text-[#382D2B] leading-relaxed italic">
                      &ldquo;{letter.content}&rdquo;
                    </p>

                    <p className="text-xs text-[#8B5A2B] font-bold text-right font-handwriting text-lg">
                      — {letter.authorName || 'Lector/a Anónimo'}
                    </p>
                  </div>

                  {/* Likes / Hug replies */}
                  <div className="pt-3 border-t border-[#EFE5D9] flex items-center justify-between text-xs">
                    <button
                      onClick={() => onLikeLetter(letter.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4EBE1] text-[#B35A5A] hover:bg-[#EAE0D3] font-bold transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>{letter.heartsCount} Abrazos de luz</span>
                    </button>

                    <span className="text-[10px] text-[#A88F76] font-serif">
                      Compartida amorosamente
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

    </div>
  );
};
