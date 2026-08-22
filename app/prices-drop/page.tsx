import { Metadata } from "next";
import PricesDropClientPage from "./PricesDropClientPage";

export const metadata: Metadata = {
  title: "Price Drops | Plazma Themes",
  description: "Browse discounted themes and modules at Plazma Themes.",
  keywords: ["price drops", "discounted themes", "sale templates", "plazma themes"],
  alternates: {
    canonical: "/prices-drop",
  },
};

export default function PricesDropPage() {
  return <PricesDropClientPage />;
}
