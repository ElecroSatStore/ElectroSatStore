

export default function Card1() {
  return (
    <div className="card h-[400px] rounded-xl">
        <img src="/product/1.webp" className="w-full h-[80%] rounded-lg object-cover"/>
        <div className="pt-3">
            <h6 className="text-base mb-1 truncate font-semibold transition-colors hover:text-primary">Casio Watch</h6>    </div>
            <p className="text-[#484848] text-sm font-normal">Casio Classic Watch</p>
            <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">3000 DA</span>
                <button title="Ajouter au panier" className="w-fit px-2 rounded-md bg-[#111111] text-white font-semibold">+</button>
            </div>
        </div>
  )
}
