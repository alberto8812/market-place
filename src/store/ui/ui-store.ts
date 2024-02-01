import {create} from "zustand";

/**
 * control tu opne and close lateral menu
 */
interface State {
    isSideMenuOpen:boolean,
    isSideItemMovilOpen:boolean,
    openSideMenu:()=>void,
    closeSideMenu:()=>void
    openSidItemMovilOpen:()=>void,
    closeSidItemMovilOpen:()=>void
}


export const useUIStore=create<State>()((set)=>({
    isSideMenuOpen:false,
    isSideItemMovilOpen:false,
    openSideMenu:()=>set({isSideMenuOpen:true}),
    closeSideMenu:()=>set({isSideMenuOpen:false}),
    openSidItemMovilOpen:()=>set({isSideItemMovilOpen:true}),
    closeSidItemMovilOpen:()=>set({isSideItemMovilOpen:false}),

}))
