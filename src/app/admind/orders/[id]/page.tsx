import Image from "next/image";
import { redirect } from "next/navigation";
import { getOrderById } from "@/actions";
import { currencyFormat } from "@/util";
import { IsPaidComponentOrder, ProductImage, Title } from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersIdPage({ params }: Props) {
  const { id } = params;
  const { ok, order } = await getOrderById(id);
  //llmar el server action

  //todo verificar
  if (!ok) {
    redirect("/admind/statistics");
  }

  const address = order!.OrderAddress;

  //redirect(/)

  return (
    <div className="flex justify-center items-center  mb-10 ml-20 md:ml-64">
      <div className="flex flex-col w-[1000px] ">
        <Title title={`Orden #${id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <IsPaidComponentOrder isPaid={order!.isPaid} />

            {/* items */}

            {order!.OrderItem.map((item) => (
              <div className="flex" key={item.prodcut.slug}>
                <ProductImage
                  src={item.prodcut.productImage[0]?.url}
                  width={100}
                  height={100}
                  alt={item.prodcut.title}
                  className="mr-5 rounded"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />

                <div>
                  <p>
                    {item.prodcut.title}-{item.size}
                  </p>
                  <p>${item.price} x 3</p>
                  <p className="font-bold">
                    Sutotal: $ {item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* chekout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address!.firstName} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.optionalAddres}</p>
              <p>
                {address!.city}-{address!.countryId}
              </p>
              <p>{address!.phone}</p>
              <p>codigo postal: {address!.postalCode}</p>
            </div>

            <div className="w-full h-0.5 bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Producto</span>
              <span className="text-right">
                {order!.itemsInorder} articulos
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Impuesto (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="mt-2 text-2xl">Total</span>
              <span className="mt-5  text-right text-2xl">
                {currencyFormat(order!.total)}
              </span>
            </div>
            <IsPaidComponentOrder isPaid={order!.isPaid} />
          </div>
        </div>
      </div>
    </div>
  );
}
