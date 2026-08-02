export type PageView = 
  | 'home'
  | 'about'
  | 'portals'
  | 'portal-detail'
  | 'store'
  | 'services'
  | 'letters'
  | 'contact'
  | 'admin';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedDate: string;
  purchasesCount: number;
  newsletterSubscribed: boolean;
}

export interface Product {
  id: string;
  title: string;
  category: 'ebook' | 'guia' | 'oraculo' | 'afirmaciones';
  price: number;
  description: string;
  coverImage: string;
  pagesCount: number;
  badge?: string;
  previewPages: {
    pageNumber: number;
    title: string;
    content: string;
    illustration?: string;
  }[];
  downloadUrl?: string;
}

export interface Portal {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  illustration: string;
  chapterTitle: string;
  chapterMotto: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  contentItems: {
    id: string;
    title: string;
    type: 'ebook' | 'guide' | 'video' | 'article' | 'audio';
    durationOrPages: string;
  }[];
}

export interface SessionService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  duration: string;
  modality: string;
  icon: string;
  illustration: string;
  benefits: string[];
}

export interface Letter {
  id: string;
  category: string;
  content: string;
  wantsResponse: boolean;
  canShareAnonymously: boolean;
  authorName?: string;
  authorEmail?: string;
  subject?: string;
  createdAt: string;
  heartsCount: number;
  replies?: string[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  dateJoined: string;
  status: 'activo' | 'inactivo';
}
