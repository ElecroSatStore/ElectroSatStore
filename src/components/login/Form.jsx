'use client'
import {  useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
export default function Form() {
  const [loading,setLoading] = useState(false)
  const [text,setText] = useState({
    open : false,
    content : ''
  })
  const [values,setValues] = useState({
    email : '',
    password : '',
  })
  const router = useRouter()
  function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
  }
  const handleValues = (e) => {
    setValues((prevValue) => ({
        ...prevValue,
        [e.target.name]: e.target.value
    }))
  }
  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if(values.email === '' || values.password === ''){
          setText(prev => ({
              ...prev,
              open : true,
              content : 'Email ou mot de passe vide'
          }))
          setTimeout(() => {
              setText({
                  open : false,
                  content : ''
              })
          }, 4000);
      }else if(!isValidEmail(values.email)){
          setText(prev => ({
              ...prev,
              open : true,
              content : 'Email not valid'
          }))
          setTimeout(() => {
              setText({
                  open : false,
                  content : ''
              })
          }, 4000);
      }else{
          const res = await signIn('credentials',{
            redirect : false,
            email : values.email,
            password : values.password
          })
          if(res.error == "CredentialsSignin"){
            setText(prev => ({
              ...prev,
              open : true,
              content : 'Incorrect Email or password'
            }))
            setTimeout(() => {
              setText(prev => ({
                ...prev,
                open : false,
              }))
            }, 4000);
          }else{
            router.push('/dashboard')
          }
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  
  return (
    <div className="w-full sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12">
        <h1 className="mb-2 text-3xl font-bold text-center">Login</h1>
        <form className="flex flex-col w-full border border-gray-300 rounded-xl py-5 px-4 shadow-2xl" onSubmit={onSubmit}>
            <h4 className="mb-0 text-xl font-bold text-center">Bienvenue</h4>
  
            <label htmlFor="email" className="font-medium text-[#484848] text-sm">Email*</label>
            <input 
                type="email" 
                name="email" 
                id="email" 
                className="mt-2 border border-gray-300 rounded-md py-2 px-2 outline-none" 
                value={values.email}
                onChange={handleValues}/>
            <label htmlFor="password" className="font-medium text-[#484848] text-sm mt-3">Password*</label>
            <input 
                type="password" 
                name="password" 
                id="password" 
                className="mt-2 border border-gray-300 rounded-md py-2 px-2 outline-none"
                value={values.password}
                onChange={handleValues}/>
            {text.open && <small className="text-red-500">{text.content}</small>}
            <p className="text-[#484848] text-sm mt-3">Cette page est dirigé pour l'admin seulement</p>
            {
              loading ? <div className="text-white bg-black flex justify-center items-center rounded-md w-full py-2 px-2 mt-3 font-semibold hover:cursor-wait">Loading...</div> : <button type="submit" className="text-white bg-black rounded-md w-full py-2 px-2 mt-3 font-semibold hover:cursor-pointer">Connecter</button>

            }
        </form>
    </div>
  )
}
