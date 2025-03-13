'use client'
import { useState } from "react";
import { Dashboard, Logout, TV } from "../../../svg";


export default function Left({list,handleList}) {
  
  return (
    <div className={"hidden xl:block w-2/12 pt-10 border-r border-gray-300 pr-5"}>
        
        <span className="font-medium block pt-5 font-lexend text-xs uppercase text-gray-400 dark:text-gray-600">Menu</span>        
        <ul className="flex flex-col gap-3 mt-3">
              {
                list.map((item)=>(
                  <li onClick={()=>handleList(item.id)} key={item.id} className={`border ${item.open ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} font-medium hover:cursor-pointer border-gray-200 py-2.5 rounded-xl px-2 text-sm flex items-center gap-2`}>{item.open ? <Dashboard size={'1em'} color={'white'}/> : <Dashboard size={'1em'} color={'gray'}/>} {item.name}</li>
                ))
              }
                <li className="border font-medium hover:cursor-pointer hover:bg-gray-200 border-gray-200 py-2.5 rounded-xl px-2 text-red-500 flex items-center gap-2 text-sm"><Logout width={15} height={15} color={"#fb2c36"}/> Deconnecter</li>       

        </ul>
    </div>
  )
}
