'use client'
import Stat from './Stat'
import {useState,useEffect, useContext}from 'react'
import { Cart, Delete,Errors,Success, Search,NoProduct, Order, Person } from '../../../svg'
export default function Dash() {
  const [alert,setAlert] = useState({
    open : false,
    type : 'success',
    message : ''
  })
  const [stat,setStat] = useState([
    {
        title : 'Utilisateur',
        desc : "La cart affiche le nombre d'utilisateur visité le site web",
        nb : 200,
        type : <Person size={25} color={'gray'}/>
    },
    {
        title : 'Produit',
        desc : "La cart affiche le nombre de produit dans le site web",
        nb : 40,
        type : <NoProduct width={25} color={"gray"}/>
    },
    {
        title : 'Commande',
        desc : "La cart affiche le nombre de commande dans le site web",
        nb : 20,
        type : <Order width={25} height={25} color={'gray'}/>
    },
    ])
  const [products,setProducts] = useState([
    {id_product : 1,name : 'Casio Watch',img : '/product/1.webp',prix : 2000,qte : 50,type: 'phisique',desc_s : 'Casio Classic Watch',desc_b : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit laboriosam ratione ipsam, voluptatibus molestias sed, doloremque est cumque cupiditate velit enim impedit optio perspiciatis, veritatis beatae reiciendis. Culpa, officiis sunt?"},
    {id_product : 2,name : 'Casio Watch',img : '/product/1.webp',prix : 2000,qte : 50,type: 'phisique',desc_s : 'Casio Classic Watch',desc_b : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit laboriosam ratione ipsam, voluptatibus molestias sed, doloremque est cumque cupiditate velit enim impedit optio perspiciatis, veritatis beatae reiciendis. Culpa, officiis sunt?"},
    {id_product : 3,name : 'Casio Watch',img : '/product/1.webp',prix : 2000,qte : 50,type: 'phisique',desc_s : 'Casio Classic Watch',desc_b : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit laboriosam ratione ipsam, voluptatibus molestias sed, doloremque est cumque cupiditate velit enim impedit optio perspiciatis, veritatis beatae reiciendis. Culpa, officiis sunt?"},
    {id_product : 4,name : 'Casio Watch',img : '/product/1.webp',prix : 2000,qte : 50,type: 'phisique',desc_s : 'Casio Classic Watch',desc_b : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit laboriosam ratione ipsam, voluptatibus molestias sed, doloremque est cumque cupiditate velit enim impedit optio perspiciatis, veritatis beatae reiciendis. Culpa, officiis sunt?"},
    {id_product : 5,name : 'Casio Watch',img : '/product/1.webp',prix : 2000,qte : 50,type: 'phisique',desc_s : 'Casio Classic Watch',desc_b : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit laboriosam ratione ipsam, voluptatibus molestias sed, doloremque est cumque cupiditate velit enim impedit optio perspiciatis, veritatis beatae reiciendis. Culpa, officiis sunt?"},
  ])
  return (
    <section>
       <div className="mb-5">
            <h1 className="text-2xl sm:text-3xl font-bold mb-0">Tableau de bord</h1>
        </div>
        <div className='statistic'>
            {
                stat.map((item, index) => {
                    return (
                        <Stat nb={item.nb} title={item.title} key={index} desc={item.desc} type={item.type}/>
                    )
            })}
        </div>
        <div className='bg-white flex flex-wrap sm:flex-nowrap justify-between mt-5 gap-5 sm:gap-0'>
              <div className='flex items-center gap-1 rounded-md px-4 !border !border-gray-300 w-full sm:w-1/2 md:w-5/12  lg:w-4/12 xl:w-3/12'>
                  <span><Search width={15} height={15} color={'gray'}/></span>
                  <input type='text' placeholder='Rechercher...' className='py-2.5 px-2 outline-none text-sm'/>
              </div>
              <button className='text-white w-full sm:w-auto py-2.5  sm:py-0 bg-blue-500 px-4 text-sm rounded-md hover:cursor-pointer font-bold'>+ Ajouter produit</button>
        </div>
        <div className='pt_container'>
              <div className='productTable !max-h-[300px] overflow-y-auto min-w-5xl lg:min-w-auto border border-gray-300 rounded-xl relative mt-5'>
                     {
                             alert.open && (
                                 <div style={{transform : 'translate(-50%,-50%)'}} className={`w-11/12 sm:w-6/12 md:w-auto rounded ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'} flex gap-3 items-center fixed top-32 left-1/2 px-3 py-3 text-white`}>
                                     {alert.type !== 'error' ?  <Success width={20} height={20} color={'white'}/> : <Errors  width={20} height={20} color={'white'}/>} 
                                     <span>{alert.message}</span>
                                 </div>
                             )
                     }
                     <div className='thead sticky backdrop-blur-2xl top-0 flex items-center bg-[#f1f1f1b5] px-6 py-3 rounded-t-xl'>
                          
                          <div className='th w-1/12 flex  items-center text-uppercase'>
                             <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>id</p>
                          </div>
                          <div className='th w-3/12 flex  items-center text-uppercase'>
                             <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Produit</p>
                          </div>
                          <div className='th w-2/12 flex  items-center text-uppercase'>
                             <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Quantité</p>
                          </div>
                          <div className='th w-1/12 flex  items-center text-uppercase'>
                             <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Prix</p>
                          </div>
                          <div className='th w-3/12 flex  items-center text-uppercase'>
                             <p className='mb-0 w-2/12 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Description</p>
                          </div>
                          
                          <div className='th flex w-1/12  items-center text-uppercase '>
                             <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Type</p>
                          </div>
                          <div className='th flex w-1/12  items-center text-uppercase '>
                             <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>Supprimer</p>
                          </div>
                          
                          
                     </div>
                     <div className='tbody'>
                         {
                             !Array.isArray(products) || products.length === 0 ? (
                                 <div className="flex gap-2 flex-col justify-center h-64 items-center">
                                   <NoProduct width={40} height={40} color={'black'}/>
                                   <small className="text-gray-700 font-medium">Empty list</small>
                                 </div>
                             ) : (
                                     products.map((fav,index) => {
                                     return (
                                         <div key={fav.id_product} className='tr flex px-6 py-2'>
                                           <div className='td w-1/12 flex  items-center text-uppercase'>
                                             <p className='mb-0 text-sm' style={{borderBottom : 'none',fontWeight :'500 !important',color : '#666666'}}>#{fav.id_product}</p>
                                           </div>
                                           <div className='td w-3/12 flex  items-center'>
                                               <div className='flex gap-3 border-none'>
                                                   <img src={`.${fav.img}`} loading='lazy' alt="" width={50} height={50} className='rounded object-cover'/>
                                                   <div>
                                                       <h6 className='mb-0 text-sm text-gray-700 font-semibold'>{fav.name}</h6>
                                                       <p className='text-xs text-gray_text_table capitalize'>{fav.desc_s}</p>
                                                   </div>
                                               </div>
                                           </div>
                                 
                                           <div className='td w-2/12 flex items-center'>
                                               <div className='flex items-center gap-1 text-xs text-gray_text_table mb-0'>
                                                    <button className='py-1 px-2 bg-gray-200 rounded-md hover:cursor-pointer'>-</button>
                                                    {fav.qte}
                                                    <button className='py-1 px-2 bg-gray-200 rounded-md hover:cursor-pointer'>+</button>
                                                </div>
                                           </div>
                                           <div className='td w-1/12 flex  items-center text-uppercase'>
                                               <p className='mb-0 text-sm text-gray-700' style={{borderBottom : 'none',fontWeight :'500 !important'}}>{fav.prix} DA</p>
                                           </div>
                                           
                                           <div className="td w-3/12 flex items-center">
                                                <div className="max-h-[80px] overflow-y-auto scrollbar-hide">
                                                    <p className="mb-0 text-sm text-gray-700">{fav.desc_b}</p>
                                                </div>
                                            </div>


                                           <div className='td w-1/12 flex  items-center'>
                                                <p className='mb-0 text-sm text-blue-700 capitalize font-medium' style={{borderBottom : 'none',fontWeight :'500 !important'}}>{fav.type}</p>
                                           </div>
                                           <div className='td w-1/12 flex  items-center'>
                                                   <button className='mb-0 text-sm flex  justify-center items-center gap-2 rounded-md bg-red-500 text-white font-semibold px-2 py-2 text-capitalize' style={{borderBottom : 'none',fontWeight :'500 !important'}}><Delete width={20} height={20} color={'white'}/></button>
                                           </div>
                                         </div>
                                 )
                             })
                             )
                         }
                     </div>

              </div>
        </div>
    </section>
  )
}
