
// import  NextAuth, { type NextAuthConfig } from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// import { z } from 'zod';
// import prisma from './lib/prisma';
// import bcryptjs from 'bcryptjs';

 
// export const authConfig: NextAuthConfig = {
//   pages: {
//     signIn: '/auth/login',
//     newUser:'/auth/new-account'
//   },

//   providers: [

//     Credentials({
//       async authorize(credentials) {

//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);

//            console.log("carlos")
//           if ( !parsedCredentials.success ) return null;

//           const { email, password } = parsedCredentials.data;
//           console.log({ email, password });

//           // Buscar el correo
//           const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
//           if ( !user ) return null;

//           // Comparar las contraseñas
//           if( !bcryptjs.compareSync( password, user.password ) ) return null;


//           // Regresar el usuario sin el password
//           const { password: _, ...rest } = user;

//           return rest;
//       },
//     }),


//   ]
// }



// export const {signIn,signOut,auth}=NextAuth(authConfig);