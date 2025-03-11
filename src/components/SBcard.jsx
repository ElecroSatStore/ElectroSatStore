
export default function SBcard() {
  return (
    <div className="rounded-xl p-3 border border-gray-300">
    <img src="/product/1.webp" className="w-full h-[69%] rounded-lg object-cover"/>
    <div className="pt-1 h-[30%]">
        <h6 className="text-base mb-0 truncate font-semibold transition-colors hover:text-primary">Casio Watch</h6>    
        <p className="text-[#484848] text-sm font-normal">Casio Classic Watch</p>
        <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-900">3000 DA</span>
            <button title="Ajouter au panier" className="w-fit px-2.5 py-0 rounded-md bg-[#111111] text-white font-semibold">+</button>
        </div>
        </div>
    </div>
  )
}
