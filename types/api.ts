export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  itemCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subcategory {
  _id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  itemCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  isActive: boolean;
  isNew?: boolean;
  description: string;
  authorDescription?: string;
  amazonLink?: string;
  externalLink?: string;
  ingramSparkLink?: string;
  category?: Category | string;
  subcategory?: Subcategory | string;
  isbn?: string;
  digitalFile?: string;
  demoUrl?: string;
  features?: string;
  sales?: number;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductReview {
  _id?: string;
  id?: string | number;
  author?: string;
  user?: { name?: string } | string;
  rating: number;
  date?: string;
  createdAt?: string;
  title?: string;
  comment?: string;
  content?: string;
}

export interface ProductReviewsResponse {
  productId: string;
  title?: string;
  rating?: number;
  numReviews?: number;
  reviews: ProductReview[];
}

export interface CreateReviewPayload {
  title: string;
  name: string;
  rating: number;
  comment: string;
}

export interface ProductQueryParams {
  search?: string;
  category?: string;
  subcategory?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  address?: {
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    phone?: string;
  };
  createdAt?: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  address?: User['address'];
}

export interface ContactPayload {
  name?: string;
  email: string;
  subject?: string;
  phone?: string;
  attachment?: string;
  message: string;
}

export interface CartItem {
  _id?: string;
  product?: Product | string;
  book?: Product | string;
  quantity?: number;
}

export interface Cart {
  _id?: string;
  user?: string;
  items?: CartItem[];
  cartItems?: CartItem[];
}
