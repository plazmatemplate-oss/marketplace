import { Metadata } from "next";
import ProductClientPage from "./ProductClientPage";
import { getProductBySlugApi } from "@/services/productService";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlugApi(slug);
    if (product) {
      const cleanDesc = product.description ? product.description.replace(/<[^>]*>/g, '').slice(0, 160) : `Buy ${product.title} at Plazma Themes`;
      return {
        title: `${product.title} | Plazma Themes`,
        description: cleanDesc,
        alternates: {
          canonical: `/product/${slug}`,
        },
      };
    }
  } catch {
    // Fallback metadata if API call fails
  }

  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} | Plazma Themes`,
    description: `Buy ${title} PrestaShop template at Plazma Themes.`,
    keywords: [title, "PrestaShop theme", "ecommerce template", "buy theme"],
    alternates: {
      canonical: `/product/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductClientPage slug={slug} />;
}
