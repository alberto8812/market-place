
import { titleFont } from '@/app/config/fonts';
import { SlideShowImage } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { IoAt, IoLockClosed } from 'react-icons/io5';
import { RiFacebookLine, RiGoogleLine } from 'react-icons/ri';
import { LoginForm } from './ui/LoginForm';


export default function LoginPage() {
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
    <LoginForm/>
    
  </div>
</div>



  );
}