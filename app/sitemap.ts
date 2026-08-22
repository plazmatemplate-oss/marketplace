import { MetadataRoute } from 'next';
import { categories as fallbackCategories } from '@/lib/categories';
import { MOCK_PRODUCTS as fallbackProducts } from '@/lib/data';
import { getCategoriesApi, getSubcategoriesApi } from '@/services/categoryService';
import { getProductsApi } from '@/services/productService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://plazmathemes.com';

  const staticPages = [
    '',
    '/about',
    '/best-sales',
    '/cart',
    '/checkout',
    '/contact',
    '/e-store',
    '/estore',
    '/legal-notice',
    '/login',
    '/megashop',
    '/megashop-themes',
    '/modules',
    '/order-confirmation',
    '/order-history',
    '/password-recovery',
    '/prices-drop',
    '/prices-drops',
    '/privacy-policy',
    '/registration',
    '/secure-payment',
    '/termsandconditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Category & Subcategory Pages
  const categorySlugs = new Set<string>();

  try {
    const [apiCategories, apiSubcategories] = await Promise.all([
      getCategoriesApi(),
      getSubcategoriesApi(),
    ]);

    if (Array.isArray(apiCategories)) {
      apiCategories.forEach((cat) => {
        if (cat.slug) categorySlugs.add(cat.slug);
      });
    }

    if (Array.isArray(apiSubcategories)) {
      apiSubcategories.forEach((sub) => {
        if (sub.slug) categorySlugs.add(sub.slug);
      });
    }
  } catch (err) {
    console.error("Failed to fetch dynamic categories for sitemap:", err);
  }

  // Include fallback categories for offline/build fallback
  fallbackCategories.forEach((cat) => {
    if (cat.slug) categorySlugs.add(cat.slug);
    cat.subCategories?.forEach((sub) => {
      if (sub.slug) categorySlugs.add(sub.slug);
    });
  });

  const categoryPages = Array.from(categorySlugs).map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Dynamic Product Pages
  const productMap = new Map<string, { slug: string; updatedAt?: string }>();

  try {
    const apiProducts = await getProductsApi();
    if (Array.isArray(apiProducts)) {
      apiProducts.forEach((product) => {
        const slugVal = product.slug || product._id;
        if (slugVal) {
          productMap.set(String(slugVal), {
            slug: String(slugVal),
            updatedAt: product.updatedAt,
          });
        }
      });
    }
  } catch (err) {
    console.error("Failed to fetch dynamic products for sitemap:", err);
  }

  // Include fallback products for offline/build fallback
  fallbackProducts.forEach((product) => {
    const slugVal = String(product.id);
    if (!productMap.has(slugVal)) {
      productMap.set(slugVal, { slug: slugVal });
    }
  });

  const productPages = Array.from(productMap.values()).map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
