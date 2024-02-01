"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IoPersonCircleOutline } from "react-icons/io5";

export const AdminTopMenu = () => {
  const { data: session, status } = useSession();
  return (
    <nav className='flex  justify-between items-center w-full bg-[rgba(245,245,245,255)] text-white'>
      <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-[rgba(156,34,78,255)] dark:bg-gray-800 border-none">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="user admind"
            width={40}
            height={10}
            className="rounded-full mr-3"
          />
        ) : (
          <IoPersonCircleOutline className="w-52 h-10" />
        )}

        <span className="hidden md:block">ADMIN</span>
      </div>
      <div className="flex justify-end items-center h-14 bg-[rgba(156,34,78,255)] dark:bg-gray-800 header-right w-full ">
        <ul className="flex items-center mr-4">
          <li>
            <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
          </li>
          <li>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};
