import React, { useState } from 'react';
import { Product, Portal, Article, User, NewsletterSubscriber } from '../../types';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit, 
  Users, 
  Mail, 
  FileText, 
  CheckCircle, 
  Send, 
  Sparkles,
  Search,
  BookOpen,
  Feather,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  portals: Portal[];
  articles: Article[];
  users: User[];
  subscribers: NewsletterSubscriber[];
  onAddProduct: (prod: Product) => void;
  onDeleteProduct: (prodId: string) => void;
  onDeleteUser: (userId: string) => void;
}

interface UploadedPortalChapter {
  id: string;
  portalName: string;
  chapterTitle: string;
  motto: string;
  shortDesc: string;
  fullText?: string;
  imageUrl: string;
  contents: string[];
  status: 'Publicado' | 'Programado' | 'Borrador';
  scheduledDate?: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  portals,
  articles,
  users,
  subscribers,
  onAddProduct,
  onDeleteProduct,
  onDeleteUser,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'users' | 'newsletter' | 'portal-content'>('content');

  // Form State for Adding Store Content (Tab 1)
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'ebook' | 'guia' | 'oraculo' | 'afirmaciones'>('ebook');
  const [newProdPrice, setNewProdPrice] = useState('6500');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [prodSuccess, setProdSuccess] = useState(false);

  // Form State for Portal Text Content (Tab 4)
  const [portalTarget, setPortalTarget] = useState<string>('Energía y Consciencia');
  const [portalTitle, setPortalTitle] = useState('');
  const [portalMotto, setPortalMotto] = useState('');
  const [portalShortDesc, setPortalShortDesc] = useState('');
  const [portalFullText, setPortalFullText] = useState('');
  const [portalImageUrl, setPortalImageUrl] = useState('');
  const [selectedContents, setSelectedContents] = useState<string[]>(['E-books', 'Mini Guías']);
  const [publishStatus, setPublishStatus] = useState<'immediate' | 'scheduled'>('immediate');
  const [scheduleDate, setScheduleDate] = useState('');
  const [portalSuccess, setPortalSuccess] = useState(false);

  // Mock list of uploaded portal chapters (Tab 4)
  const [uploadedChapters, setUploadedChapters] = useState<UploadedPortalChapter[]>([
    {
      id: 'chap-1',
      portalName: 'Energía y Consciencia',
      chapterTitle: 'Capítulo I: El regreso a vos',
      motto: 'Toda transformación comienza cuando decidimos mirar hacia adentro.',
      shortDesc: 'Un espacio para reconectar con tu energía vital, liberar lo que ya no te pertenece y crear hábitos virtuosos.',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
      contents: ['E-books', 'Mini Guías', 'Videos', 'Artículos', 'Meditaciones'],
      status: 'Publicado'
    },
    {
      id: 'chap-2',
      portalName: 'Luz Interior',
      chapterTitle: 'Capítulo II: Encendiendo la Llama',
      motto: 'No busques la luz afuera cuando vos sos la fuente misma de la claridad.',
      shortDesc: 'Tarjetas diarias de afirmaciones y rituales para potenciar la autoestima y paz mental.',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
      contents: ['E-books', 'Mini Guías', 'Artículos'],
      status: 'Publicado'
    },
    {
      id: 'chap-3',
      portalName: 'Sofía y Kael',
      chapterTitle: 'Capítulo III: El Valle del Dragón Verde',
      motto: 'Los niños nos recuerdan que la magia siempre estuvo en la inocencia.',
      shortDesc: 'Aventuras mágicas para enseñar gestión emocional a niños y familias.',
      imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
      contents: ['E-books', 'Videos', 'Meditaciones'],
      status: 'Programado',
      scheduledDate: '2026-08-15'
    }
  ]);

  // User Search State
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // Newsletter State
  const [newsletterSubject, setNewsletterSubject] = useState('Cartas de Luz #12: El arte de volver a tu centro');
  const [newsletterBody, setNewsletterBody] = useState(
    'Querida comunidad de AlaSerguía:\n\nEsta semana queremos compartir con ustedes una reflexión especial sobre la importancia de regalarse pausas de calma en medio de la prisa cotidiana.\n\nRecuerden que en la tienda ya tienen disponible la nueva guía de Limpieza Energética...'
  );
  const [newsletterSentSuccess, setNewsletterSentSuccess] = useState(false);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdTitle || !newProdDesc) return;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: newProdTitle,
      category: newProdCategory,
      price: parseFloat(newProdPrice) || 5000,
      description: newProdDesc,
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
      pagesCount: 48,
      badge: 'NUEVO RECURSO',
      previewPages: [
        {
          pageNumber: 1,
          title: 'Introducción al Recurso',
          content: newProdDesc
        }
      ],
      downloadUrl: '#download-nuevo-recurso.pdf'
    };

    onAddProduct(newProduct);
    setProdSuccess(true);
    setTimeout(() => setProdSuccess(false), 4000);

    setNewProdTitle('');
    setNewProdDesc('');
  };

  const handleToggleContentCheckbox = (label: string) => {
    setSelectedContents((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleCreatePortalChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portalTitle || !portalMotto || !portalShortDesc) return;

    const newChapter: UploadedPortalChapter = {
      id: `chap-${Date.now()}`,
      portalName: portalTarget,
      chapterTitle: portalTitle,
      motto: portalMotto,
      shortDesc: portalShortDesc,
      fullText: portalFullText,
      imageUrl: portalImageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
      contents: selectedContents.length > 0 ? selectedContents : ['E-books'],
      status: publishStatus === 'immediate' ? 'Publicado' : 'Programado',
      scheduledDate: publishStatus === 'scheduled' ? scheduleDate : undefined,
    };

    setUploadedChapters((prev) => [newChapter, ...prev]);
    setPortalSuccess(true);
    setTimeout(() => setPortalSuccess(false), 5000);

    // Reset Form
    setPortalTitle('');
    setPortalMotto('');
    setPortalShortDesc('');
    setPortalFullText('');
    setPortalImageUrl('');
    setSelectedContents(['E-books', 'Mini Guías']);
    setPublishStatus('immediate');
    setScheduleDate('');
  };

  const handleDeleteChapter = (id: string) => {
    setUploadedChapters((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSendNewsletterBatch = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSentSuccess(true);
    setTimeout(() => setNewsletterSentSuccess(false), 5000);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 book-shadow">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#382D2B]">
              Panel de Administración AlaSerguía
            </h1>
            <p className="text-xs text-[#7A6B5D] font-serif">
              Gestión integral de contenidos, catálogo, usuarios, portales y boletines comunitarios.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#EAE0D3] px-3 py-1.5 rounded-full text-xs text-[#8B5A2B] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Modo Administrador Activo</span>
        </div>
      </div>

      {/* Main Admin Tabs (4 Tabs) */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-2 border-b border-[#E2CEB8] pb-3">
        {/* TAB 1 */}
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'content'
              ? 'bg-[#8B5A2B] text-white shadow-xs'
              : 'bg-[#FAF5EF] text-[#5C4D4B] border border-[#D8C5B0] hover:bg-[#EAE0D3]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          1. Carga de Contenidos para la Tienda ({products.length})
        </button>

        {/* TAB 2 */}
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-[#8B5A2B] text-white shadow-xs'
              : 'bg-[#FAF5EF] text-[#5C4D4B] border border-[#D8C5B0] hover:bg-[#EAE0D3]'
          }`}
        >
          <Users className="w-4 h-4" />
          2. Lista de Usuarios ({users.length})
        </button>

        {/* TAB 3 */}
        <button
          onClick={() => setActiveTab('newsletter')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'newsletter'
              ? 'bg-[#8B5A2B] text-white shadow-xs'
              : 'bg-[#FAF5EF] text-[#5C4D4B] border border-[#D8C5B0] hover:bg-[#EAE0D3]'
          }`}
        >
          <Mail className="w-4 h-4" />
          3. Gestor de Newsletter ({subscribers.length})
        </button>

        {/* TAB 4: NEW PORTAL CONTENT TAB */}
        <button
          onClick={() => setActiveTab('portal-content')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'portal-content'
              ? 'bg-[#8B5A2B] text-white shadow-xs'
              : 'bg-[#FAF5EF] text-[#5C4D4B] border border-[#D8C5B0] hover:bg-[#EAE0D3]'
          }`}
        >
          <Feather className="w-4 h-4 text-[#D4AF37]" />
          4. Cargar Textos para Portales ({uploadedChapters.length})
        </button>
      </div>

      {/* TAB 1: CARGA DE CONTENIDOS PARA LA TIENDA */}
      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
          
          {/* Left Form: Add New Product */}
          <div className="lg:col-span-5 bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 space-y-4 book-shadow">
            <h3 className="font-serif text-xl font-bold text-[#382D2B] border-b border-[#EFE5D9] pb-2 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#8B5A2B]" />
              Publicar Nuevo Recurso / E-book
            </h3>

            {prodSuccess && (
              <div className="p-3 rounded-xl bg-[#E2EEDD] text-xs text-[#3E6333] font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> ¡Recurso publicado con éxito en la tienda!
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5C4D4B]">Título del Recurso *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Guía de Respiración y Calma"
                  value={newProdTitle}
                  onChange={(e) => setNewProdTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#5C4D4B]">Categoría *</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as 'ebook' | 'guia' | 'oraculo' | 'afirmaciones')}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]"
                  >
                    <option value="ebook">E-book</option>
                    <option value="guia">Mini Guía</option>
                    <option value="oraculo">Oráculo</option>
                    <option value="afirmaciones">Set Afirmaciones</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#5C4D4B]">Precio ($ ARS) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5C4D4B]">Descripción *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Resumen del libro o guía..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-sm transition-all cursor-pointer"
              >
                Cargar Recurso al Catálogo
              </button>
            </form>
          </div>

          {/* Right List: Current Published Items */}
          <div className="lg:col-span-7 bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 space-y-4 book-shadow">
            <h3 className="font-serif text-xl font-bold text-[#382D2B] border-b border-[#EFE5D9] pb-2">
              Recursos Publicados ({products.length})
            </h3>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3.5 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={prod.coverImage} alt={prod.title} className="w-12 h-14 object-cover rounded-md border border-[#D8C5B0]" />
                    <div className="min-w-0">
                      <p className="font-bold text-[#382D2B] truncate">{prod.title}</p>
                      <p className="text-[10px] text-[#8B5A2B] uppercase font-bold">{prod.category} • ${prod.price.toLocaleString('es-AR')}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteProduct(prod.id)}
                    className="p-2 text-[#B35A5A] hover:bg-[#FAF5EF] rounded-lg transition-colors cursor-pointer"
                    title="Eliminar recurso"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: LISTA DE USUARIOS REGISTRADOS */}
      {activeTab === 'users' && (
        <div className="bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 sm:p-8 space-y-6 book-shadow animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#EFE5D9] pb-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#382D2B]">
                Base de Datos de Usuarios ({users.length})
              </h3>
              <p className="text-xs text-[#7A6B5D]">Gestión de clientes, roles y estado de suscripciones.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#A88F76]" />
              <input
                type="text"
                placeholder="Buscar por nombre o correo..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#D8C5B0] text-[#8B5A2B] uppercase text-[10px] tracking-wider bg-[#F4EBE1]">
                  <th className="p-3">Usuario / Nombre</th>
                  <th className="p-3">Correo</th>
                  <th className="p-3">Rol</th>
                  <th className="p-3">Fecha Registro</th>
                  <th className="p-3">Compras</th>
                  <th className="p-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D5C5]">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F9F3EA]">
                    <td className="p-3 font-bold text-[#382D2B]">{u.name}</td>
                    <td className="p-3 text-[#6A5A4D]">{u.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'admin' ? 'bg-[#8B5A2B] text-white' : 'bg-[#EAE0D3] text-[#5C4D4B]'
                      }`}>
                        {u.role === 'admin' ? 'Administrador' : 'Lector'}
                      </span>
                    </td>
                    <td className="p-3 text-[#7A6B5D]">{u.joinedDate}</td>
                    <td className="p-3 font-semibold text-[#8B5A2B]">{u.purchasesCount} ítems</td>
                    <td className="p-3 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => onDeleteUser(u.id)}
                          className="text-[#B35A5A] hover:underline text-[11px] cursor-pointer"
                        >
                          Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: GESTOR Y DISPARADOR DE NEWSLETTER */}
      {activeTab === 'newsletter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
          
          {/* Left: Email Composer */}
          <div className="lg:col-span-7 bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 space-y-4 book-shadow">
            <h3 className="font-serif text-xl font-bold text-[#382D2B] border-b border-[#EFE5D9] pb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#8B5A2B]" />
              Redactar y Disparar Boletín Semanal
            </h3>

            {newsletterSentSuccess && (
              <div className="p-3 rounded-xl bg-[#E2EEDD] text-xs text-[#3E6333] font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> ¡Boletín enviado con éxito a {subscribers.length} suscriptores!
              </div>
            )}

            <form onSubmit={handleSendNewsletterBatch} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5C4D4B]">Asunto del Correo *</label>
                <input
                  type="text"
                  required
                  value={newsletterSubject}
                  onChange={(e) => setNewsletterSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5C4D4B]">Cuerpo del Mensaje *</label>
                <textarea
                  rows={8}
                  required
                  value={newsletterBody}
                  onChange={(e) => setNewsletterBody(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF] leading-relaxed font-serif"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Disparar Correo Masivo ({subscribers.length} Suscriptores)
              </button>
            </form>
          </div>

          {/* Right: Template Preview & Subscriber List */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Template Preview */}
            <div className="bg-parchment rounded-3xl border-2 border-[#D8C5B0] p-6 space-y-3 book-shadow">
              <span className="text-[10px] font-cinzel text-[#8B5A2B] uppercase tracking-wider font-bold">
                Vista Previa del Correo (Template)
              </span>

              <div className="p-4 rounded-xl bg-[#FAF5EF] border border-[#E2D5C5] space-y-2 text-xs font-serif">
                <p className="font-bold text-[#382D2B] border-b border-[#EFE5D9] pb-1">
                  {newsletterSubject}
                </p>
                <p className="text-[#5C4D4B] whitespace-pre-line leading-relaxed text-[11px]">
                  {newsletterBody}
                </p>
                <div className="pt-2 border-t border-[#EFE5D9] text-[10px] text-[#8B5A2B] italic text-center">
                  ~ Enviado con amor desde AlaSerguía ~
                </div>
              </div>
            </div>

            {/* Subscriber Count List */}
            <div className="bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 space-y-3 book-shadow">
              <h4 className="font-serif text-base font-bold text-[#382D2B]">
                Lista de Suscriptores Activos ({subscribers.length})
              </h4>

              <div className="space-y-1.5 max-h-36 overflow-y-auto text-xs">
                {subscribers.map((sub) => (
                  <div key={sub.id} className="p-2 rounded-lg bg-[#F4EBE1] flex items-center justify-between text-[11px]">
                    <span className="font-medium text-[#382D2B]">{sub.email}</span>
                    <span className="text-[10px] text-[#4A7C59] font-bold">Activo</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: CARGAR TEXTOS PARA PORTALES */}
      {activeTab === 'portal-content' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
          
          {/* Left Form: Add Portal Text Chapter */}
          <div className="lg:col-span-6 bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 space-y-5 book-shadow">
            <div className="border-b border-[#EFE5D9] pb-3 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#382D2B] flex items-center gap-2">
                <Feather className="w-5 h-5 text-[#8B5A2B]" />
                Cargar Nuevo Texto / Capítulo para Portal
              </h3>
              <span className="text-[10px] font-cinzel uppercase px-2.5 py-1 rounded-full bg-[#EAE0D3] text-[#8B5A2B] font-bold">
                Gestión de Portales
              </span>
            </div>

            {/* Success Alert Banner */}
            {portalSuccess && (
              <div className="p-4 rounded-xl bg-[#E2EEDD] border border-[#C5DDBB] text-xs text-[#2E5224] font-bold flex items-center gap-3 animate-fadeIn shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#4A7C59] shrink-0" />
                <div>
                  <p className="font-bold text-sm">¡Capítulo cargado y programado con éxito para el portal!</p>
                  <p className="text-[11px] font-normal text-[#38592E]">El texto se encuentra listo y disponible en la vista previa de borradores.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleCreatePortalChapter} className="space-y-4">
              
              {/* Dropdown: Target Portal */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5C4D4B] flex items-center gap-1">
                  <span>Seleccionar Portal / Capítulo *</span>
                </label>
                <select
                  value={portalTarget}
                  onChange={(e) => setPortalTarget(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF] font-medium text-[#382D2B] focus:ring-2 focus:ring-[#8B5A2B] outline-none"
                >
                  <option value="Energía y Consciencia">Portal 1: Energía y Consciencia</option>
                  <option value="Luz Interior">Portal 2: Luz Interior</option>
                  <option value="Sofía y Kael">Portal 3: Sofía y Kael</option>
                  <option value="Sesiones">Portal 4: Sesiones</option>
                </select>
              </div>

              {/* Input: Chapter Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5C4D4B]">Título del Capítulo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: El regreso a vos"
                  value={portalTitle}
                  onChange={(e) => setPortalTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF] text-[#382D2B] focus:ring-2 focus:ring-[#8B5A2B] outline-none"
                />
              </div>

              {/* Input: Motto / Quote */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5C4D4B]">Frase / Lema del Capítulo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Toda transformación comienza cuando decidimos mirar hacia adentro."
                  value={portalMotto}
                  onChange={(e) => setPortalMotto(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF] italic text-[#5C4D4B] focus:ring-2 focus:ring-[#8B5A2B] outline-none"
                />
              </div>

              {/* Textarea: Short Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5C4D4B]">Descripción Breve *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Resumen corto del capítulo para encabezados y tarjetas..."
                  value={portalShortDesc}
                  onChange={(e) => setPortalShortDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF] text-[#382D2B] focus:ring-2 focus:ring-[#8B5A2B] outline-none"
                />
              </div>

              {/* Textarea: Full Chapter Text (Simulated WYSIWYG) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#5C4D4B]">Texto Completo del Capítulo *</label>
                  <span className="text-[10px] text-[#8B5A2B] font-medium">Formato Enriquecido</span>
                </div>

                {/* Toolbar Simulation */}
                <div className="flex items-center gap-1.5 p-1.5 bg-[#EAE0D3] rounded-t-xl border border-b-0 border-[#D8C5B0] text-[11px] text-[#5C4D4B]">
                  <button type="button" className="px-2 py-0.5 rounded bg-[#FAF5EF] font-bold hover:bg-white" title="Negrita">B</button>
                  <button type="button" className="px-2 py-0.5 rounded bg-[#FAF5EF] italic hover:bg-white" title="Cursiva">I</button>
                  <button type="button" className="px-2 py-0.5 rounded bg-[#FAF5EF] underline hover:bg-white" title="Subrayado">U</button>
                  <span className="text-[#C5B39D]">|</span>
                  <button type="button" className="px-2 py-0.5 rounded bg-[#FAF5EF] hover:bg-white" title="Cita">&ldquo;Cita&rdquo;</button>
                  <button type="button" className="px-2 py-0.5 rounded bg-[#FAF5EF] hover:bg-white" title="Título">H2</button>
                </div>

                <textarea
                  rows={5}
                  required
                  placeholder="Escribe o pega aquí el desarrollo completo del texto o capítulo..."
                  value={portalFullText}
                  onChange={(e) => setPortalFullText(e.target.value)}
                  className="w-full p-3 text-xs rounded-b-xl border border-[#D8C5B0] bg-[#FAF5EF] text-[#382D2B] font-serif leading-relaxed focus:ring-2 focus:ring-[#8B5A2B] outline-none"
                />
              </div>

              {/* Input: Image URL / File Picker Simulation */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5C4D4B] flex items-center justify-between">
                  <span>URL de la Imagen *</span>
                  <span className="text-[10px] text-[#7A6B5D] font-normal">Soporta URLs o assets locales</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/... o Portal1_Home.jpeg"
                    value={portalImageUrl}
                    onChange={(e) => setPortalImageUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF] text-[#382D2B]"
                  />
                  <button
                    type="button"
                    onClick={() => setPortalImageUrl('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600')}
                    className="px-3 py-2 bg-[#EAE0D3] hover:bg-[#D8C5B0] text-[#5C4D4B] text-[10px] font-bold rounded-xl whitespace-nowrap cursor-pointer"
                  >
                    Usar Demo
                  </button>
                </div>
              </div>

              {/* Checkboxes: Chapter Content Categories */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-[#5C4D4B] block">Contenidos del Capítulo (Seleccionar aplicables):</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-[#F4EBE1] border border-[#E2D5C5]">
                  {['E-books', 'Mini Guías', 'Videos', 'Artículos', 'Meditaciones'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-xs text-[#382D2B] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedContents.includes(cat)}
                        onChange={() => handleToggleContentCheckbox(cat)}
                        className="rounded border-[#D8C5B0] text-[#8B5A2B] focus:ring-[#8B5A2B]"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Radio Buttons & Schedule: Publication Status */}
              <div className="space-y-2 pt-2 border-t border-[#EFE5D9]">
                <label className="text-xs font-bold text-[#5C4D4B] block">Estado de Publicación *</label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs cursor-pointer ${
                    publishStatus === 'immediate'
                      ? 'bg-[#EAE0D3] border-[#8B5A2B] font-bold text-[#382D2B]'
                      : 'bg-[#FAF5EF] border-[#D8C5B0] text-[#5C4D4B]'
                  }`}>
                    <input
                      type="radio"
                      name="publishStatus"
                      value="immediate"
                      checked={publishStatus === 'immediate'}
                      onChange={() => setPublishStatus('immediate')}
                      className="text-[#8B5A2B] focus:ring-[#8B5A2B]"
                    />
                    <span>Publicar Inmediatamente</span>
                  </label>

                  <label className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs cursor-pointer ${
                    publishStatus === 'scheduled'
                      ? 'bg-[#EAE0D3] border-[#8B5A2B] font-bold text-[#382D2B]'
                      : 'bg-[#FAF5EF] border-[#D8C5B0] text-[#5C4D4B]'
                  }`}>
                    <input
                      type="radio"
                      name="publishStatus"
                      value="scheduled"
                      checked={publishStatus === 'scheduled'}
                      onChange={() => setPublishStatus('scheduled')}
                      className="text-[#8B5A2B] focus:ring-[#8B5A2B]"
                    />
                    <span>Guardar / Programar</span>
                  </label>
                </div>

                {/* Date Input if Scheduled */}
                {publishStatus === 'scheduled' && (
                  <div className="pt-2 animate-fadeIn space-y-1">
                    <label className="text-[11px] font-bold text-[#8B5A2B] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Fecha de Publicación Programada *
                    </label>
                    <input
                      type="date"
                      required
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C5B0] bg-[#FAF5EF] text-[#382D2B]"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#8B5A2B] text-white text-xs font-bold tracking-wider hover:bg-[#6A4320] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Feather className="w-4 h-4 text-[#D4AF37]" />
                Guardar y Asignar Capítulo al Portal
              </button>
            </form>
          </div>

          {/* Right List: Uploaded Chapters & Drafts List */}
          <div className="lg:col-span-6 bg-[#FAF5EF] rounded-3xl border-2 border-[#E2D5C5] p-6 space-y-4 book-shadow">
            <div className="flex items-center justify-between border-b border-[#EFE5D9] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#382D2B]">
                Capítulos y Textos Cargados (Borradores)
              </h3>
              <span className="text-xs text-[#8B5A2B] font-bold">
                {uploadedChapters.length} Registros
              </span>
            </div>

            <p className="text-xs text-[#7A6B5D] font-serif">
              Visualiza y gestiona los textos creados para cada uno de los 4 portales principales.
            </p>

            <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
              {uploadedChapters.map((chap) => (
                <div
                  key={chap.id}
                  className="p-4 rounded-2xl bg-[#F4EBE1] border border-[#E2D5C5] space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={chap.imageUrl}
                        alt={chap.chapterTitle}
                        className="w-14 h-14 object-cover rounded-xl border border-[#D8C5B0] shrink-0"
                      />
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#EAE0D3] text-[#8B5A2B] mb-0.5">
                          {chap.portalName}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-[#382D2B] leading-tight">
                          {chap.chapterTitle}
                        </h4>
                        <p className="text-xs text-[#6A5A4D] italic font-serif mt-0.5">
                          &ldquo;{chap.motto}&rdquo;
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteChapter(chap.id)}
                      className="p-1.5 text-[#B35A5A] hover:bg-[#FAF5EF] rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Eliminar capítulo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-[#5C4D4B] leading-relaxed line-clamp-2">
                    {chap.shortDesc}
                  </p>

                  {/* Content Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {chap.contents.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-[#FAF5EF] border border-[#D8C5B0] text-[10px] text-[#7A6B5D]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Status Badge */}
                  <div className="pt-2 border-t border-[#E2D5C5] flex items-center justify-between text-[11px]">
                    <span className="text-[#7A6B5D]">
                      Estado:
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      chap.status === 'Publicado'
                        ? 'bg-[#E2EEDD] text-[#3E6333]'
                        : 'bg-[#FDF3E3] text-[#A86B24]'
                    }`}>
                      {chap.status === 'Programado' && chap.scheduledDate
                        ? `Programado (${chap.scheduledDate})`
                        : chap.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

