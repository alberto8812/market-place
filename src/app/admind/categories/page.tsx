import { getAllCategories } from "@/actions";
import { CreateCategory } from "./ui/CreateCategory";

export default async function AdminStatistics() {
     const categories=await getAllCategories();

    return(
        <div className="h-full ml-14 mt-5 mb-10 md:ml-64">
        <h1>Crear categorias</h1>
        <CreateCategory categories={categories}/>
        </div>
    )
}