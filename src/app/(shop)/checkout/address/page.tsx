
import { Title } from '@/components';
import { AddressFrom } from './ui/AddressFrom';
import { countries, getUserAddress } from '@/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function AddresPage() {
  
  const countires=await countries();
  const session=await getServerSession(authOptions);
  
  if(!session?.user){
    return(
      <h3 className='text-5xl'>500 - No hay session de usuario</h3>
    )
  }

  const userStoreAddress= await getUserAddress(session.user.id) ?? undefined;

  

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressFrom countries={countires} userStoreAddress={userStoreAddress}/>

      </div>




    </div>
  );
}