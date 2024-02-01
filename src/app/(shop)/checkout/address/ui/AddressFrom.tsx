"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useAddressStores } from "@/store";

import { Address, Country } from "@/components/interfaces";
import clsx from "clsx";
import { deleteUserAddres, setUserAddress } from "@/actions";

interface FormInput {
  firstName: string;
  lastName: string;
  address: string;
  optionalAddres?: string;
  postalCode: string;
  city: string;
  phone: string;
  country: string;
  saveDirecction: boolean;
}

interface Props {
  countries: Country[];
  userStoreAddress?: Partial<Address>;
}

export const AddressFrom = ({ countries, userStoreAddress = {} }: Props) => {
  const router = useRouter();
  const setAddres = useAddressStores((state) => state.setAddress);
  const Addres = useAddressStores((state) => state.address);
  const { data: session } = useSession({
    required: true,
  });
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<FormInput>({
    defaultValues: {
      //leer base de datos
      ...(userStoreAddress as any),
      saveDirecction: true,
    },
  });

  const onSubmit = async (data: FormInput) => {
    const { saveDirecction, ...restAddress } = data;
    setAddres(restAddress);
    if (saveDirecction) {
      //server action
      await setUserAddress(restAddress, session!.user!.id);
    } else {
      //borrar  la direccion
      await deleteUserAddres(session!.user!.id);
    }

    router.push("/checkout");
  };

  useEffect(() => {
    if (Addres.firstName) {
      reset(Addres);
    }
  }, [reset,Addres]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      <div className="flex flex-col mb-2">
        <span>Nombres</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("firstName", { required: true, maxLength: 20 })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Apellidos</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("lastName", { required: true, maxLength: 30 })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("address", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección 2 (opcional)</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("optionalAddres")}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Código postal</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("postalCode", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Ciudad</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("city", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>País</span>
        <select
          className="p-2 border rounded-md bg-gray-200"
          {...register("country", { required: true })}
        >
          <option value="">[ Seleccione ]</option>
          {countries.map((country) => (
            <option value={country.id} key={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Teléfono</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("phone", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2 sm:mt-1">
        <div className="inline-flex items-center mb-10">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="  border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[rgba(156,34,78,255)] checked:bg-[rgba(156,34,78,255)] checked:before:bg-[rgba(156,34,78,255)] hover:before:opacity-10"
              id="checkbox"
              {...register("saveDirecction")}
            />
            <div className=" pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <span>Recordar direccion?</span>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={clsx({
            "btn-primary": isValid,
            "btn-disabled": !isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
