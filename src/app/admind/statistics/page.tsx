export const revalidate = 60;///60 segundos
import { getAllUserCount, getOrderGenerarInformation } from "@/actions";
import { ProductsMassiveSales, SalenEventChart, Title } from "@/components";
import { IoBagHandleOutline, IoCardOutline, IoCartOutline, IoPeopleOutline } from "react-icons/io5";



export default async function AdminStatistics() {
  const [getInformationOrder,getUserCount]= await Promise.all(
   [ getOrderGenerarInformation(),
    getAllUserCount(),]
  )
 

  // TODO: validar que   las ordner esten ook durante las consultas pendiente

  

    return(
        <div className="h-full ml-14 mt-5 mb-10 md:ml-64">
             <Title title="Estadisticas generales" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
            <div className="bg-white dark:bg-gray-800  rounded-md flex items-center justify-between p-3 border-b-2 bg-clip-border dark:border-gray-600 text-black font-medium group border-gray-200 shadow-md shadow-[#F3F3F3]">
              
              <IoCardOutline size={30} className='text-blue-500' />
   
              <div className="text-right" >
                <p className="text-2xl">{getInformationOrder.totalOrder}</p>
                <p>Ordenes Totales</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800  rounded-md flex items-center justify-between p-3 border-b-2 bg-clip-border dark:border-gray-600 text-black font-medium group border-gray-200 shadow-md shadow-[#F3F3F3]">
              
              <IoCardOutline size={30} className='text-green-500' />
   
              <div className="text-right" >
                <p className="text-2xl">{`${getInformationOrder.isPiad?._count.isPaid}`}</p>
                <p>Ordenes Pagadas</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800  rounded-md flex items-center justify-between p-3 border-b-2 bg-clip-border dark:border-gray-600 text-black font-medium group border-gray-200 shadow-md shadow-[#F3F3F3]">
              
              <IoCardOutline size={30} className='text-red-500' />
   
              <div className="text-right" >
                <p className="text-2xl">{`${getInformationOrder.isNoPiad?._count.isPaid }`}</p>
                <p>Ordenes Pendientes</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800  rounded-md flex items-center justify-between p-3 border-b-2 bg-clip-border dark:border-gray-600 text-black font-medium group border-gray-200 shadow-md shadow-[#F3F3F3]">
              
              <IoPeopleOutline size={30}  />
   
              <div className="text-right" >
                <p className="text-2xl">{`${getUserCount.totalClient?._count.roles}`}</p>
                <p>Clientes</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800  rounded-md flex items-center justify-between p-3 border-b-2 bg-clip-border dark:border-gray-600 text-black font-medium group border-gray-200 shadow-md shadow-[#F3F3F3]">
              
              <IoBagHandleOutline size={30} className='text-orange-500' />
   
              <div className="text-right" >
                <p className="text-2xl">5</p>
                <p>Productos</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800  rounded-md flex items-center justify-between p-3 border-b-2 bg-clip-border dark:border-gray-600 text-black font-medium group border-gray-200 shadow-md shadow-[#F3F3F3]">
              
              <IoBagHandleOutline size={30} className='text-red-500' />
   
              <div className="text-right" >
                <p className="text-2xl">6</p>
                <p>Sin Existencias</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800  rounded-md flex items-center justify-between p-3 border-b-2 bg-clip-border dark:border-gray-600 text-black font-medium group border-gray-200 shadow-md shadow-[#F3F3F3]">
              
              <IoCartOutline  size={30} className='text-yellow-500' />
   
              <div className="text-right" >
                <p className="text-2xl">7</p>
                <p>Bajo Inventario</p>
              </div>
            </div>
 
          </div>
          <Title title="Graficos" />
            <div className=" w-full flex flex-col items-center justify-center">
            <ProductsMassiveSales/>
            <SalenEventChart/>
            </div>
        </div>
    )
};


