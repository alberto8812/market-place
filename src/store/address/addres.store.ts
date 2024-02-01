import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    address:{
        firstName:string;
        lastName:string;
        address:string;
        optionalAddres?:string;
        postalCode:string;
        city:string;
        country:string;
        phone:string;
    }
    //Methods
    setAddress:(address:State['address'])=>void
}


export const useAddressStores=create<State>()(
    
  persist(

        (set,get)=>({
            address:{
                firstName    :'',  
                lastName     :'',
                address      :'',
                optionalAddres     :'',
                postalCode   :'',
                city         :'',
                country      :'',
                phone        :''
    
            },

            setAddress:(address)=>{
                set({address})
            },
        })
        ,
        {
            name:'addressStorage',
        }
  )
)