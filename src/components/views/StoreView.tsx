import React, { useState } from 'react';
import { Product } from '../../types';
import { ShoppingBag, Eye, Download, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

interface StoreViewProps {
  products: Product[];
  onOpenBookModal: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const StoreView: React.FC<StoreViewProps> = ({
  products,
  onOpenBookModal,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'TODOS LOS RECURSOS' },
    { id: 'ebook', label: 'E-BOOKS' },
    { id: 'guia', label: 'MINI GUÍAS' },
    { id: 'oraculo', label: 'ORÁCULOS' },
    { id: 'afirmaciones', label: 'AFIRMACIONES' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-10 animate-fadeIn">

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <p className="text-xs font-cinzel text-[#8B5A2B] uppercase tracking-widest flex items-center justify-center gap-1">
          <span>»»</span> Tienda Holística & Digital <span>««</span>
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#382D2B] font-bold">
          Recursos para el Alma
        </h1>
        <div className="w-16 h-0.5 bg-[#C8B29B] mx-auto" />
        <p className="font-serif text-base sm:text-lg text-[#2B1D11] leading-relaxed italic font-medium drop-shadow-xs">
          Catálogo exclusivo de e-books, mini guías ilustradas, oráculos y juegos de afirmaciones listos para descargar y disfrutar.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-[#E2CEB8] pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all ${selectedCategory === cat.id
                ? 'bg-[#8B5A2B] text-white shadow-xs'
                : 'bg-[#FAF5EF] text-[#5C4D4B] border border-[#D8C5B0] hover:bg-[#EAE0D3]'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between book-shadow group"
          >
            <div>
              <div className="relative h-64 overflow-hidden bg-[#EAE0D3]">
                <img
                  src={prod.coverImage}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {prod.badge && (
                  <span className="absolute top-4 left-4 bg-[#8B5A2B] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                    {prod.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 bg-[#FAF5EF]/90 backdrop-blur-xs text-[#382D2B] text-[10px] font-cinzel font-bold px-2.5 py-1 rounded-md border border-[#D8C5B0]">
                  {prod.pagesCount} Páginas
                </span>
              </div>

              <div className="p-6 space-y-3">
                <p className="text-[10px] font-cinzel uppercase text-[#A88F76] font-bold tracking-widest">
                  {prod.category}
                </p>
                <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
                  {prod.title}
                </h3>
                <p className="text-xs text-[#6A5A4D] leading-relaxed font-serif">
                  {prod.description}
                </p>

                <p className="text-xl font-bold text-[#8B5A2B] font-serif pt-2">
                  ${prod.price.toLocaleString('es-AR')} ARS
                </p>
              </div>
            </div>

            {/* Card Buttons */}
            <div className="p-6 pt-0 space-y-2">
              <button
                onClick={() => onOpenBookModal(prod)}
                className="w-full py-2 px-4 rounded-xl border border-[#C8B29B] bg-[#F4EBE1] text-[#382D2B] text-xs font-bold tracking-wider hover:bg-[#EAE0D3] transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4 text-[#8B5A2B]" />
                VISTA PREVIA DE HOJAS
              </button>

              <button
                onClick={() => onAddToCart(prod)}
                className="w-full py-3 px-4 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                AÑADIR AL CARRITO
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Guarantees Footer Bar */}
      <div className="bg-[#F4EBE1] rounded-2xl border border-[#D8C5B0] p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <Download className="w-5 h-5 text-[#8B5A2B]" />
          <div className="text-left text-xs">
            <p className="font-bold text-[#382D2B]">Descarga Inmediata</p>
            <p className="text-[#7A6B5D]">PDF de alta calidad en tu dispositivo</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Sparkles className="w-5 h-5 text-[#8B5A2B]" />
          <div className="text-left text-xs">
            <p className="font-bold text-[#382D2B]">Acceso De Por Vida</p>
            <p className="text-[#7A6B5D]">Imprimí o leé cuando quieras</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#8B5A2B]" />
          <div className="text-left text-xs">
            <p className="font-bold text-[#382D2B]">Pago Seguro</p>
            <p className="text-[#7A6B5D]">MercadoPago, Tarjeta o Transferencia</p>
          </div>
        </div>
      </div>

    </div>
  );
};
