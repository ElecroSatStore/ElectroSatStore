'use client'
import Product from './Product'
import { useState } from 'react'
export default function Products() {
  const [isEmpty,setIsEmpty] = useState(false)
  return (
    <section className='w-full md:w-7/12 xl:w-8/12'>
        <h1 className="text-xl sm:text-3xl font-bold w-full mb-2 gap-2">Cart</h1>
        <small className='font-medium text-gray-800 mb-2'>4</small>
        {
         !isEmpty ? (
            <div className='h-auto md:max-h-[500px] md:overflow-y-auto'>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
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
