'use client'
import Commande from "@/components/dashboard/Commande";
import Dash from "@/components/dashboard/Dash";
import Left from "@/components/dashboard/Left";
import Table from "@/components/dashboard/Table";
import { useState ,useEffect} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { List ,Dashboard,Logout, TV, Close} from "../../../svg";
import { Drawer ,Box} from "@mui/material";
export default function Index() {
   const { data: session, status } = useSession();
    const router = useRouter();
  
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
    }, [status, router]);
  
    
  const [open,setOpen] = useState(false)
  const [list,setList] = useState([
        { id: 1, name: "Tableau de bord",open : true},
        { id: 2, name: "Gestion des commandes",open : false},
  ])
  const handleList = (id) => {
    setList(prev => (
      prev.map((item) => item.id == id ? { ...item, open: true } :{...item,open : false})
    ))
  }
  if (status === "loading") {
    return (
      <main className="flex justify-center items-center h-[80vh] px-5 sm:px-10">
        <p>Loading...</p>
      </main>
    );
  }
  if(status === 'unauthenticated'){
    return <main className="flex justify-center items-center h-[80vh] px-5 sm:px-10">
        <p>Loading...</p>
      </main>
  }
  return (
    <main className="h-auto lg:h-[85vh] flex px-5 sm:px-10 relative">
        <button className="block xl:hidden absolute right-10 top-12" onClick={()=>setOpen(true)}><List width={20} height={20} color={'black'}/></button>
        <Left list = {list} handleList = {handleList}/>
        <section className="w-full xl:w-10/12 mt-10 xl:pl-10">
            
            {
               list[0].open ? (
                 <Dash/>
               ) : (
                 <Commande/>
               )
            }
            
        </section>
        <Drawer open = {open} onClose={()=>setOpen(false)}>
            <Box className = 'w-[380px] px-5'>

                <div className={"block w-full pt-10 relative"}>
                    <button onClick={()=>setOpen(false)} className="absolute top-5 right-0"><Close width={15} height={15} color={'gray'}/></button>
                        <h1 className="font-bold text-3xl flex gap-1 items-center "><TV size={25} color={"#0aad0a"}/> IPDEMP</h1>
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
            </Box>
        </Drawer>
    </main>
  )
}
