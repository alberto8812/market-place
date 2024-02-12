"use client";
import { createSubCategories } from "@/actions";
import {
  CategoriesSubcategories,
  Category,
  subcategory,
} from "@/components/interfaces";
import React, { useState } from "react";

interface Props {
  categories: CategoriesSubcategories[];
}
interface CreateSubcategory {
  idCategory: "";
  nameSubCategory: "";
}

export const CreateCategorySubCategory = ({ categories }: Props) => {
  const categorySize = ["hombre", "mujer", "kids", "NA"];
  const garmenttypes = ["camisa", "pantalon", "zapatos", "NA"];
  const size = {
    hombre: {
      camisa: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      pantalon: ["HP_28", "HP_30", "HP_32", "HP_34", "HP_36", "HP_38"],
      zapatos: [
        "ZA_36",
        "ZA_37",
        "ZA_38",
        "ZA_39",
        "ZA_40",
        "ZA_41",
        "ZA_42",
        "ZA_43",
      ],
    },
    mujer: {
      camisa: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      pantalon: ["MP_4", "MP_6", "MP_8", "MP_10", "MP_12", "MP_14"],
      zapatos: [
        "ZA_36",
        "ZA_37",
        "ZA_38",
        "ZA_39",
        "ZA_40",
        "ZA_41",
        "ZA_42",
        "ZA_43",
      ],
    },
    kids: {
      camisa: ["NC_4", "NC_6", "NC_8", "NC_12", "NC_14"],
      pantalon: ["NC_4", "NC_6", "NC_8", "NC_12", "NC_14"],
      zapatos: ["NZ_28", "NZ_29", "NZ_30", "NZ_31", "NZ_32", "NZ_33", "NZ_34"],
    },
  };

  const [createSubcategory, setCreateSubcategory] = useState<CreateSubcategory>(
    {
      idCategory: "",
      nameSubCategory: "",
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

  //todo mensaje que ensene que fue creado validar el erros
  const onSumitSubCategory = async () => {
    console.log(createSubcategory);
    await createSubCategories(createSubcategory);
  };

  return (
    <div>
      <div className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3 ml-3">
        <div className="flex flex-col mb-2">
          <span>Categoria de talla</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            name="idCategory"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onchange(e)}
          >
            <option value="">[Seleccione]</option>
            {categorySize.map((category) => (
              <option
                value={category}
                key={`${category}_${category}`}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <span>Tipo de prenda</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            name="idCategory"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onchange(e)}
          >
            <option value="">[Seleccione]</option>
            {garmenttypes.map((garment) => (
              <option
                value={garment}
                key={garment}
              >
                {garment}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <span>Talla</span>
          <input
            className="p-2 border rounded-md bg-gray-200"
            name="nameSubCategory"
            onChange={(e) => onchange(e)}
          />
        </div>
      </div>
      <div className="flex  mt-5">
        <button className="btn-primary w-56" onClick={onSumitSubCategory}>
          Guardar subcategoria
        </button>
      </div>
    </div>
  );
};
