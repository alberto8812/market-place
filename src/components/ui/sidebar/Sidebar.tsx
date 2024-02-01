"use client";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import {
  IoCloseCircleOutline,
  IoHeartOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import Image from "next/image";
import { logOut } from "@/actions";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);
  const { data: session, status } = useSession();
  const isLogin = status === "authenticated";
  const isAdmin = session?.user?.roles === "admin";

  return (
    <div>
      {/* background black */}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className="fixed top-0 left-0 w-screen h-screen z-40 bg-black opacity-30 "
        />
      )}
      {/* blur */}
      {isSideMenuOpen && (
        <div className="fade-in fixed z-40 top-0 left-0 h-screen backdrop-filter backdrop-blur-sm " />
      )}
      {/* side menu */}

      <nav
        className={clsx(
          "fixed bg-white w-[400px] z-50 h-screen shadow-2xl right-0 top-0 transform transition-all duration-300 ",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseCircleOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        />

        {/* menu */}

        <div className="flex flex-col justify-center items-center mt-[80px]">
          <div className="w-10 md:w-16 rounded-full mx-auto">
            <Image
              src={session?.user?.image ?? `/imgs/avatarOutImage.jpg`}
              width={500}
              height={500}
              alt=""
              className="w-10 md:w-16 rounded-full mx-auto"
            />
          </div>
          <div className="mt-3">
            <span className="font-medium text-xs md:text-xl text-center ">
              {session?.user?.name ?? "nombre"}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-500 text-center font-medium ">
              {session?.user?.roles ?? ""}
            </span>
          </div>
        </div>

        {isLogin && (
          <>
            <Link
              href={"/favorites"}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoHeartOutline size={30} />
              <span className="ml-3 text-xl">Favoritos</span>
            </Link>
            <Link
              href="/orders"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}
        {status == "unauthenticated" && (
          <Link
            href={"/auth/login"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}
        {status == "authenticated" && (
          <Link
            href={"/"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl" onClick={() => logOut()}>
              Salir
            </span>
          </Link>
        )}
        {/* line separator */}

        <div className="w-full h-px bg-gray-200 my-10" />

        {isAdmin && (
          <>
            <Link
              href={"/admind/statistics"}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Area Administrador</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
