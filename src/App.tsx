import React, { useState } from 'react';
import { PageView, User, Product, Portal, SessionService, Letter, Article, CartItem, NewsletterSubscriber } from './types';
import { 
  INITIAL_PRODUCTS, 
  PORTALS_DATA, 
  SESSIONS_DATA, 
  INITIAL_LETTERS, 
  INITIAL_ARTICLES, 
  INITIAL_USERS, 
  INITIAL_SUBSCRIBERS 
} from './data/mockData';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookModal } from './components/BookModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';

import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { StoreView } from './components/views/StoreView';
import { ServicesView } from './components/views/ServicesView';
import { LettersView } from './components/views/LettersView';
import { ContactView } from './components/views/ContactView';
import { AdminDashboard } from './components/views/AdminDashboard';
import { PortalDetailView } from './components/views/PortalDetailView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]); // Default to Fernanda (Admin) for instant preview capability
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Book Modal State
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [modalPortal, setModalPortal] = useState<Portal | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [selectedPortalId, setSelectedPortalId] = useState<string>('portal-1');
  const [activePortal, setActivePortal] = useState<Portal>(PORTALS_DATA[0]);

  const handleSelectPortal = (portal: Portal) => {
    setActivePortal(portal);
    setSelectedPortalId(portal.id);
    setCurrentPage('portal-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPortalBookModal = (portalId?: string) => {
    const foundPortal = PORTALS_DATA.find((p) => p.id === portalId) || PORTALS_DATA[0];
    handleOpenBookModal(foundPortal, undefined);
  };

  // Dynamic Data State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [portals] = useState<Portal[]>(PORTALS_DATA);
  const [sessions] = useState<SessionService[]>(SESSIONS_DATA);
  const [letters, setLetters] = useState<Letter[]>(INITIAL_LETTERS);
  const [articles] = useState<Article[]>(INITIAL_ARTICLES);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [subscribers] = useState<NewsletterSubscriber[]>(INITIAL_SUBSCRIBERS);

  // Cart Functions
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Open Book Spread Modal
  const handleOpenBookModal = (portal?: Portal, product?: Product) => {
    setModalPortal(portal || null);
    setModalProduct(product || null);
    setIsBookModalOpen(true);
  };

  // Letter Operations
  const handleAddLetter = (newLetter: Letter) => {
    setLetters((prev) => [newLetter, ...prev]);
  };

  const handleLikeLetter = (letterId: string) => {
    setLetters((prev) =>
      prev.map((l) =>
        l.id === letterId ? { ...l, heartsCount: l.heartsCount + 1 } : l
      )
    );
  };

  // Admin Data Actions
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleDeleteProduct = (prodId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== prodId));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <div className="min-h-screen bg-[#F4EBE1] text-[#4A3E3D] font-serif flex flex-col justify-between selection:bg-[#E2CEB8] selection:text-[#382D2B]">
      
      {/* Navigation Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenPortalBookModal={handleOpenPortalBookModal}
      />

      {/* Main View Router with Smooth Fade Transition */}
      <main key={currentPage} className="flex-1 animate-fadeIn">
        {currentPage === 'home' && (
          <HomeView
            setCurrentPage={setCurrentPage}
            portals={portals}
            products={products}
            articles={articles}
            onOpenBookModal={handleOpenBookModal}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'about' && (
          <AboutView setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'portal-detail' && (
          <PortalDetailView
            portal={activePortal}
            portals={portals}
            products={products}
            setCurrentPage={setCurrentPage}
            onSelectPortal={handleSelectPortal}
            onOpenBookModal={handleOpenBookModal}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'store' && (
          <StoreView
            products={products}
            onOpenBookModal={(product) => handleOpenBookModal(undefined, product)}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'services' && (
          <ServicesView
            sessions={sessions}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'letters' && (
          <LettersView
            letters={letters}
            onAddLetter={handleAddLetter}
            onLikeLetter={handleLikeLetter}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            products={products}
            portals={portals}
            articles={articles}
            users={users}
            subscribers={subscribers}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} onOpenBookModal={() => handleOpenPortalBookModal()} />

      {/* Interactive Flip Book Modal Overlay */}
      <BookModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        portal={modalPortal}
        product={modalProduct}
        onAddToCart={handleAddToCart}
        onSelectPortal={handleSelectPortal}
      />

      {/* Cart Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Auth / Profile Modal Overlay */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={(usr) => setCurrentUser(usr)}
        onLogout={() => setCurrentUser(null)}
      />

    </div>
  );
}
