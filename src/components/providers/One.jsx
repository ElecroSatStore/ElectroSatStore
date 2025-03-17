'use client'
import { Error, Success } from "../../../svg";
import Footer from "../Footer";
import Nav from "../Nav";
import { createContext, useState } from "react";
import { SessionProvider } from "next-auth/react";
export const alertContext = createContext()
export default function One({children}) {
  const [alert,setAlert] = useState({
    open : false,
    type : false,
    message : ''
  })
  const handleAlert = (value) => {
    setAlert(value)
  }
  return (
    <SessionProvider>
     <Nav/>
     {
      alert.open && 
       <div className="fixed z-10 shadow-xl bottom-10 right-5 sm:right-10 w-[calc(100%-40px)] sm:w-1/2 md:w-3/12 border border-gray-300 rounded-xl px-4 py-3 bg-white">
        <h3 className={`${alert.type ? 'text-black' : 'text-red-500'} text-base font-medium flex items-center gap-2`}>{alert.type ? <Success width={15} height={15} color={'black'}/> : <Error width={15} height={15} color={'#fb2c36'}/>} {alert.type ? 'Success' : 'Error'}</h3>
        <p className={`mb-0 text-sm ${alert.type ? 'text-[#484848]' : 'text-red-500' }`}>{alert.message}</p>
       </div>
     }
     <alertContext.Provider value={{handleAlert}}>
        {children}
     </alertContext.Provider>
    <Footer/>
    </SessionProvider>
  )
}
