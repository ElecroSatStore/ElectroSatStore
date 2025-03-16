'use client'
import Product from './Product'
import { useState } from 'react'
export default function Products({cart,handleCart}) {
  return (
    <section className='w-full md:w-7/12 xl:w-8/12'>
        <h1 className="text-xl sm:text-3xl font-bold w-full mb-2 gap-2">Cart</h1>
        <small className='font-medium text-gray-800 mb-2'>{cart.length}</small>
        {
         cart.length !== 0 ? (
            <div className='h-auto md:h-[500px] md:overflow-y-auto'>
                {
                  cart.map((item , index)=>(
                    <Product key={index} item={item} handleCart = {handleCart} />
                  ))
                }
            </div>
         ) : (
            <div className='h-[500px] flex justify-center items-center'>
                <span className='text-sm text-red-500'>Le panier est vide</span>
            </div>
         )

        }
    </section>
  )
}
