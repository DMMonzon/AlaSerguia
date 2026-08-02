import React, { useState } from 'react';
import { PageView, User } from '../types';
import { AudioPlayer } from './AudioPlayer';
import {
  Feather,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Heart,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import logoFalsoImg from '../../assets/img/Logo_FALSO.png';

interface HeaderProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  cartCount: number;
  onOpenCart: () => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenPortalBookModal: (portalId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  onOpenCart,
  currentUser,
  onOpenAuth,
  onOpenPortalBookModal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalsDropdownOpen, setIsPortalsDropdownOpen] = useState(false);

  const navItems: { id: PageView; label: string; hasDropdown?: boolean; badge?: string }[] = [
    { id: 'about', label: 'ALA SERGUÍA' },
    { id: 'portals', label: 'PORTALES', hasDropdown: true },
    { id: 'store', label: 'TIENDA' },
    { id: 'services', label: 'ACOMPAÑAMIENTO' },
    { id: 'letters', label: 'BUZÓN', },
    { id: 'contact', label: 'CONTACTO' },
  ];

  const portalsList = [
    { id: 'portal-1', name: 'Energía y Consciencia' },
    { id: 'portal-2', name: 'Luz Interior' },
    { id: 'portal-3', name: 'Sofía y Kael' },
    { id: 'portal-4', name: 'Sesiones' },
  ];

  const handleNavClick = (page: PageView) => {
    if (page === 'portals') {
      onOpenPortalBookModal();
      setIsMobileMenuOpen(false);
      setIsPortalsDropdownOpen(false);
      return;
    }
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    setIsPortalsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={
        currentPage === 'home' || currentPage === 'about'
          ? "absolute top-0 left-0 right-0 z-40 bg-transparent transition-all"
          : "sticky top-0 z-40 bg-[#FAF5EF]/95 backdrop-blur-md border-b border-[#E8DCCD] transition-all shadow-xs"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">

          {/* Logo Section */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group flex items-center gap-3"
          >
            <img
              src={logoFalsoImg}
              alt="AlaSerguía Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] group-hover:scale-105 transition-transform"
            />

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#382D2B]">
                  AlaSerguía
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-[#3A2A1A] font-medium font-serif">
                Guías para hacer tu camino
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-widest text-[#3A2A1A]">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.id}
                    className="relative group py-1"
                    onMouseEnter={() => setIsPortalsDropdownOpen(true)}
                    onMouseLeave={() => setIsPortalsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick('portals')}
                      className={`flex items-center gap-1 transition-colors cursor-pointer relative py-0.5 ${isActive ? 'text-[#8B5A2B] font-bold' : 'hover:text-[#8B5A2B]'
                        }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform group-hover:rotate-180" />

                      {/* Mystical Active / Hover Link Indicator */}
                      <div
                        className={`absolute -bottom-2.5 left-0 right-0 flex items-center justify-center gap-1 pointer-events-none transition-all duration-300 ${isActive
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-95 group-hover:opacity-60 group-hover:scale-100'
                          }`}
                      >
                        <span className="h-[1px] w-full bg-[#8B5A2B]/60" />
                        <span className="text-[10px] text-[#8B5A2B] font-bold leading-none select-none">♡</span>
                        <span className="h-[1px] w-full bg-[#8B5A2B]/60" />
                      </div>
                    </button>

                    {/* Portals Dropdown Menu Wrapper with continuous hit box */}
                    {isPortalsDropdownOpen && (
                      <div className="absolute top-full left-0 pt-1.5 w-56 z-50">
                        <div className="bg-[#FAF5EF] border border-[#E2D5C5] rounded-xl shadow-xl py-2 overflow-hidden animate-fadeIn">
                          <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#A88F76] border-b border-[#EFE5D9]">
                            Nuestros Portales
                          </div>
                          {portalsList.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                onOpenPortalBookModal(p.id);
                                setIsMobileMenuOpen(false);
                                setIsPortalsDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-2.5 text-xs text-[#3A2A1A] hover:bg-[#F2E8DC] hover:text-[#8B5A2B] transition-colors flex items-center justify-between cursor-pointer"
                            >
                              <span>{p.name}</span>
                              <span className="text-[10px] text-[#A88F76]">→</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={item.id} className="relative group py-1">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`transition-colors relative flex items-center gap-1 cursor-pointer py-0.5 ${isActive ? 'text-[#8B5A2B] font-bold' : 'hover:text-[#8B5A2B]'
                      }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[#B35A5A] font-bold text-xs">{item.badge}</span>
                    )}

                    {/* Mystical Active / Hover Link Indicator */}
                    <div
                      className={`absolute -bottom-2.5 left-0 right-0 flex items-center justify-center gap-1 pointer-events-none transition-all duration-300 ${isActive
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95 group-hover:opacity-60 group-hover:scale-100'
                        }`}
                    >
                      <span className="h-[1px] w-full bg-[#8B5A2B]/60" />
                      <span className="text-[10px] text-[#8B5A2B] font-bold leading-none select-none">♡</span>
                      <span className="h-[1px] w-full bg-[#8B5A2B]/60" />
                    </div>
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ambient Sound Audio Player */}
            <AudioPlayer />

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-[#3A2A1A] hover:text-[#8B5A2B] hover:bg-[#F2E8DC] transition-colors"
              title="Ver Carrito de Compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#B35A5A] text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User / Admin Login Button */}
            <button
              onClick={
                currentUser?.role === 'admin'
                  ? currentPage === 'admin'
                    ? onOpenAuth
                    : () => handleNavClick('admin')
                  : onOpenAuth
              }
              className="relative w-9 h-9 rounded-full border border-[#D8C5B0] text-[#3A2A1A] hover:text-[#8B5A2B] hover:bg-[#F2E8DC] flex items-center justify-center transition-all shadow-xs"
              title={currentUser ? `Usuario: ${currentUser.name}` : 'Ingresar'}
            >
              <UserIcon className="w-5 h-5" />
              {currentUser?.role === 'admin' && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#8B5A2B] border border-white flex items-center justify-center">
                  <ShieldCheck className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#3A2A1A] hover:text-[#8B5A2B]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF5EF] border-b border-[#E8DCCD] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center justify-between ${currentPage === item.id
                  ? 'bg-[#EAE0D3] text-[#8B5A2B] font-semibold'
                  : 'text-[#3A2A1A] hover:bg-[#F2E8DC]'
                  }`}
              >
                <span>{item.label}</span>
                {item.badge && <span className="text-[#B35A5A]">{item.badge}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
