import { Metadata } from "next";
import CategoryClientPage from "../[category]/CategoryClientPage";

export const metadata: Metadata = {
  title: "MegaShop Themes | Plazma Themes",
  description: "Browse our collection of premium MegaShop PrestaShop templates at Plazma Themes.",
};

export default function MegaShopThemesPage() {
  return <CategoryClientPage pageTitle="MegaShop Themes" fetchWithoutCategory={true} />;
}
