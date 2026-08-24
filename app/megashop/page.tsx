import { Metadata } from "next";
import CategoryClientPage from "../[category]/CategoryClientPage";

export const metadata: Metadata = {
  title: "MegaShop Themes | Plazma Themes",
  description: "Browse our collection of premium MegaShop PrestaShop templates at Plazma Themes.",
};

export default function MegaShopPage() {
  return <CategoryClientPage pageTitle="MegaShop Themes" categorySlug="megashop-themes" />;
}
