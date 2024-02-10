import { getAllCategories, getAllSubCategories } from "@/actions";

import { Title } from "@/components";
import { CreateCategorySubCategory } from "./ui/CreateCategorySubCategory";
import { UpdateCategorySubCategory } from "./ui/UpdateCategorySubCategory";


export default async function AdminStatistics() {
    //todo hacer un primise all
  const categories = await getAllCategories();
  const subcategories = await getAllSubCategories();

  return (
    <div className="h-full ml-14 mt-5 mb-10 md:ml-64">
      <Title title="Crear categorias" />
      <CreateCategorySubCategory categories={categories} />
      <UpdateCategorySubCategory categories={categories} subcategories={subcategories} />
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Nombre categoria
            </th>

            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              subcategoria
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Modificar
            </th>
          </tr>
        </thead>
        <tbody>
            {categories.map((category) => (
              category.subCategory.map(subcateries=>(
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={category.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {category.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {subcateries.name}
              </td>
              </tr>
              ))
            ))}
        </tbody>
      </table>
    </div>
  );
}
