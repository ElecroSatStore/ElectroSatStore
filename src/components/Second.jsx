import BigCard from "./BigCard";
import Card1 from "./Card1";
import SBcard from "./SBcard";

export default function Second() {
  return (
    <section className="px-5 sm:px-10 mt-10 !h-auto">
        <h1 className="px-5 sm:px-10 text-xl sm:text-3xl font-bold text-center w-full mb-4 gap-2">Meilleurs produits</h1>
        <div className="second">
            <BigCard/>
            <div className="small">
                <SBcard/>
                <SBcard/>
                <SBcard/>
                <SBcard/>
                <SBcard/>
                <SBcard/>
            </div>
        </div>
    </section>
  )
}
