import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, Download, CheckCircle, Sparkles, CreditCard, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [formData, setFormData] = useState({ name: '', email: '', paymentMethod: 'mercadopago' });

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleStartCheckout = () => {
    if (cartItems.length > 0) {
      setCheckoutStep('form');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setCheckoutStep('success');
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#2B231F]/60 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF5EF] border-l border-[#D8C5B0] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#ECE0D1] border-b border-[#D8C5B0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-[#382D2B]">Tu Carrito</h3>
                <p className="text-[10px] text-[#7A6B5D] uppercase tracking-wider">
                  {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#5C4D4B] hover:bg-[#FAF5EF] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            
            {/* STEP 1: CART ITEMS */}
            {checkoutStep === 'cart' && (
              <>
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#EAE0D3] text-[#A88F76] flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="font-serif text-lg text-[#382D2B] font-medium">Tu carrito está vacío</p>
                    <p className="text-xs text-[#7A6B5D] max-w-xs mx-auto">
                      Explora nuestra tienda de e-books, guías y oráculos para inspirar tu camino.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-3 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5] flex gap-3 items-center"
                      >
                        <img
                          src={item.product.coverImage}
                          alt={item.product.title}
                          className="w-16 h-20 object-cover rounded-md border border-[#D8C5B0]"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-bold text-[#382D2B] truncate">
                            {item.product.title}
                          </h4>
                          <p className="text-xs text-[#8B5A2B] font-semibold mt-0.5">
                            ${item.product.price.toLocaleString('es-AR')}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-[#D8C5B0] rounded-md bg-[#FAF5EF] text-xs">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                className="px-2 py-0.5 hover:bg-[#EAE0D3]"
                              >
                                -
                              </button>
                              <span className="px-2 font-medium">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                className="px-2 py-0.5 hover:bg-[#EAE0D3]"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-[#B35A5A] hover:text-red-700 p-1"
                              title="Eliminar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CHECKOUT FORM */}
            {checkoutStep === 'form' && (
              <form onSubmit={handleCompleteOrder} className="space-y-4 animate-fadeIn">
                <div className="p-3 rounded-xl bg-[#EAE0D3] text-xs text-[#5C4D4B]">
                  <p className="font-bold flex items-center gap-1 text-[#382D2B]">
                    <Sparkles className="w-3.5 h-3.5 text-[#8B5A2B]" />
                    Descarga Digital Inmediata
                  </p>
                  <p className="mt-1">
                    Al completar la compra, tus e-books estarán listos para descargar inmediatamente en esta pantalla.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5C4D4B]">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Sofia Martinez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8C5B0] bg-[#FAF5EF] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5C4D4B]">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sofia@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8C5B0] bg-[#FAF5EF] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5C4D4B]">
                    Método de Pago
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8C5B0] bg-[#FAF5EF] focus:outline-hidden focus:ring-2 focus:ring-[#8B5A2B]"
                  >
                    <option value="mercadopago">MercadoPago / Dinero en Cuenta</option>
                    <option value="tarjeta">Tarjeta de Crédito / Débito</option>
                    <option value="transferencia">Transferencia Bancaria (10% OFF)</option>
                  </select>
                </div>

                <div className="pt-2 border-t border-[#E2D5C5]">
                  <p className="text-xs text-[#7A6B5D] flex items-center justify-between">
                    <span>Monto Total a Pagar:</span>
                    <strong className="text-sm text-[#8B5A2B]">
                      ${totalAmount.toLocaleString('es-AR')}
                    </strong>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Confirmar y Finalizar Compra
                </button>

                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full text-center text-xs text-[#7A6B5D] hover:underline"
                >
                  ← Volver al carrito
                </button>
              </form>
            )}

            {/* STEP 3: SUCCESS & DOWNLOAD */}
            {checkoutStep === 'success' && (
              <div className="text-center py-6 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#EAE0D3] text-[#8B5A2B] flex items-center justify-center shadow-inner">
                  <CheckCircle className="w-10 h-10 text-[#4A7C59]" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
                    ¡Gracias por tu compra, {formData.name.split(' ')[0]}!
                  </h3>
                  <p className="text-xs text-[#7A6B5D] mt-1">
                    Enviamos una copia con la confirmación a <strong>{formData.email}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F4EBE1] border border-[#D8C5B0] text-left space-y-3">
                  <p className="text-xs font-bold text-[#382D2B] flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-[#8B5A2B]" />
                    Tus Descargas Digitales:
                  </p>
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-2.5 rounded-lg bg-[#FAF5EF] border border-[#E2D5C5] flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-[#382D2B] truncate max-w-[180px]">
                        {item.product.title}
                      </span>
                      <a
                        href={item.product.downloadUrl || '#'}
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`¡Descarga iniciada para ${item.product.title}! Disfruta tu lectura.`);
                        }}
                        className="px-3 py-1 rounded-md bg-[#8B5A2B] text-white font-bold text-[10px] hover:bg-[#6A4320]"
                      >
                        Descargar PDF
                      </a>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-2.5 rounded-xl bg-[#4A3E3D] text-white text-xs font-bold tracking-wider hover:bg-[#382D2B]"
                >
                  Cerrar y Volver al Inicio
                </button>
              </div>
            )}

          </div>

          {/* Footer Subtotal Bar */}
          {checkoutStep === 'cart' && cartItems.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#ECE0D1] border-t border-[#D8C5B0] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6A5A4D]">Subtotal:</span>
                <span className="font-bold text-[#382D2B]">
                  ${totalAmount.toLocaleString('es-AR')}
                </span>
              </div>
              <button
                onClick={handleStartCheckout}
                className="w-full py-3 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center gap-2"
              >
                Iniciar Pago / Descarga
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
