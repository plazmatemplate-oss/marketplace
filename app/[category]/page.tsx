import { Metadata } from "next";
import CategoryClientPage from "./CategoryClientPage";

const CATEGORY_NAMES: Record<string, string> = {
  "multipurpose-themes": "Multipurpose Themes",
  "electronic-computers": "Electronics & Computers",
  "fashion-shoes": "Fashion & Shoes",
  "food-restaurant": "Food & Restaurant",
  "kids-Toys": "Kids & Toys",
  "Medical-themes": "Medical Themes",
  "beauty-health": "Beauty & health",
  "leaf-bloom": "Leaf & Bloom",
  "art-culture": "Art & Culture",
  "sports-activities-travel": "Sports, Activities & Travel",
  "drink-tobacco": "Drink & Tobacco",
  "cars-automotive": "Cars & Automotive",
  "holidays-gifts-flowers": "Holidays, Gifts & Flowers",
  "education-books": "Education & Books",
  "jewelry-accessories": "Jewelry & Accessories",
  "animals-pets": "Animals & Pets",
  "modules": "Multipurpose Themes",
  "megashop": "MegaShop Themes",
  "estore": "E-Store Themes",
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const name = CATEGORY_NAMES[category] || category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${name} PrestaShop Themes | Plazma Themes`,
    description: `Browse our collection of premium ${name} PrestaShop templates at Plazma Themes.`,
    keywords: [name.toLowerCase(), "PrestaShop themes", "ecommerce templates", "premium themes", "Plazma Themes"],
    alternates: {
      canonical: `/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: Readonly<{ params: Promise<{ category: string }> }>) {
  const { category } = await params;
  return <CategoryClientPage categorySlug={category} />;
}
