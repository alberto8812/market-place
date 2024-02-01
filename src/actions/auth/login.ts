'use server';
// implementacion para V5  DE AUTH.JS
// import { signIn } from '@/auth.config';
// import { AuthError } from 'next-auth';

 
// // ...
 
// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { signIn } from "next-auth/react";


export const getUserSessionServer = async() => {
  const session = await getServerSession(authOptions);

  return session?.user;
}



export const signInEmailPassword = async( email: string, password: string ) => {



      if ( !email || !password ) return null;
    
      const user = await prisma.user.findUnique({ where: { email } });
    
      if ( !user ) {
      return null;
        // const dbUser = await createUser( email, password );
        // return dbUser;
      }
    
      if ( !bcrypt.compareSync( password, user.password ?? '') ) {
        return null;
      }
    
      return user;
    

}


export const login=async(email:string,password:string)=>{
   try {
    await signIn('Credentials',{email,password})
    return {ok:true}
   } catch (error) {
    console.log(error)
    return{
      ok:false,
      message:'Nose pudo iniciar session'
    }
    
   }
}

// const createUser = async (email: string, password: string ) => {
  
//   const user = await prisma.user.create({
//     data: {
//       email: email,
//       password: bcrypt.hashSync(password),
//       name: email.split('@')[0],
//     }
//   });

//   return user;

// }