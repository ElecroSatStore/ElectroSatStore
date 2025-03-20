'use client'
import Link from "next/link";
import { Cart, List, Person, Search, TV } from "../../svg";
import { Modal,Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter()
  const [open,setOpen] = useState(false)
  const [value,setValue] = useState('')
  const [products,setProducts] = useState([])
  const onOpen = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const SEARCH = async() => {
    if(value !== ''){
        try {
            const response = await fetch('/api/search/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify({ value })
            })
            const data = await response.json()
            if(data.status !== 200){
                console.log(data.message)
            }else{
                setProducts(data.products)
            }

        } catch (error) {
            console.log(error);
        }
    }else{
        setProducts([])
    }
  }
  const toProduct = (id) => {
    router.push('/product/'+id)
    setOpen(false)
  }
  useEffect(()=>{
    if(value === ''){
        setProducts([])
    }
  },[value])
  return (
    <header style={{backdropFilter : 'blur(10px)'}} className="z-10 w-full py-3 px-5 sm:px-10 flex justify-between items-center bg-[rgba(255,255,255,0.7)] sticky top-0">
        <div className="flex lg:gap-20 gap-10 items-center">
            <Link href={'/'} className="mb-0 hover:cursor-pointer font-medium uppercase flex items-center gap-2 text-xl sm:text-2xl md:text-3xl"><TV size={30} color={'#0aad0a'}/> ipdemp</Link>
        </div>
        <nav className="flex gap-5">
           <Link href={'/'} className="mb-0 font-medium ">Acceuil</Link>
           <Link href={'/payment'} className="mb-0 font-medium ">Payment</Link>
        </nav>
        <div className="flex items-center gap-2 md:gap-5">
            <Link href={'/cart'} className="hover:cursor-pointer"><Cart size={25} color={'black'}/></Link>
            <Link href={'/login'} className="hover:cursor-pointer"><Person size={25} color={'black'}/></Link>
            <button className="hover:cursor-pointer" onClick={onOpen}><Search width={25} height={25} color={'black'}/></button>
        </div>
        <Modal open = {open} onClose={onClose}>
            <Box className = 'absolute bg-white rounded-xl px-6 py-8 -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-2/3 md:w-1/2 lg:w-5/12 xl:w-4/12 border-none outline-none top-1/2 left-1/2'>
                <div className="flex gap-5 border-b border-gray-300 pb-5">
                    <div className="px-3 flex gap-1 items-center border border-gray-300 rounded-md w-8/12 sm:w-9/12">
                        <Search width={15} height={15} color={'gray'}/>
                        <input value={value} onChange={(e)=>setValue(e.target.value)} type="text" name="" id="" placeholder="Rechercher..." className="border-none outline-none py-2.5 px-2"/>
                    </div>
                    {
                        value !== "" ? (
                            <button onClick={SEARCH} className="text-sm font-medium text-white bg-blue-500 rounded-md w-4/12 sm:w-3/12">Rechercher</button>
                        ) : (
                            <div className="text-sm font-medium text-white bg-blue-300 flex justify-center items-center hover:cursor-not-allowed rounded-md w-4/12 sm:w-3/12">Rechercher</div>
                        )
                    }
                </div>
                <div className={`pt-2 overflow-y-auto h-[300px]`}>
                    <span className="bg-gray-300 font-medium px-2 rounded-xl text-sm">{products.length}</span>
                    {
                        products.length === 0 ? (
                            <div className="flex justify-center items-center h-[80%]">
                                <p className="text-red-500 text-sm">Aucun produit disponible</p>
                            </div>
                        ) : (
                           products.map((product) => (
                            <div key={product.id_product} onClick={()=>toProduct(product.id_product)} className="flex py-2 gap-3 hover:cursor-pointer border-b border-gray-300 pb-3">
                                <img src={product.img} alt="search_product" loading="lazy" className="w-3/12 sm:w-2/12 h-[80px] object-cover rounded-md"/>
                                <div className="w-10/12">
                                    <div className="flex justify-between">
                                        <h3 className="mb-0 font-semibold capitalize text-sm">{product.name}</h3>
                                        <h3 className="mb-0 font-medium text-sm hidden sm:block">{product.price}</h3>
                                    </div>
                                    <p className="text-[#484848] text-xs sm:text-sm font-medium capitalize">{product.desc_s}</p>
                                    <h3 className="mb-0 font-medium text-sm block sm:hidden mt-1">{product.price}</h3>
                                    <span className={`text-sm ${product.type === 'phisique' ? 'text-blue-500 bg-blue-200' : 'text-yellow-500 bg-yellow-200'} px-4 py-1 rounded-full mt-2`}>{product.type}</span>
                                </div>
                            </div>
                           ))
                        )
                    }
                </div>
            </Box>
        </Modal>
    </header>
  )
}
