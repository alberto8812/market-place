import Link from 'next/link'
import React from 'react'
import { IoBarChartOutline, IoHomeOutline, IoPeopleOutline, IoSettingsOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

export const AdminSidebar = () => {
  return (
    <div className="fixed flex flex-col text-white bg-[rgba(156,34,78,255)]  left-0 w-14 hover:w-64 md:w-64  dark:bg-gray-900 h-full  transition-all duration-300 border-none z-50 top-0">
    <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
      <ul className="flex flex-col py-4 space-y-1">
        <li className="px-5 hidden md:block">
          <div className="flex flex-row items-center h-8">
            <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
              Principal
            </div>
          </div>
        </li>
        <li>
          <Link
            href="/"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          >
            <div className="inline-flex justify-center items-center ml-4">
            <IoHomeOutline size={30}/> 
            </div>
            <span className="ml-2 text-sm tracking-wide truncate">
             Home
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/admind/statistics"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          >
            <span className="inline-flex justify-center items-center ml-4">
              <IoBarChartOutline size={30} />
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Estaditicas generales
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/admind/products"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          >
            <span className="inline-flex justify-center items-center ml-4">
              <IoShirtOutline size={30} />
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Productos
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/admind/orders"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          >
            <span className="inline-flex justify-center items-center ml-4">
              <IoTicketOutline size={30} />
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Ordenes
            </span>
          </Link>
        </li>

        <li className="px-5 hidden md:block">
          <div className="flex flex-row items-center mt-5 h-8">
            <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
              Configuraciones
            </div>
          </div>
        </li>
        <li>
          <Link
            href="/admind/users"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          >
            <span className="inline-flex justify-center items-center ml-4">
            <IoPeopleOutline size={30} />
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Perfiles
            </span>
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          >
            <span className="inline-flex justify-center items-center ml-4">
            <IoSettingsOutline  size={30}/>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Ajustes
            </span>
          </a>
        </li>
      </ul>
      <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
        ClaraRiver @2024
      </p>
    </div>
  </div>
  )
}
