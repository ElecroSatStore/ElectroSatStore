'use client'
import { Delete } from '../../../svg'
import { useState } from 'react'
export default function Product() {
  const [count,setCount] = useState(0)
  const onIncrement = () => {
    setCount(count + 1)
  }
  const onDecrement = () =>{
    if(count > 0) setCount(count - 1)
  }
  return (
    <div className='w-full flex gap-4 md:gap-3 lg:gap-6 xl:gap-10 border-b border-gray-300 pb-5 mt-5'>
        <div className='rounded-xl md:w-3/12 xl:w-2/12 w-[120px] h-[120px] sm:h-[150px]'>
            <img src="/product/2.webp" alt="" className='w-full h-full rounded-xl object-cover'/>
        </div>
        <div className='w-10/12 flex flex-col justify-between'>
            <div>
                <div className='flex justify-between mb-1'>
                    <h6 className='text-lg mb-0 truncate font-semibold transition-colors hover:text-primary'>Casio</h6>
                    <h6 className='text-base mb-0 truncate font-semibold transition-colors hover:text-primary'>3000 DA</h6>
                </div>
                <p className="text-[#484848] text-sm font-normal w-full mb-1">Casio Classic Watch</p>
                <p className='text-[#484848] text-sm font-normal w-full'>Quantité : <span className='font-medium'>10</span></p>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex rounded-md border border-gray-300 w-fit'>
                    <button onClick={onDecrement} className='w-12 p-1 lg:p-2 text-center border-gray-300 border-r hover:cursor-pointer'>-</button>
                    <span   className='w-12 p-1 lg:p-2 text-center'>{count}</span>
                    <button onClick={onIncrement} className='w-12 p-1 lg:p-2 text-center border-gray-300 border-l hover:cursor-pointer'>+</button>
                </div>
                <button className='border border-black hover:cursor-pointer rounded-full p-2'><Delete width={15} height={15} color={'black'}/></button>
            </div>
        </div>
    </div>
  )
}
