import React from 'react';
import { PageView } from '../types';
import { Feather, Heart, Mail, Instagram, Facebook, Sparkles } from 'lucide-react';
import logoFalsoImg from '../../assets/img/Logo_FALSO.png';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
  onOpenBookModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onOpenBookModal }) => {
  const handleNav = (page: PageView) => {
    if (page === 'portals' && onOpenBookModal) {
      onOpenBookModal();
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 w-full bg-[#FAF5EF] text-[#4A3E3D] border-t border-[#D8C5B0] pt-12 pb-8 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src={logoFalsoImg}
                alt="AlaSerguía Logo"
                className="w-9 h-9 object-contain shrink-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]"
              />
              <span className="font-serif text-xl font-bold tracking-wide text-[#382D2B]">
                AlaSerguía
              </span>
            </div>
            <p className="text-xs text-[#6A5A4D] leading-relaxed">
              Un espacio mágico para reconectar con tu esencia, nutrir tu luz interior y compartir herramientas para el alma.
            </p>
            <div className="pt-2 flex items-center gap-3 text-[#7A6B5D]">
              <a href="#instagram" onClick={(e) => e.preventDefault()} className="p-2 rounded-full bg-[#F4EBE1] hover:bg-[#8B5A2B] hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" onClick={(e) => e.preventDefault()} className="p-2 rounded-full bg-[#F4EBE1] hover:bg-[#8B5A2B] hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#email" onClick={(e) => e.preventDefault()} className="p-2 rounded-full bg-[#F4EBE1] hover:bg-[#8B5A2B] hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#382D2B]">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-[#6A5A4D]">
              <li><button onClick={() => handleNav('home')} className="hover:text-[#8B5A2B] transition-colors">Inicio</button></li>
              <li><button onClick={() => handleNav('about')} className="hover:text-[#8B5A2B] transition-colors">AlaSerguía (¿Quién soy?)</button></li>
              <li><button onClick={() => handleNav('portals')} className="hover:text-[#8B5A2B] transition-colors">Portales de Luz</button></li>
              <li><button onClick={() => handleNav('store')} className="hover:text-[#8B5A2B] transition-colors">Tienda & E-books</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-[#8B5A2B] transition-colors">Acompañamiento & Sesiones</button></li>
              <li><button onClick={() => handleNav('letters')} className="hover:text-[#8B5A2B] transition-colors">Buzón de Cartas ♡</button></li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#382D2B]">
              Información Legal
            </h4>
            <ul className="space-y-2 text-xs text-[#6A5A4D]">
              <li className="hover:text-[#8B5A2B] cursor-pointer">Términos y Condiciones</li>
              <li className="hover:text-[#8B5A2B] cursor-pointer">Política de Privacidad</li>
              <li className="hover:text-[#8B5A2B] cursor-pointer">Preguntas Frecuentes (FAQ)</li>
              <li className="hover:text-[#8B5A2B] cursor-pointer">Envíos Digitales y Descargas</li>
            </ul>
          </div>

          {/* Meaning Badge */}
          <div className="space-y-3 bg-[#F4EBE1] p-4 rounded-xl border border-[#D8C5B0]/80">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#8B5A2B] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Significado de AlaSerguía
            </h4>
            <div className="text-xs text-[#6A5A4D] space-y-1.5 font-serif">
              <p><strong className="text-[#382D2B]">Ala:</strong> La divinidad que nos sostiene.</p>
              <p><strong className="text-[#382D2B]">Ser:</strong> La autenticidad de quienes somos.</p>
              <p><strong className="text-[#382D2B]">Guía:</strong> El acompañamiento amoroso.</p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-[#D8C5B0]/70 text-center text-xs text-[#7A6B5D] flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 AlaSerguía. Todos los derechos reservados. Creado con amor para acompañar tu camino.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Hecho con <Heart className="w-3 h-3 text-[#B35A5A] fill-current" /> para la comunidad
          </p>
        </div>

      </div>
    </footer>
  );
};
