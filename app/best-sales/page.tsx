import { Metadata } from "next";
import BestSalesClientPage from "./BestSalesClientPage";

export const metadata: Metadata = {
  title: "Best Sales | Plazma Themes",
  description: "Browse our top-selling templates and modules at Plazma Themes.",
  keywords: ["best sales", "top sellers", "best selling templates", "plazma themes"],
  alternates: {
    canonical: "/best-sales",
  },
};

export default function BestSalesPage() {
  return <BestSalesClientPage />;
}
