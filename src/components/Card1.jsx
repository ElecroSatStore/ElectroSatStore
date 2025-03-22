'use client'

import { useRouter } from "next/navigation"
import { useContext } from "react";
import { alertContext } from "./providers/One";

export default function Card1({product}) {
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
    <div className="card h-[400px] rounded-xl">
        <img onClick={()=>router.push('/product/'+product.id_product)} src={product.img} className="w-full h-[80%] rounded-lg object-cover hover:cursor-pointer"/>
        <div className="pt-3">
            <h6 className="text-base mb-0 sm:mb-1 truncate font-semibold transition-colors hover:text-primary capitalize">{product.name}</h6>    
            </div>
            <p 
            className="text-[#484848] text-sm font-normal capitalize sm:max-w-full sm:whitespace-normal sm:overflow-visible whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]"
            title={product.desc_s}
          >
            {product.desc_s}
          </p>

            <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">{product.price} DA</span>
                <button title="Ajouter au panier" onClick={()=>addToCart(product)} className="w-fit hover:cursor-pointer px-2 rounded-md bg-[#111111] text-white font-semibold">+</button>
            </div>
        </div>
  )
}
