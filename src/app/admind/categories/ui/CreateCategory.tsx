'use client'
import { CategoriesSubcategories, Category, subcategory } from "@/components/interfaces";
import React, { useState } from "react";



interface Props {
  categories:CategoriesSubcategories[]
}
interface CreateSubcategory {
    idCategory:'',
    NameSubCategory:''

}

export const CreateCategory = ({categories}:Props) => {
    const [createSubcategory, setCreateSubcategory] = useState<CreateSubcategory>({
        idCategory:'',
        NameSubCategory:''
    });

    const onchange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setCreateSubcategory({
            ...createSubcategory,
            [e.target.name]:e.target.value
        });
    };

    //todo pendiente boton submit y crear accion que guarda subcategoria con validaciones 

  return (
    <div className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3 ml-3">
      <div className="flex flex-col mb-2">
        <span>Categoria</span>
        <select className="p-2 border rounded-md bg-gray-200" name="idCategory"   onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onchange(e)}>
          <option value="" >[Seleccione]</option>
          {
            categories.map(category=>(
                <option value={category.id}  key={category.id}>{category.name}</option>
            ))
          }
        </select>
      </div>
      <div className="flex flex-col mb-2">
        <span>Subcategoria</span>
        <input className="p-2 border rounded-md bg-gray-200" name="NameSubCategory"   onChange={(e)=>onchange(e)}/>
      </div>
    </div>
  );
};
