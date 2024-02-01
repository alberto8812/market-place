"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions,OnApproveActions,OnApproveData } from "@paypal/paypal-js";
import { paypalCheckPayment, setTrasactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButtons = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundAmound = Math.round(amount / 100) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded "></div>
        <div className="h-11 bg-gray-300 rounded mt-2"></div>
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {

    const transactionid = await actions.order.create({
      purchase_units: [
        {
          invoice_id:orderId,//to paypal chatch ide order
          amount: {
            value: `${roundAmound}`,
          },
        },
      ],
    });


    // save id in porchuce order
    const updateorder = await setTrasactionId(orderId, transactionid);
    if (!updateorder.ok) {
      throw new Error("No se pudo actualizar la orden");
    }
    return transactionid;
  };
  

  const onAprove= async(data: OnApproveData, actions: OnApproveActions)=>{

    const detail=await actions.order?.capture();

    if(!detail) return;
    await paypalCheckPayment(detail.id);

  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      //se dispara cuando el proceso es exitoso
       onApprove={onAprove}
    />
  );
};
