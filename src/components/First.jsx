'use client'
import { useState, useEffect } from "react";
import Card1 from "./Card1";
import RotatingText from "./ui/RotatingText";
export default function First() {
  const [loading,setLoading] = useState(true)
  const [products,setProducts] = useState([])
  const GET_PRODUCT = async() => {
    try {

      const res = await fetch('/api/product/',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if(data.status !== 200){
        console.log(data.message)
      }else{
        setProducts(data.products)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    GET_PRODUCT()
  },[])
  return (
    <section className="w-full mt-10">
        <h1 className="px-5 sm:px-10 text-xl sm:text-3xl font-bold text-center w-full mb-4 flex items-center justify-center gap-2">Magasin
        <RotatingText
            texts={['Unique', 'Varié',]}
            mainClassName="px-2 sm:px-2 md:px-3 bg-black text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
            />
            </h1>
            {
              loading ? <div className="h-[50vh] px-5 sm:px-10 flex justify-center items-center w-full">
              <p className="mb-0 text-lg">Loading ...</p>
            </div> : (
              <div className="first w-full px-5 sm:px-10">
                  {
                      products.map((product, index) => (
                        <Card1 key={index} product={product} />
                        ))
                    
                  }
              </div>

            )
            }
    </section>
  )
}
