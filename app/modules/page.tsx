import { Metadata } from "next";
import CategoryClientPage from "../[category]/CategoryClientPage";

export const metadata: Metadata = {
  title: "Plazma Modules | Plazma Themes",
  description: "Browse our collection of premium Plazma Modules templates at Plazma Themes.",
};

export default function ModulesPage() {
  return <CategoryClientPage categorySlug="custom-modules" pageTitle="Plazma Modules" />;
}
