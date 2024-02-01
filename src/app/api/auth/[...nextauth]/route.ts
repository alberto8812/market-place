
import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from '@/actions';

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter( prisma ) as Adapter,
  pages: {
    signIn: "/auth/login",

  },
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),


    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo electrónico", type: "email", placeholder: "usuario@google.com" },
        password: { label: "Contraseña", type: "password", placeholder: '******' }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailPassword(credentials!.email, credentials!.password );
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          const {password:_,...rest}=user
          return rest;
        } 

        return null;
      }
    }),

  ],

  session: {
    strategy: 'jwt'
  },

  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user, account, profile }) {
   
      const dbUser = await prisma.user.findUnique({ where: { email: token.email?.toLowerCase() ?? 'no-email' } });

      if(!dbUser){
        throw Error('Correo o Contraseña invalida')
      }
      if ( dbUser?.isActive === false ) {
        throw Error('Usuario no está activo');
      }

      token.roles     = dbUser?.roles ?? 'no-roles';
      token.id        = dbUser?.id ?? 'no-uuid';
      token.isActive  = dbUser.isActive;
      token.name     = dbUser.name;
   
      return token;
    },

    async session({ session, token, user }) {
      
      if ( session && session.user ) {
        session.user.roles    = token.roles;
        session.user.id       = token.id;
        session.user.isActive = token.isActive;
        session.user.name     = token.name;

      }
  
      return session;
    }

  }

}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };