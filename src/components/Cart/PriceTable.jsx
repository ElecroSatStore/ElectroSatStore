import React from 'react'

export default function PriceTable() {
  return (
    <div className='w-full md:w-5/12 xl:w-4/12 md:px-5'>
        <div className='w-full py-5 bg-white'>
            <h2 className="rizzui-title-h2 border-b border-gray-300 pb-4 text-lg font-medium">Cart Totals</h2>
            <div className='flex justify-between my-3'>
                <small className='text-[#484848] text-sm font-medium'>Sub total</small>
                <p className='mb-0 font-medium text-sm'>410 DA</p>
            </div>
            <div className='flex justify-between mb-3'>
                <small className='text-[#484848] text-sm font-medium'>Tax</small>
                <p className='mb-0 font-medium text-sm'>410 DA</p>
            </div>
            <div className='flex justify-between pb-5 border-b border-gray-300'>
                <small className='text-[#484848] text-sm font-medium'>Livraison</small>
                <p className='mb-0 font-medium text-sm'>410 DA</p>
            </div>
            
            <div className='flex justify-between py-3'>
                <small className='text-black text-sm font-bold'>Total</small>
                <p className='mb-0 font-medium text-sm'>5000 DA</p>
            </div>
            <button className='bg-blue-500 text-white font-medium w-full rounded-full py-2 px-2 mt-5 hover:cursor-pointer'>Acheter</button>
            <button className='w-full rounded-full py-2 px-2 mt-3 flex justify-center items-center border border-gray-300 hover:border-blue-500 hover:cursor-pointer'><img src="/paypal.webp" width={80} height={80} alt="" /></button>
        </div>
    </div>
  )
}
