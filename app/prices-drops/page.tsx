import { Metadata } from "next";
import PricesDropClientPage from "../prices-drop/PricesDropClientPage";

export const metadata: Metadata = {
  title: "Price Drops | Plazma Themes",
  description: "Browse discounted themes and modules at Plazma Themes.",
  keywords: ["price drops", "discounted themes", "sale templates", "plazma themes"],
  alternates: {
    canonical: "/prices-drops",
  },
};

export default function PricesDropsPage() {
  return <PricesDropClientPage />;
}
