'use client'
import { useRouter } from "next/navigation"

export default function BigCard({product}) {
  const router = useRouter()
  return (
    <div onClick={()=>router.push('/product/'+product.id_product)} className="big hover:cursor-pointer hover:border-blue-500 border border-gray-300 p-4 rounded-xl flex-col flex relative">
        <img src={product.img} className="w-full h-[70%] rounded-lg object-cover"/>
        <div className="pt-3">
            <h1 className="text-2xl mb-0 truncate font-bold transition-colors hover:text-primary capitalize">{product.name}</h1>    
            <p className="text-[#484848] text-base font-normal capitalize">{product.desc_s}</p>
            <span className="text-lg font-semibold text-gray-900">{product.price}</span>
        </div>
        <button style={{width : "calc(100% - 32px)"}} className="text-white font-semibold absolute bottom-4 left-4 bg-black rounded-md py-3 place-items-end">+ Add Cart</button>
        </div>
  )
}
