'use client'
import { IoAt, IoInformationOutline, IoLockClosed } from 'react-icons/io5';
import {  RiUserLine } from 'react-icons/ri';
import { titleFont } from '@/app/config/fonts';
import Link from 'next/link';
import {  SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { login, registerUser } from '@/actions';
import { useState } from 'react';
import { redirect } from 'next/navigation';




type FormValues={
    name:string,
    email:string,
    password:string,
    passwordValidate:string
  }

export const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const {register,handleSubmit,formState:{errors},watch}=useForm<FormValues>()

    const onSubmit:SubmitHandler<FormValues>=async(data)=>{
        setErrorMessage('')
        const {name,email,password}=data;
        const resp=await registerUser(name,email,password)

        if(!resp.ok){
            setErrorMessage(resp.message);
            return;
        } 

     window.location.replace('/auth/login');
        /**
         * implementar para version 5
         */
    //   const logResp= await login(email.toLowerCase(),password);
    //   console.log(logResp)
  


    };


  return (
    <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
            <h1 className={`${titleFont.className}text-gray-800 font-bold text-2xl mb-1 pb-5`}>Registrate!</h1>
            <div className={
                clsx(
                    "flex items-center border-2 py-2 px-3 rounded-2xl mb-4",
                    {
                        
                        'border-red-500':errors.name
                    }
                )
            }>
            <RiUserLine  size={20} className="text-gray-400"/>
            <input 
            className="pl-2 outline-none border-none"
             
            type="name" 
               {...register('name',{required:true})}
             />
            </div>

            <div 
                className={
                    clsx(
                        "flex items-center border-2 py-2 px-3 rounded-2xl mb-4",
                        {
                            
                            'border-red-500':errors.email
                        }
                    )
                }
            
            >
            <IoAt size={20} className="text-gray-400"/>
            <input 
             className="pl-2 outline-none border-none"                    
            type="email" 
            {...register('email',{required:true,pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ })}
             />
            </div>
            <div 
                className={
                    clsx(
                        "flex items-center border-2 py-2 px-3 rounded-2xl mb-4",
                        {
                            
                            'border-red-500':errors.password
                        }
                    )
                }
            >
            <IoLockClosed  size={20} className="text-gray-400"/>
            <input 
            className= "pl-2 outline-none border-none"
            type="password" 
            {...register('password',{required:true,pattern:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/})}
             />
            </div>

            <div
            
            className={
                clsx(
                    "flex items-center border-2 py-2 px-3 rounded-2xl mb-4",
                    {
                        
                        'border-red-500':errors.passwordValidate
                    }
                )
            }
            >
            <IoLockClosed  size={20} className="text-gray-400"/>
            <input 
            className="pl-2 outline-none border-none"       
            type="password" 
            {...register('passwordValidate',{required:true,
                validate:(val:string)=>{
                    if(watch('password')!=val){
                        return "Contraseña no son iugales"
                    }
                
                
                }})}
            />
            </div>
        
            <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
            >           
            {
            errorMessage.length>0 && (
                        <>       
                        <IoInformationOutline className="h-5 w-5 text-red-500" />
                        <span className='text-red-500'>{errorMessage}</span>
                        </>
                    )
                } 
        </div>

        <button 
         type="submit" 
         className="block w-full bg-[rgba(156,34,78,255)] hover:bg-[rgba(156,50,68,255)] mt-4 py-2 rounded-2xl text-white font-semibold mb-2 "
          >
          Crear cuenta
        </button>
            {/* <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span> */}

            <p className="text-gray-700 text-sm mt-6">
                tienes una cuenta? 
                <Link href="/auth/login" className="text-blue-500 hover:text-blue-600 mt-3 focus:outline-none font-bold underline ml-2">
                Ingresar
                </Link>
            </p>
  </form>
  )
}
