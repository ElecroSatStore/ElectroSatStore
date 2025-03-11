
export default function BigCard() {
  return (
    <div className="big border border-gray-300 p-4 rounded-xl flex-col flex">
        <img src="/product/2.webp" className="w-full h-[70%] rounded-lg object-cover"/>
        <div className="pt-3">
            <h1 className="text-2xl mb-0 truncate font-bold transition-colors hover:text-primary">Casio Watch</h1>    
            <p className="text-[#484848] text-base font-normal">Casio Classic Watch</p>
            <span className="text-lg font-semibold text-gray-900">3000 DA</span>
        </div>
        <button className="text-white font-semibold bg-black rounded-md w-full py-3 place-items-end">+ Add Cart</button>
        </div>
  )
}
