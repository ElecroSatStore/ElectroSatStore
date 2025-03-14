"use client"

import { useRouter } from "next/navigation"

export default function SBcard({product}) {
  const router = useRouter()
  return (
    <div onClick={()=>router.push('/product/'+product.id_product)} className="sbcard hover:cursor-pointer hover:border-blue-500 rounded-xl p-3 border border-gray-300">
    <img src={product.img} className="w-full h-[69%] rounded-lg object-cover"/>
    <div className="pt-1 h-[30%]">
        <h6 className="text-base mb-0 sm:mb-1 truncate font-semibold transition-colors hover:text-primary capitalize">{product.name}</h6>    
        <p className="text-[#484848] text-xs sm:text-sm font-normal">{product.desc_s}</p>
        <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-900">{product.price}</span>
            <button title="Ajouter au panier" className="w-fit px-2.5 py-0 rounded-md bg-[#111111] text-white font-semibold">+</button>
        </div>
        </div>
    </div>
  )
}
