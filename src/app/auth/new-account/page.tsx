
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { RegisterForm } from './ui/RegisterForm';



export default function NexAccountPage() {


  return (
        <div className="grid grid-cols-1 md:grid-cols-2  h-screen">
            <Image
              src="/imgs/CLARA RIVERA_LOGO SLOGAN_Negativo Vinotinto.jpg"
              width={500}
              height={500}
              alt='logo'
              className="hidden md:block h-screen w-screen"
            />


          <div className="flex  justify-center items-center bg-white ">

              <RegisterForm/>
          </div>
    </div>



  );
}