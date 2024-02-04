import {create} from "zustand";

/**
 * control tu opne and close lateral menu
 */
interface State {
    isItemMenuOpen:boolean,
    openItemMenu:()=>void,
    closeItemMenu:()=>void

}


export const useTopMenuStore=create<State>()((set)=>({
    isItemMenuOpen:false,
    openItemMenu:()=>set({isItemMenuOpen:true}),
    closeItemMenu:()=>set({isItemMenuOpen:false}),
}))
