'use client'
import { Rating } from '@mui/material'
import {useState,useEffect, useContext, use}from 'react'
import { Cart, Delete,NoProduct,Errors,Success, Search } from '../../../svg'

export default function Table() {
  const [loading,setLoading] = useState(true)
  const [loadingAction,setLoadingActions] = useState({
    delete: false,
    edit: false
  })
  const [search,setSearch] = useState('')
  const [commandes,setCommandes] = useState([])
  const [filtredCommandes,setFiltredCommandes] = useState([])
  const GET_CMD = async()=>{
    try {
        setLoading(true)
        const res = await fetch('/api/command/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
  
        const data = await res.json()
        console.log(data)
        if (data.status !== 200) {
          console.error("Error:", data.message)
        } else {
          setCommandes(data.products)
        }
      } catch (error) {
        console.error("Fetch error:", error)
      } finally {
        setLoading(false)
      }
  }
  const ACTION = async (id_cmd, id_product, type ,qte) => {
    try {
        setLoadingActions(prev => ({ ...prev, [type ? "edit" : "delete"]: true }));

        const res = await fetch('/api/actioncmd/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_cmd, id_product, type , qte}),
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            throw new Error(data.message || "An error occurred");
        }

        setCommandes(prev => type 
            ? prev.map(item => 
                item.id_cmd === id_cmd && item.id_product === id_product 
                ? { ...item, status: 'confirmé' ,product_qte: (item.product_qte ?? 0) - (item.qte ?? 0) } 
                : item
              )
            : prev.filter(item => 
                item.id_cmd !== id_cmd || item.id_product !== id_product
              )
        );
    } catch (error) {
        console.log("Error:", error);
    } finally {
        setLoadingActions(prev => ({ ...prev, edit: false, delete: false }));
    }
};

  const onSearch = () => {
    if(search !== ''){
        setFiltredCommandes(prev => (
            commandes.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        ))
    }else{
        setFiltredCommandes(commandes)
    }
  }
  useEffect(()=>{
    GET_CMD()
  },[])
  useEffect(()=>{
    setFiltredCommandes(commandes)
  },[commandes])
  useEffect(()=>{
    onSearch()
  },[search])
  return (
    <div className='myTable border border-gray-300 rounded-xl relative'>
       
        <div className='thead flex items-center bg-gray_table px-6 py-3'>
             
             <div className='th flex  items-center text-uppercase'>
                <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>id</p>
             </div>
             <div className='th flex  items-center text-uppercase'>
                <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Produit</p>
             </div>
             <div className='th flex  items-center text-uppercase'>
                <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Quantité</p>
             </div>
             <div className='th flex  items-center text-uppercase'>
                <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Prix</p>
             </div>
             <div className='th flex  items-center text-uppercase'>
                <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Numéro</p>
             </div>
             <div className='th flex  items-center text-uppercase'>
                <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Nom & Prénom</p>
             </div>
             <div className='th flex  items-center text-uppercase'>
                <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Etat</p>
             </div>
             <div className='th flex  items-center text-uppercase '>
                <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Confirmer</p>
             </div>
             <div className='th flex  items-center text-uppercase'>
                <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Supprimer</p>
             </div>
             
        </div>
        <div className='tbody'>
            {
                loading ? (
                    <div className="flex gap-2 flex-col justify-center h-64 items-center">
                        <small className="text-gray-700 font-medium">Loading...</small>
                    </div>
                ) : !Array.isArray(commandes) || commandes.length === 0 ? (
                    <div className="flex gap-2 flex-col justify-center h-64 items-center">
                      <NoProduct width={40} height={40} color={'black'}/>
                      <small className="text-gray-700 font-medium">Empty list</small>
                    </div>
                ) : (
                        filtredCommandes.map((fav,index) => {
                        return (
                            <div key={index} className='tr flex px-6 py-2'>
                              <div className='td flex  items-center text-uppercase'>
                                <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>#{fav.id_cmd}</p>
                              </div>
                              <div className='td flex  items-center'>
                                  <div className='flex gap-3 border-none'>
                                      <img src={`${fav.img}`} alt="" width={50} height={50} className='rounded object-contain'/>
                                      <div>
                                          <h6 className='mb-0 text-sm text-gray-700 font-semibold'>{fav.name}</h6>
                                          <p className='text-xs text-gray_text_table capitalize'>{fav.desc_s}</p>
                                      </div>
                                  </div>
                              </div>
                    
                              <div className='td flex flex-col justify-center gap-2'>
                                  <div className='bg-green-200 relative h-1.5 w-8/12 rounded'>
                                      <div style = {{backgroundColor : "#11A849",width : (fav.qte/fav.product_qte)*100+'%'}}className=' absolute z-[2] h-1.5 rounded'></div>
                                  </div>
                                  <p className='text-xs text-gray_text_table mb-0'>{fav.status === 'confirmé' ? fav.qte+'(livré), '+fav.product_qte+'(rest)': fav.qte+'/'+fav.product_qte}</p>
                              </div>
                              <div className='td flex  items-center text-uppercase'>
                                  <p className='mb-0 text-sm text-gray-700' style={{borderBottom : 'none',fontWeight :'500 !important'}}>{fav.price} DA</p>
                              </div>
                              <div className='td flex flex-col justify-center text-capitalize'>
                                      <p className='mb-0 ml-1 text-sm text-gray-600'>{fav.user_number}</p>
                              </div>
                              <div className='td flex flex-col justify-center text-capitalize'>
                                      <p className='mb-0 ml-1 text-sm text-gray-600'>{fav.user_name}</p>
                                      <p className='mb-0 ml-1 text-xs text-gray-600'>{fav.city}, ({fav.wilaya})</p>
                              </div>
                              <div className='td flex items-center text-capitalize'>
                                  <div className='flex gap-1 text-[#484848] items-center text-sm'>
                                      <div className={`w-2 h-2 rounded-full ${fav.status === 'confirmé' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                      <p className='mb-0' style={{fontWeight : '500 !important'}}>{fav.status}</p>
                                  </div>
                              </div>
                              <div className='td flex items-center text-capitalize'>
                                    {
                                        fav.status !== 'confirmé' && <button onClick={()=>ACTION(fav.id_cmd,fav.id_product,true,fav.qte)} disabled = {loadingAction.edit}  className={`mb-0 text-sm flex justify-center gap-2 items-center rounded-md ${loadingAction.edit? 'bg-gray-500 hover:cursor-wait ' :'bg-green-500 hover:cursor-pointer'} text-white font-semibold px-4 py-2 text-capitalize`} style={{borderBottom : 'none',fontWeight :'500 !important'}}>{loadingAction.edit ? 'Loading...':'Confirmer'} <Cart width={20} height={20}  color={'white'}/></button>
                                    }
                                
                              </div>
                              <div className='td flex  items-center'>
                                      <button onClick={()=>ACTION(fav.id_cmd,fav.id_product,false,null)} disabled = {loadingAction.delete} className={`mb-0 text-sm flex justify-center gap-2 items-center rounded-md ${loadingAction.delete? 'bg-gray-500 hover:cursor-wait ' :'bg-red-500 hover:cursor-pointer'} text-white font-semibold px-4 py-2 text-capitalize`} style={{borderBottom : 'none',fontWeight :'500 !important'}}>{loadingAction.delete ? 'Loading...' :'Supprimer'}<Delete width={20} height={20} color={'white'}/></button>
                              </div>
                            </div>
                    )
                })
                )
            }
        </div>
        <div className='tfooter bg-white flex items-center bg-gray_table px-6 py-3 justify-between !border-t !border-gray-300'>
              <div className='flex items-center gap-1 rounded-md px-4 !border !border-gray-300'>
                  <span><Search width={15} height={15} color={'gray'}/></span>
                  <input value={search} onChange={(e)=>setSearch(e.target.value)} type='text' placeholder='Rechercher...' className='py-2 px-2 outline-none'/>
              </div>
              <span className='text-[#484848] text-sm font-bold'>{filtredCommandes.length}</span>
        </div>
    </div>
  )
}
