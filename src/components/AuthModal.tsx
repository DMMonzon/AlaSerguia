import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { X, ShieldCheck, User as UserIcon, Lock, Mail, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name || (selectedRole === 'admin' ? 'Fernanda (AlaSerguía)' : 'Usuario AlaSerguía'),
      email: email || (selectedRole === 'admin' ? 'fernanda@alaserguia.com' : 'lector@alaserguia.com'),
      role: selectedRole,
      joinedDate: new Date().toISOString().split('T')[0],
      purchasesCount: selectedRole === 'admin' ? 12 : 1,
      newsletterSubscribed: true,
    };

    onLogin(newUser);
    onClose();
  };

  const handleQuickAdminLogin = () => {
    const adminUser: User = {
      id: 'usr-admin',
      name: 'Fernanda (AlaSerguía)',
      email: 'fernanda@alaserguia.com',
      role: 'admin',
      joinedDate: '2024-01-15',
      purchasesCount: 12,
      newsletterSubscribed: true,
    };
    onLogin(adminUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B231F]/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FAF5EF] rounded-2xl shadow-2xl border-2 border-[#D8C5B0] overflow-hidden my-auto p-6 space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#5C4D4B] hover:bg-[#EAE0D3]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#EAE0D3] border border-[#C8B29B] flex items-center justify-center text-[#8B5A2B]">
            {currentUser?.role === 'admin' ? <ShieldCheck className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />}
          </div>
          <h3 className="font-cinzel text-xl font-bold text-[#382D2B]">
            {currentUser ? 'Tu Perfil en AlaSerguía' : isRegister ? 'Crear tu Cuenta' : 'Iniciar Sesión'}
          </h3>
          <p className="text-xs text-[#7A6B5D] font-serif">
            {currentUser ? `Bienvenida/o, ${currentUser.name}` : 'Ingresá para acceder a tus descargas y buzón de cartas'}
          </p>
        </div>

        {currentUser ? (
          <div className="space-y-4 pt-2 border-t border-[#E2D5C5]">
            <div className="p-3 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5] text-xs space-y-1.5">
              <p><strong className="text-[#382D2B]">Nombre:</strong> {currentUser.name}</p>
              <p><strong className="text-[#382D2B]">Correo:</strong> {currentUser.email}</p>
              <p><strong className="text-[#382D2B]">Rol:</strong> {currentUser.role === 'admin' ? 'Administrador' : 'Lector / Cliente'}</p>
              <p><strong className="text-[#382D2B]">Miembro desde:</strong> {currentUser.joinedDate}</p>
            </div>

            <div className="space-y-2">
              {currentUser.role === 'admin' && (
                <div className="p-2.5 rounded-lg bg-[#EAE0D3] border border-[#C8B29B] text-xs text-[#8B5A2B] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Tenés acceso completo al Panel Administrador.
                </div>
              )}

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-[#B35A5A] text-white text-xs font-bold hover:bg-red-800 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Quick Demo Admin Switch Banner */}
            <div className="p-3 rounded-xl bg-[#EAE0D3] border border-[#C8B29B] flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-[#382D2B] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  Acceso Rápido Administrador
                </p>
                <p className="text-[10px] text-[#7A6B5D]">Probar el Dashboard de Gestión</p>
              </div>
              <button
                type="button"
                onClick={handleQuickAdminLogin}
                className="px-3 py-1.5 rounded-lg bg-[#8B5A2B] text-white text-[11px] font-bold hover:bg-[#6A4320]"
              >
                Entrar como Admin
              </button>
            </div>

            {/* Role Switch Selector */}
            <div className="flex rounded-lg border border-[#D8C5B0] bg-[#FAF5EF] p-1 text-xs">
              <button
                type="button"
                onClick={() => setSelectedRole('user')}
                className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                  selectedRole === 'user' ? 'bg-[#8B5A2B] text-white' : 'text-[#7A6B5D]'
                }`}
              >
                Lector / Cliente
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                  selectedRole === 'admin' ? 'bg-[#8B5A2B] text-white' : 'text-[#7A6B5D]'
                }`}
              >
                Administrador
              </button>
            </div>

            {isRegister && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5C4D4B]">Nombre Completo</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-2.5 text-[#A88F76]" />
                  <input
                    type="text"
                    required={isRegister}
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D8C5B0] bg-[#FAF5EF]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#5C4D4B]">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#A88F76]" />
                <input
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D8C5B0] bg-[#FAF5EF]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#5C4D4B]">Contraseña</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-[#A88F76]" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D8C5B0] bg-[#FAF5EF]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all"
            >
              {isRegister ? 'Crear Mi Cuenta' : 'Ingresar'}
            </button>

            <div className="text-center pt-2 border-t border-[#E2D5C5]">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs text-[#8B5A2B] hover:underline font-medium"
              >
                {isRegister
                  ? '¿Ya tenés cuenta? Iniciar Sesión'
                  : '¿No tenés cuenta? Registrate gratis'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
