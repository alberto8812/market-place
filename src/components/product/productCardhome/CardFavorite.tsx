"use client";
import { useFavoritesStore } from "@/store";
import React, { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

interface Props {
  id: string;
}

export const CardFavorite = ({ id }: Props) => {
  const favoritesProduct = useFavoritesStore((state) => state.favorites);
  const updateFavorite = useFavoritesStore((state) => state.updatefavorites);
  const deletefavorites = useFavoritesStore((state) => state.deletefavorites);
  const [loader, setLoader] = useState(false);


  
  const onClickFavorites = (id: string, status: boolean) => {
    setLoader(false)
    if (status) {
      updateFavorite(id);
      return;
    }

    deletefavorites(id);
   
  };


  useEffect(() => {
    setLoader(true)
  }, [favoritesProduct,updateFavorite])

  if(!loader){
    return (<div className="h-10 bg-gray-300 w-10 rounded-sm m-2"></div>)
  }
  


  return (
    <div className="cursor-pointer">
      {favoritesProduct.includes(id) ? (
        <IoHeart
          size={40}
          className="m-2 text-red-600"
          onClick={() => onClickFavorites(id, false)}
        />
      ) : (
        <IoHeartOutline
          size={40}
          className="m-2 text-red-600"
          onClick={() => onClickFavorites(id, true)}
        />
      )}
    </div>
  );
};
