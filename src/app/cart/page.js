import PriceTable from "@/components/Cart/PriceTable";
import Products from "@/components/Cart/Products";

export default function Index() {
  return (
    <main className="mt-10">
        <section className="flex flex-col md:flex-row md:gap-3 lg:gap-6 xl:gap-10 px-5 sm:px-10">
            <Products/>
            <PriceTable/>
        </section>
    </main>
  )
}
