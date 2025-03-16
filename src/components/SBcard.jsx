"use client"

import { useRouter } from "next/navigation"
import { useContext } from "react"
import { alertContext } from "./providers/One"
export default function SBcard({product}) {
  const {handleAlert} = useContext(alertContext)
    const router = useRouter()
    const addToCart = (product) => {
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const existingProduct = cart.find(item => item.id_product === product.id_product);
      if (existingProduct) {
        handleAlert({
          open : true,
          type : false,
          message : "Produit déja ajouté dans le panier"
        })
        setTimeout(() => {
          handleAlert({
            open : false,
            type : false,
            message : ""
          })
        }, 4000);
      } else {
          cart.push({ ...product, quantity: 1 }); 
          sessionStorage.setItem("cart", JSON.stringify(cart));
          handleAlert({
            open : true,
            type : true,
            message : "Produit ajouté dans le panier"
          })
          setTimeout(() => {
            handleAlert({
              open : false,
              type : false,
              message : ""
            })
          }, 4000);
      }
  
  };
  return (
    <div  className="sbcard hover:cursor-pointer hover:border-blue-500 rounded-xl p-3 border border-gray-300">
    <img  onClick={()=>router.push('/product/'+product.id_product)} src={product.img} className="w-full h-[69%] rounded-lg object-cover"/>
    <div className="pt-1 h-[30%]">
        <h6 className="text-base mb-0 sm:mb-1 truncate font-semibold transition-colors hover:text-primary capitalize">{product.name}</h6>    
        <p className="text-[#484848] text-xs sm:text-sm font-normal">{product.desc_s}</p>
        <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-900">{product.price} DA</span>
            <button onClick={()=>addToCart(product)} title="Ajouter au panier" className="w-fit hover:cursor-pointer px-2.5 py-0 rounded-md bg-[#111111] text-white font-semibold">+</button>
        </div>
        </div>
    </div>
  )
}
