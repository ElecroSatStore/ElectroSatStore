'use client'
import { Rating } from '@mui/material'
import {useState,useEffect, useContext, use}from 'react'
import { Cart, Delete,NoProduct,Errors,Success, Search } from '../../../svg'

export default function Table() {
    const [inCart,setInCart] = useState(false)
    const [alert,setAlert] = useState({
        open : false,
        message : '',
        type : ''
    })
  const [items,setItems] = useState([
    {id_product :1, name:'item1',price:10,qte:1 , img1 : '/product/1.webp',category : 'phisique',desc :'Casio Classic Watch'},
    {id_product :2, name:'item1',price:10,qte:1 , img1 : '/product/1.webp',category : 'phisique',desc :'Casio Classic Watch'},
    {id_product :3, name:'item1',price:10,qte:1 , img1 : '/product/1.webp',category : 'phisique',desc :'Casio Classic Watch'},
    {id_product :4, name:'item1',price:10,qte:1 , img1 : '/product/1.webp',category : 'phisique',desc :'Casio Classic Watch'},
    {id_product :5, name:'item1',price:10,qte:1 , img1 : '/product/1.webp',category : 'phisique',desc :'Casio Classic Watch'},
    {id_product :6, name:'item1',price:10,qte:1 , img1 : '/product/1.webp',category : 'phisique',desc :'Casio Classic Watch'},
    {id_product :7, name:'item1',price:10,qte:1 , img1 : '/product/1.webp',category : 'phisique',desc :'Casio Classic Watch'},
    {id_product :8, name:'item1',price:10,qte:1 , img1 : '/product/1.webp',category : 'phisique',desc :'Casio Classic Watch'},
  ])
    
  return (
    <div className='myTable border border-gray-300 rounded-xl relative'>
        {
                alert.open && (
                    <div style={{transform : 'translate(-50%,-50%)'}} className={`w-11/12 sm:w-6/12 md:w-auto rounded ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'} flex gap-3 items-center fixed top-32 left-1/2 px-3 py-3 text-white`}>
                        {alert.type !== 'error' ?  <Success width={20} height={20} color={'white'}/> : <Errors  width={20} height={20} color={'white'}/>} 
                        <span>{alert.message}</span>
                    </div>
                )
        }
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
                !Array.isArray(items) || items.length === 0 ? (
                    <div className="flex gap-2 flex-col justify-center h-64 items-center">
                      <NoProduct width={40} height={40} color={'black'}/>
                      <small className="text-gray-700 font-medium">Empty list</small>
                    </div>
                ) : (
                        items.map((fav,index) => {
                        return (
                            <div key={fav.id_product} className='tr flex px-6 py-2'>
                              <div className='td flex  items-center text-uppercase'>
                                <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>#{fav.id_product}</p>
                              </div>
                              <div className='td flex  items-center'>
                                  <div className='flex gap-3 border-none'>
                                      <img src={`.${fav.img1}`} alt="" width={50} height={50} className='rounded object-contain'/>
                                      <div>
                                          <h6 className='mb-0 text-sm text-gray-700 font-semibold'>{fav.name}</h6>
                                          <p className='text-xs text-gray_text_table capitalize'>{fav.desc}</p>
                                      </div>
                                  </div>
                              </div>
                    
                              <div className='td flex flex-col justify-center gap-2'>
                                  <div className='bg-green-200 relative h-1.5 w-8/12 rounded'>
                                      <div style = {{backgroundColor : "#11A849",width : '50%'}}className=' absolute z-[2] h-1.5 rounded'></div>
                                  </div>
                                  <p className='text-xs text-gray_text_table mb-0'>{fav.qte}/50</p>
                              </div>
                              <div className='td flex  items-center text-uppercase'>
                                  <p className='mb-0 text-sm text-gray-700' style={{borderBottom : 'none',fontWeight :'500 !important'}}>{fav.price} DA</p>
                              </div>
                              <div className='td flex flex-col justify-center text-capitalize'>
                                      <p className='mb-0 ml-1 text-sm text-gray-600'>0557007322</p>
                              </div>
                              <div className='td flex flex-col justify-center text-capitalize'>
                                      <p className='mb-0 ml-1 text-sm text-gray-600'>Yahia Slimani</p>
                              </div>
                              <div className='td flex items-center text-capitalize'>
                                  <div className='flex gap-1 text-[#484848] items-center text-sm'>
                                      <div className='w-2 h-2 rounded-full bg-orange-500'></div>
                                      <p className='mb-0' style={{fontWeight : '500 !important'}}>En attente</p>
                                  </div>
                              </div>
                              <div className='td flex items-center text-capitalize'>
                                      <button  className='mb-0 text-sm flex justify-center gap-2 items-center rounded-md bg-green-500 text-white font-semibold px-4 py-2 text-capitalize' style={{borderBottom : 'none',fontWeight :'500 !important'}}>Confirmer <Cart width={20} height={20}  color={'white'}/></button>
                                
                              </div>
                              <div className='td flex  items-center'>
                                      <button className='mb-0 text-sm flex  justify-center items-center gap-2 rounded-md bg-red-500 text-white font-semibold px-2 py-2 text-capitalize' style={{borderBottom : 'none',fontWeight :'500 !important'}}>Supprimer <Delete width={20} height={20} color={'white'}/></button>
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
                  <input type='text' placeholder='Rechercher...' className='py-2 px-2 outline-none'/>
              </div>
              <span className='text-[#484848] text-sm font-bold'>5</span>
        </div>
    </div>
  )
}
