'use client'
import PriceTable from "@/components/Cart/PriceTable";
import Products from "@/components/Cart/Products";
import { useState ,useEffect} from "react";

export default function Index() {
  const [cart,setCart] = useState([])
  const [sum,setSum] = useState(0)
  const getCartItems = () => {
    return JSON.parse(sessionStorage.getItem("cart")) || [];
  };
  const handleCart = (item) => {
    setCart(item)
  }
  const onCalc = () => {
    var som = 0
    cart.forEach((item) => {
      som += item.price * item.quantity
    })
    setSum(som)
  }
  useEffect(()=>{
    setCart(getCartItems());
  },[])
  useEffect(()=>{
    onCalc()
  },[cart])
  return (
    <main className="mt-10">
        <section className="flex flex-col md:flex-row md:gap-3 lg:gap-6 xl:gap-10 px-5 sm:px-10">
            <Products cart={cart} handleCart = {handleCart}/>
            <PriceTable sum = {sum} product= {cart} handleCart={handleCart}/>
        </section>
    </main>
  )
}
