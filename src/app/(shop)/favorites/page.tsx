import { getFavoritesProduct } from "@/actions";
import { Pagination, ProductCardHome, Title } from "@/components";
import { CardFavorites } from "./ui/CardFavorites";

export default function Favorites() {
   // const {ok}=getFavoritesProduct()
  return (
    <div className="flex flex-col justify-center items-center h-full mb-4 mt-7 w-screen">
      <div className=" pl-4 flex justify-start items-start  w-full"
      >
        <Title title="Favoritos" />
      </div>

      <CardFavorites />
     
    </div>
  );
}
