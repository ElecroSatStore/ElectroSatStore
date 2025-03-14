'use client'

import { useRouter } from "next/navigation"

export default function Card1({product}) {
  const router = useRouter()

  return (
    <div onClick={()=>router.push('/product/'+product.id_product)} className="card h-[400px] rounded-xl hover:cursor-pointer">
        <img src={product.img} className="w-full h-[80%] rounded-lg object-cover"/>
        <div className="pt-3">
            <h6 className="text-base mb-0 sm:mb-1 truncate font-semibold transition-colors hover:text-primary capitalize">{product.name}</h6>    
            </div>
            <p className="text-[#484848] text-sm font-normal capitalize">{product.desc_s}</p>
            <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                <button title="Ajouter au panier" className="w-fit px-2 rounded-md bg-[#111111] text-white font-semibold">+</button>
            </div>
        </div>
  )
}
