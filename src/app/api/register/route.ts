'use server'
import prisma from "@/lib/prisma";
import {  hashSync } from "bcryptjs";
import { NextResponse } from "next/server";




export async function POST(req:Request) {
    try {
           console.log("post")
        const {name,password,email}=(await req.json()) as {
            name:string;
            email:string;
            password:string;
        };
        

        const dbUser= await prisma.user.findFirst({where:{email:email.toLowerCase()}}) ?? 'no-email';

        if(dbUser!=='no-email'){
               return NextResponse.json( "Usuario ya se encuentra registrado", { status: 404 } );
        }

        const hashed_password= hashSync(password);
        
        const user=await prisma.user.create({
            data:{
                name,
                email:email.toLowerCase(),
                password:hashed_password
            },
        });


        return NextResponse.json({
            user:{
                name:user.name,
                email:user.email
            }
        })
        
    } catch (error:any) {

        return  NextResponse.json( error, { status: 400 } );
        
    }
    
}