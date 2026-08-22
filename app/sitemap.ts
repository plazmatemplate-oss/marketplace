import { MetadataRoute } from 'next';
import { categories } from '@/lib/categories';
import { MOCK_PRODUCTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://plazmathemes.com';

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/login',
    '/registration',
    '/password-recovery',
    '/cart',
    '/checkout',
    '/order-confirmation',
    '/order-history',
    '/legal-notice',
    '/privacy-policy',
    '/termsandconditions',
    '/secure-payment',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const categorySlugs = new Set<string>();
  categories.forEach((cat) => {
    categorySlugs.add(cat.slug);
    cat.subCategories?.forEach((sub) => {
      categorySlugs.add(sub.slug);
    });
  });

  const categoryPages = Array.from(categorySlugs).map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const productPages = MOCK_PRODUCTS.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
