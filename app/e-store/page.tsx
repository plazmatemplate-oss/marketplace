import { Metadata } from "next";
import CategoryClientPage from "../[category]/CategoryClientPage";

export const metadata: Metadata = {
  title: "E-Store Themes | Plazma Themes",
  description: "Browse our collection of premium E-Store PrestaShop templates at Plazma Themes.",
};

export default function EStoreDashPage() {
  return <CategoryClientPage pageTitle="E-Store Themes" fetchWithoutCategory={true} />;
}
