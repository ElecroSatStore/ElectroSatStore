'use client'

import { Cart, WhatsApp } from "../../../svg";
import { useContext,useState,useEffect } from "react";
import { alertContext } from "../providers/One";
import { Modal,Box } from "@mui/material";
import wilaya from '../../../public/json/wilaya.json'
import city from '../../../public/json/city.json'
import Link from "next/link";

export default function PriceTable({sum,product,handleCart}) {
  const {handleAlert} = useContext(alertContext)
  const [loading,setLoading] = useState(false)
    const [idWilaya,setIdWilaya] = useState(null)
    const [open,setOpen] = useState(false)
    const [filteredCities,setFilteredCities] = useState([])
    const [values,setValues] = useState({
      name: '',
      number : '',
      wilaya : '',
      city : '',
    })
    const [quantity,setQuantity] = useState(1)
    const getCartItems = () => {
        return JSON.parse(sessionStorage.getItem("cart")) || [];
    };
    const onAdd = (e) => {
      e.preventDefault()
      if(quantity < product.qte){
        setQuantity(quantity + 1)
      }
    }
    const onSub = (e) => {
      e.preventDefault()
      if(quantity > 1){
        setQuantity(quantity - 1)
      }
    }
    const onSubmit = async(e) => {
      e.preventDefault()
      try {
        setLoading(true)
        const res = await fetch('/api/add_cmd_cart/',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
              products : product,
              name :  values.name,
              number : values.number,
              wilaya : values.wilaya,
              city : values.city,
            })
        })
  
        const data = await res.json()
        if(data.status !== 200){
          handleAlert({
            open : true,
            type : false,
            message : "Internal Serever Error 500"
          })
          setTimeout(() => {
            handleAlert({
              open : false,
              type : false,
              message : ""
            })
          }, 4000);
        }else{
          let carts = getCartItems()
          carts = []
          sessionStorage.setItem('cart',JSON.stringify(carts))
          handleCart(carts)
          setOpen(false)
          setValues(prev => ({
            ...prev,
            name : "",
            number : "",
            wilaya : "",
            city : "",
          }))
          handleAlert({
            open : true,
            type : true,
            message : "Commande ajoutée avec succès"
        })
        
        setTimeout(() => {
          handleAlert({
            open : false,
            type : false,
            message : ""
          })
        }, 4000);
      }
  
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    const handleValues = (e) => {
      const { name, value } = e.target;
  
      if (name === 'number') {
        if (!isNaN(Number(value))) {
          setValues({ ...values, [name]: value });
        }
      } else if (name === 'wilaya') {
        const selectedWilaya = wilaya.find(w => w.name === value);
        setIdWilaya(selectedWilaya ? selectedWilaya.id : null);
        
        setValues({ ...values, wilaya: value, city: '' }); // Reset ville
      } else {
        setValues(prev => ({ ...prev, [name]: value }));
      }
    };
    const onClose = () => {
      setOpen(false)
    }
  
    useEffect(() => {
      if (idWilaya !== null) {
        const villes = city[idWilaya]
        console.log(villes);
        setFilteredCities(villes);
      } else {
        setFilteredCities([]);
      }
    }, [idWilaya]);
  return (
    <div className='w-full md:w-5/12 xl:w-4/12 md:px-5'>
        <div className='w-full py-5 bg-white'>
            <h2 className="rizzui-title-h2 border-b border-gray-300 pb-4 text-lg font-medium">Cart Totals</h2>
            <div className='flex justify-between my-3'>
                <small className='text-[#484848] text-sm font-medium'>Sub total</small>
                <p className='mb-0 font-medium text-sm'>{sum} DA</p>
            </div>
           
            <div className='flex justify-between pb-5 border-b border-gray-300'>
                <small className='text-[#484848] text-sm font-medium'>Livraison</small>
                <p className='mb-0 font-medium text-sm'>{product.length === 0 ? 0 : 100} DA</p>
            </div>
            
            <div className='flex justify-between py-3'>
                <small className='text-black text-sm font-bold'>Total</small>
                <p className='mb-0 font-medium text-sm'>{sum + product.length === 0 ? 0 : 100} DA</p>
            </div>
            {
                product.length === 0 ? (
                    <button className='bg-blue-300 text-white font-medium w-full rounded-full py-2 px-2 mt-5 hover:cursor-not-allowed'>Acheter</button>

                ) : (
                    <button className='bg-blue-500 text-white font-medium w-full rounded-full py-2 px-2 mt-5 hover:cursor-pointer' onClick={()=>setOpen(true)}>Acheter</button>
                )
            }
            <button className='w-full rounded-full py-2 px-2 mt-3 flex justify-center items-center border border-gray-300 hover:border-blue-500 hover:cursor-pointer'><img src="/paypal.webp" width={80} height={80} alt="" /></button>
        </div>
        <Modal open = {open} onClose={onClose}>
            <Box  className = 'absolute bg-white rounded-xl px-6 py-6 -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-2/3 md:w-1/2 lg:w-7/12 xl:w-6/12 border-none outline-none top-1/2 left-1/2 overflow-y-auto h-[400px]'>
                <h1 className="text-2xl font-bold mb-3">Ajouter une commande</h1>
                <form className=" flex flex-col" onSubmit={onSubmit}>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                        <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                            <label htmlFor="name" className="text-sm text-[#484848] font-medium">Nom & Prénom*</label>
                            <input value={values.name} onChange={handleValues} type="text" name="name" id="name" placeholder="Nom & Prénom" className="py-2 w-full border mt-2 border-gray-300 px-2 rounded-md"/>
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                            <label htmlFor="number" className="text-sm text-[#484848] font-medium">Numéro*</label>
                            <input value={values.number} onChange={handleValues} type="text" name="number" id="number" placeholder="Numéro" className="py-2 w-full border mt-2 border-gray-300 px-2 rounded-md"/>
                        </div>

                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-3">
                        <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                            <label htmlFor="wilaya" className="text-sm text-[#484848] font-medium">Wilaya*</label>
                            <select value={values.wilaya} onChange={handleValues} id="wilaya" name="wilaya" className="w-full py-2 border mt-2 border-gray-300 px-2 rounded-md appearance-none">
                                <option>Wilaya</option>
                                {
                                    wilaya.map(item => (
                                        <option key={item.id} value={item.name}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                            <label htmlFor="ville" className="text-sm text-[#484848] font-medium">Ville*</label>
                            <select value={values.city} onChange={handleValues} id = 'ville' name="city" className="py-2 border mt-2 border-gray-300 px-2 rounded-md appearance-none w-full">
                                <option>Ville</option>
                                {
                                    filteredCities.map((item,index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 sm:gap-5 mt-3">
                        { values.city === '' || 
                          values.wilaya === '' || 
                          values.name === '' || 
                          values.number === '' ? <div className="py-2.5 w-2/3 bg-blue-300 text-white font-bold rounded-md hover:cursor-not-allowed flex justify-center items-center" title="Remplir vos information">Commander</div>:(
                          loading ? <div className="py-2.5 w-2/3 bg-blue-500 text-white font-bold rounded-md hover:cursor-wait flex justify-center items-center" title="Remplir vos information">Loading...</div> : <button type="submit" className="py-2.5 w-2/3 bg-blue-500 text-white font-bold rounded-md hover:cursor-pointer">Commander</button>)
                          }
                        <div className="flex w-1/3">
                          <button onClick={onSub} className="w-1/3 bg-gray-300 py-2 px-2 rounded-md hover:cursor-pointer ">-</button>
                          <span className="w-1/3 flex items-center justify-center" >{quantity}</span>
                          <button onClick={onAdd} className="w-1/3 bg-gray-300 py-2 px-2 rounded-md hover:cursor-pointer">+</button>
                        </div>
                    </div>
                </form>
                <div>
                  <h1 className="mb-0 text-xl font-bold mt-3">Resumé de commande</h1>
                   {
                    product.map((item,index) => (
                        <div key={index}>
                            <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                <p className="mb-0 text-base text-[#484848] font-medium">{item.name}</p>
                                <p className="mb-0 text-base text-[#484848] font-medium flex gap-1 items-center">Prix : {item.price * item.quantity} <span className="text-white bg-blue-500 rounded-md px-1 text-sm">x{item.quantity}</span></p>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                <p className="mb-0 text-base text-[#484848] font-medium">Type de payment</p>
                                <p className="mb-0 text-base text-[#484848] font-medium capitalize">{product.type === 'phisique' ? 'à livraison' : 'WhatsApp'}</p>
                            </div>
                        </div>
                    ))
                   }
                   <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                <p className="mb-0 text-base text-[#484848] font-semibold">Total</p>
                                <p className="mb-0 text-base text-[#484848] font-medium capitalize">{sum + 100}</p>
                    </div>
                   
                   <Link href={'https://wa.me/213557007322'} className="text-white mt-3 hover:cursor-pointer font-bold rounded-md bg-[#25D366] py-2.5 w-full flex justify-center items-center gap-2"><WhatsApp color={'white'} size={25}/> WhatsApp</Link>
                </div>
            </Box>
        </Modal>
    </div>
  )
}
