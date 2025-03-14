'use client'
import { useState, useEffect } from "react";
import BigCard from "./BigCard";
import Card1 from "./Card1";
import SBcard from "./SBcard";

export default function Second() {
  const [loading,setLoading] = useState(true)
  const [products,setProducts] = useState([])
  const GET_PRODUCT = async() => {
      try {
  
        const res = await fetch('/api/new_product/',{
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
    <section className="px-5 sm:px-10 mt-10 !h-auto">
        <h1 className="px-5 sm:px-10 text-xl sm:text-3xl font-bold text-center w-full mb-4 gap-2">Meilleurs produits</h1>
        <div className="second">
            {
              loading ? <div>Loading...</div> : (<>
                   <div>
                    <BigCard product = {products[0]}/>
                   </div>
                <div className="small">
                  {
                    products.map((item,index) => (
                      index !==0 && <SBcard key={index} product={item}/>
                    ))
                  }
                </div>
            </>
              )
            }
        </div>
    </section>
  )
}
