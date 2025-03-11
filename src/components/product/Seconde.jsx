import { Cart } from "../../../svg";

export default function Seconde() {
  return (
    <section className="w-full md:w-7/12">
        <h2 className="text-3xl mb-2.5 font-bold @6xl:text-4xl">Casio Watch</h2>
        <p className="text-[#484848] font-normal text-base pb-5 border-b border-gray-300">Casio Classic Watch</p>
        <h1 className="mb-0 font-bold text-3xl pt-8">$295.00</h1>
        <div className="font-medium text-[#11843C] text-sm">Toutes taxes comprises</div>
        <div className="flex gap-5 mt-5 pb-8 border-b border-gray-300">
            <button className="hover:cursor-pointer bg-blue-500 px-2 py-2.5 w-1/2 text-white font-semibold rounded-xl">Acheter</button>
            <button className="hover:cursor-pointer text-black font-semibold py-2.5 w-1/2 rounded-xl flex justify-center items-center gap-1 border border-gray-300"><Cart size={25} color={'black'}/> Add Cart</button>
        </div>
        <div className="py-5">
            <h2 className="text-lg mb-2.5 font-semibold text-gray-800">Détails</h2>
            <p className="text-[#484848] text-sm font-medium">Monochrome elegance. Made with a relaxed wide-leg, these trousers are made from a sustainable soft organic cotton with a mechanical stretch making the garment easily recycled. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ex pariatur exercitationem doloribus quasi! Accusamus velit impedit quis laboriosam eius dolorum fuga esse quia blanditiis, dignissimos sit quae magni libero.</p>
            <div className="flex flex-col mt-5">
                <div className="flex gap-1 text-sm"><h6 className="underline">Produit</h6> : <p className="font-medium">Casio Watch</p></div>
                <div className="flex gap-1 text-sm"><h6 className="underline">Quantité</h6> : <p className="font-medium">1</p></div>
                <div className="flex gap-1 text-sm"><h6 className="underline">Type</h6> : <p className="font-medium text-blue-500">Phisique</p></div>
                <div className="flex gap-1 text-sm"><h6 className="underline">Payment</h6> : <p className="font-medium text-blue-500">A livraison</p></div>
            </div>
        </div>
        <div className="py-5 border-t border-gray-300">
            <h2 className="text-lg mb-2.5 font-semibold text-gray-800">Les options de payments</h2>
            <p className="text-[#484848] font-medium text-sm">
                Pour les produits physiques, le paiement se fait <span className="text-[#11843C]">à la livraison</span>. 
                Pour les autres produits non phisiques, comme l’IPTV, veuillez nous contacter via WhatsApp au  
                <a href="tel:0557007322" className="pl-1 text-[#11843C] underline">0557007322</a>.
                </p>
        </div>
        
        

    </section>
  )
}
