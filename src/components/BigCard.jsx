'use client'
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { alertContext } from "./providers/One"
export default function BigCard({product}) {
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
    <div  className="big hover:cursor-pointer hover:border-blue-500 border border-gray-300 p-4 rounded-xl flex-col flex relative">
        <img onClick={()=>router.push('/product/'+product.id_product)} src={product.img} className="w-full h-[70%] rounded-lg object-cover"/>
        <div className="pt-3">
            <h1 className="text-2xl mb-0 truncate font-bold transition-colors hover:text-primary capitalize">{product.name}</h1>    
            <p className="text-[#484848] text-base font-normal capitalize">{product.desc_s}</p>
            <span className="text-lg font-semibold text-gray-900">{product.price} DA</span>
        </div>
        <button onClick={()=>addToCart(product)} style={{width : "calc(100% - 32px)"}} className="text-white font-semibold absolute bottom-4 left-4 bg-black rounded-md py-3 place-items-end">+ Add Cart</button>
        </div>
  )
}
