"use client";
import { UpdateCategories } from "@/actions";
import {
  CategoriesSubcategories,
  Category,
  SubCategory,
  subcategory,
} from "@/components/interfaces";
import React, { useState } from "react";

interface Props {
  categories: CategoriesSubcategories[];
  subcategories:SubCategory[]
}
interface CreateSubcategory {
  idCategory: "";
  idSubCategory: "";
}

export const UpdateCategorySubCategory = ({ categories,subcategories }: Props) => {
  const [createSubcategory, setCreateSubcategory] = useState<CreateSubcategory>(
    {
      idCategory: "",
      idSubCategory: "",
    }
  );

  const onchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCreateSubcategory({
      ...createSubcategory,
      [e.target.name]: e.target.value,
    });
  };

  //todo pendiente validacion monstrar mensaje de actualizado
  const onSumitSubCategory = async () => {
   
    await UpdateCategories(createSubcategory);
  };

  return (
    <div className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3 ml-3">
      <div className="flex flex-col mb-2">
        <span>Categoria</span>
        <select
          className="p-2 border rounded-md bg-gray-200"
          name="idCategory"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onchange(e)}
        >
          <option value="">[Seleccione]</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col mb-2">
        <span>Subcategoria</span>
        <select
          className="p-2 border rounded-md bg-gray-200"
          name="idSubCategory"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onchange(e)}
        >
          <option value="">[Seleccione]</option>
          {subcategories.map((subcategory) => (
            <option value={subcategory.id} key={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex  mt-5">
        <button className="btn-primary w-56" onClick={onSumitSubCategory}>Actualizar categoria</button>
      </div>
    </div>
  );
};
